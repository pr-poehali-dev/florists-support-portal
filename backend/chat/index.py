# v2
import json
import os
import uuid
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
}

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def S(table):
    return f'{SCHEMA}.{table}'

def handler(event: dict, context) -> dict:
    """Чат между пользователем и менеджером (флорист)."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        session_id = params.get('session_id')
        if not session_id:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'session_id required'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"""
            INSERT INTO {S('chat_sessions')} (session_id) VALUES (%s)
            ON CONFLICT (session_id) DO NOTHING
        """, (session_id,))
        cur.execute(f"""
            SELECT id, from_role, text, created_at
            FROM {S('chat_messages')}
            WHERE session_id = %s
            ORDER BY created_at ASC
        """, (session_id,))
        rows = cur.fetchall()
        conn.commit()
        conn.close()
        messages = [{'id': r[0], 'from': r[1], 'text': r[2], 'time': r[3].strftime('%H:%M')} for r in rows]
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'messages': messages})}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        session_id = body.get('session_id') or str(uuid.uuid4())
        text = (body.get('text') or '').strip()
        from_role = body.get('from_role', 'user')
        if not text:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'text required'})}
        if from_role not in ('user', 'manager'):
            from_role = 'user'

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"""
            INSERT INTO {S('chat_sessions')} (session_id) VALUES (%s)
            ON CONFLICT (session_id) DO UPDATE SET last_message_at = NOW()
        """, (session_id,))
        cur.execute(f"""
            INSERT INTO {S('chat_messages')} (session_id, from_role, text, is_read)
            VALUES (%s, %s, %s, %s)
            RETURNING id, created_at
        """, (session_id, from_role, text, from_role == 'manager'))
        row = cur.fetchone()
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({
            'id': row[0], 'session_id': session_id,
            'from': from_role, 'text': text, 'time': row[1].strftime('%H:%M')
        })}

    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'method not allowed'})}