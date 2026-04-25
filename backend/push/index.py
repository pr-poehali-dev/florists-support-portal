# v2
import json
import os
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def S(table):
    return f'{SCHEMA}.{table}'

def handler(event: dict, context) -> dict:
    """Управление push-подписками и рассылка уведомлений."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')

    if method == 'POST' and 'subscribe' in path:
        body = json.loads(event.get('body') or '{}')
        endpoint = body.get('endpoint', '')
        p256dh = body.get('p256dh', '')
        auth = body.get('auth', '')
        session_id = body.get('session_id', '')
        if not endpoint or not p256dh or not auth:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'endpoint, p256dh, auth required'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"""
            INSERT INTO {S('push_subscriptions')} (session_id, endpoint, p256dh, auth)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (endpoint) DO UPDATE SET session_id = EXCLUDED.session_id, p256dh = EXCLUDED.p256dh, auth = EXCLUDED.auth
        """, (session_id, endpoint, p256dh, auth))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    if method == 'POST' and 'send' in path:
        body = json.loads(event.get('body') or '{}')
        title = body.get('title', 'Флора')
        message = body.get('message', '')
        session_id = body.get('session_id')
        if not message:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'message required'})}

        conn = get_conn()
        cur = conn.cursor()
        if session_id:
            cur.execute(f"SELECT endpoint, p256dh, auth FROM {S('push_subscriptions')} WHERE session_id = %s", (session_id,))
        else:
            cur.execute(f"SELECT endpoint, p256dh, auth FROM {S('push_subscriptions')}")
        subs = cur.fetchall()
        conn.close()

        try:
            from pywebpush import webpush, WebPushException
            vapid_private = os.environ.get('VAPID_PRIVATE_KEY', '')
            vapid_email = os.environ.get('VAPID_EMAIL', 'admin@flora-shop.ru')
            sent = 0
            failed = 0
            for sub in subs:
                try:
                    webpush(
                        subscription_info={'endpoint': sub[0], 'keys': {'p256dh': sub[1], 'auth': sub[2]}},
                        data=json.dumps({'title': title, 'body': message}),
                        vapid_private_key=vapid_private,
                        vapid_claims={'sub': f'mailto:{vapid_email}'}
                    )
                    sent += 1
                except WebPushException:
                    failed += 1
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True, 'sent': sent, 'failed': failed, 'total': len(subs)})}
        except ImportError:
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({
                'ok': True,
                'subscriptions': [{'endpoint': s[0], 'p256dh': s[1], 'auth': s[2]} for s in subs],
                'payload': {'title': title, 'body': message}
            })}

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT COUNT(*) FROM {S('push_subscriptions')}")
        count = cur.fetchone()[0]
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'count': count})}

    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'method not allowed'})}