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
    """Список сессий и непрочитанных сообщений для админ-панели."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        session_id = params.get('session_id')

        conn = get_conn()
        cur = conn.cursor()

        if session_id:
            cur.execute(f"""
                UPDATE {S('chat_messages')} SET is_read = TRUE
                WHERE session_id = %s AND from_role = 'user' AND is_read = FALSE
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

        cur.execute(f"""
            SELECT
                s.session_id,
                s.user_name,
                s.last_message_at,
                (SELECT text FROM {S('chat_messages')} WHERE session_id = s.session_id ORDER BY created_at DESC LIMIT 1) as last_text,
                (SELECT COUNT(*) FROM {S('chat_messages')} WHERE session_id = s.session_id AND from_role = 'user' AND is_read = FALSE) as unread
            FROM {S('chat_sessions')} s
            ORDER BY s.last_message_at DESC
            LIMIT 100
        """)
        rows = cur.fetchall()
        conn.close()
        sessions = [
            {
                'session_id': r[0],
                'user_name': r[1] or 'Гость',
                'last_at': r[2].strftime('%H:%M') if r[2] else '',
                'last_text': r[3] or '',
                'unread': int(r[4])
            }
            for r in rows
        ]
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'sessions': sessions})}

    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'method not allowed'})}