import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const CHAT_URL = 'https://functions.poehali.dev/15454535-6285-41cd-89e8-299ad46cc4f5';
const PUSH_URL = 'https://functions.poehali.dev/5280dcd6-8a8b-448a-9568-cdf0a8401e4f';

interface Message {
  id: number;
  from: 'user' | 'manager';
  text: string;
  time: string;
}

function getSessionId(): string {
  let sid = localStorage.getItem('flora_chat_sid');
  if (!sid) {
    sid = 'u_' + Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem('flora_chat_sid', sid);
  }
  return sid;
}

function now() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [pushStatus, setPushStatus] = useState<'idle' | 'granted' | 'denied' | 'unsupported'>('idle');
  const bottomRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionId = useRef(getSessionId());

  useEffect(() => {
    loadMessages();
    checkPushStatus();
    // Полинг каждые 5 секунд
    pollRef.current = setInterval(loadMessages, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkPushStatus = () => {
    if (!('Notification' in window)) { setPushStatus('unsupported'); return; }
    if (Notification.permission === 'granted') setPushStatus('granted');
    else if (Notification.permission === 'denied') setPushStatus('denied');
    else setPushStatus('idle');
  };

  const loadMessages = async () => {
    try {
      const res = await fetch(`${CHAT_URL}?session_id=${sessionId.current}`);
      const data = await res.json();
      const msgs: Message[] = data.messages || [];
      if (msgs.length === 0 && messages.length === 0) {
        setMessages([{ id: 0, from: 'manager', text: 'Добрый день! Я Мария, флорист Флоры 🌸 Чем могу помочь?', time: now() }]);
      } else if (msgs.length > 0) {
        setMessages(msgs);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    const optimistic: Message = { id: Date.now(), from: 'user', text, time: now() };
    setMessages((prev) => [...prev, optimistic]);
    setInput('');
    try {
      await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId.current, text, from_role: 'user' }),
      });
    } catch {
      // silent
    } finally {
      setSending(false);
    }
  };

  const requestPush = async () => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setPushStatus('unsupported');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') { setPushStatus('denied'); return; }
    setPushStatus('granted');

    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa40HVKE-8HZ8m8Kwf2O-MQRDsIiMI4H3iobWqEkuq8-jivfKWqEkuq8'),
      });
      const json = sub.toJSON();
      await fetch(`${PUSH_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId.current,
          endpoint: json.endpoint,
          p256dh: json.keys?.p256dh || '',
          auth: json.keys?.auth || '',
        }),
      });
    } catch {
      // VAPID not configured — store with empty keys
      await fetch(`${PUSH_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId.current,
          endpoint: `browser_${sessionId.current}`,
          p256dh: 'local',
          auth: 'local',
        }),
      });
    }
  };

  return (
    <div className="pt-16 h-screen flex flex-col max-w-3xl mx-auto px-0 md:px-6">
      <div className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <Icon name="Flower" size={18} className="text-accent-foreground" />
          </div>
          <div>
            <div className="font-display text-lg font-light">Поддержка Флора</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="font-body text-xs text-muted-foreground">Онлайн</span>
            </div>
          </div>
        </div>

        {pushStatus === 'idle' && (
          <button
            onClick={requestPush}
            className="flex items-center gap-2 font-body text-xs border border-border px-3 py-1.5 hover:bg-accent transition-colors"
          >
            <Icon name="Bell" size={13} />
            Уведомления
          </button>
        )}
        {pushStatus === 'granted' && (
          <div className="flex items-center gap-1.5 font-body text-xs text-green-600">
            <Icon name="BellRing" size={13} />
            Включены
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 bg-secondary/20">
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {msg.from === 'manager' && (
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 mt-auto">
                <Icon name="Flower2" size={14} className="text-accent-foreground" />
              </div>
            )}
            <div className={`max-w-[75%] px-4 py-3 ${
              msg.from === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-background border border-border text-foreground'
            }`}>
              <p className="font-body text-sm leading-relaxed">{msg.text}</p>
              <span className={`font-body text-[10px] mt-1 block ${
                msg.from === 'user' ? 'text-primary-foreground/60 text-right' : 'text-muted-foreground'
              }`}>{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="bg-background border-t border-border px-4 py-4 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Напишите сообщение..."
          className="flex-1 bg-secondary border-0 outline-none px-4 py-2.5 font-body text-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-accent"
        />
        <button
          onClick={send}
          disabled={!input.trim() || sending}
          className="bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Icon name="Send" size={16} />
        </button>
      </div>
    </div>
  );
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
