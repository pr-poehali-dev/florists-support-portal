import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const CHAT_URL = 'https://functions.poehali.dev/15454535-6285-41cd-89e8-299ad46cc4f5';
const SESSIONS_URL = 'https://functions.poehali.dev/b4c4ea81-e7c6-44df-b745-fbd9727ec275';
const PUSH_URL = 'https://functions.poehali.dev/5280dcd6-8a8b-448a-9568-cdf0a8401e4f';

const ADMIN_PASSWORD = 'flora2024';

type AdminSection = 'dashboard' | 'messages' | 'push';

const mockStats = [
  { label: 'Заказов сегодня', value: '4', delta: '+1 вчера', icon: 'ShoppingBag', up: true },
  { label: 'Выручка (апрель)', value: '87 400 ₽', delta: '+12% к марту', icon: 'TrendingUp', up: true },
  { label: 'Новых клиентов', value: '18', delta: '+3 вчера', icon: 'Users', up: true },
  { label: 'Отменённых', value: '2', delta: '-1 вчера', icon: 'XCircle', up: false },
];

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const submit = () => {
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setError(true); setTimeout(() => setError(false), 1500); }
  };
  return (
    <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-display text-3xl tracking-widest text-white mb-1">ФЛОРА</div>
          <div className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">Административная панель</div>
        </div>
        <div className={error ? 'animate-[shake_0.3s_ease]' : ''}>
          <input type="password" placeholder="Пароль" value={pw}
            onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()}
            className={`w-full bg-zinc-900 border ${error ? 'border-red-500' : 'border-zinc-700'} text-white placeholder:text-zinc-600 px-5 py-3.5 text-sm font-body outline-none focus:border-zinc-400 transition-colors mb-3`}
          />
          {error && <p className="text-red-400 text-xs font-body mb-3">Неверный пароль</p>}
          <button onClick={submit} className="w-full bg-white text-zinc-900 py-3.5 text-sm font-body tracking-widest hover:bg-zinc-200 transition-colors">
            Войти
          </button>
        </div>
      </div>
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`}</style>
    </div>
  );
}

const navItems = [
  { id: 'dashboard', icon: 'LayoutDashboard', label: 'Дашборд' },
  { id: 'messages', icon: 'MessageSquare', label: 'Чат' },
  { id: 'push', icon: 'Bell', label: 'Push-рассылка' },
] as const;

function Sidebar({ active, onChange, onExit, unread }: {
  active: AdminSection; onChange: (s: AdminSection) => void; onExit: () => void; unread: number;
}) {
  return (
    <aside className="w-56 bg-[#0e0e10] border-r border-zinc-800 flex flex-col shrink-0">
      <div className="px-6 py-6 border-b border-zinc-800">
        <div className="font-display text-xl tracking-widest text-white">ФЛОРА</div>
        <div className="text-[10px] tracking-widest text-zinc-500 mt-0.5">ADMIN</div>
      </div>
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => onChange(item.id as AdminSection)}
            className={`flex items-center gap-3 px-3 py-2.5 text-left transition-colors rounded-sm ${
              active === item.id ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
            }`}>
            <Icon name={item.icon} size={16} />
            <span className="font-body text-sm">{item.label}</span>
            {item.id === 'messages' && unread > 0 && (
              <span className="ml-auto bg-rose-500 text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-body">
                {unread}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-zinc-800">
        <button onClick={onExit} className="flex items-center gap-3 px-3 py-2.5 text-zinc-500 hover:text-zinc-300 w-full transition-colors">
          <Icon name="LogOut" size={16} />
          <span className="font-body text-sm">Выйти</span>
        </button>
      </div>
    </aside>
  );
}

function Dashboard({ onNavigate }: { onNavigate: (s: AdminSection) => void }) {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-light text-white">Дашборд</h1>
        <p className="font-body text-sm text-zinc-500 mt-1">Пятница, 25 апреля 2025</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((s) => (
          <div key={s.label} className="bg-zinc-900 border border-zinc-800 p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-xs text-zinc-500 tracking-wider">{s.label}</span>
              <Icon name={s.icon as 'ShoppingBag'} size={16} className="text-zinc-600" />
            </div>
            <div className="font-display text-2xl text-white font-light">{s.value}</div>
            <div className={`font-body text-[11px] ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.delta}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <button onClick={() => onNavigate('messages')}
          className="bg-zinc-900 border border-zinc-800 p-6 text-left hover:bg-zinc-800/80 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="MessageSquare" size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
            <span className="font-display text-lg font-light text-white">Чат с клиентами</span>
          </div>
          <p className="font-body text-sm text-zinc-500">Отвечайте на вопросы покупателей в реальном времени</p>
        </button>
        <button onClick={() => onNavigate('push')}
          className="bg-zinc-900 border border-zinc-800 p-6 text-left hover:bg-zinc-800/80 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Bell" size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
            <span className="font-display text-lg font-light text-white">Push-рассылка</span>
          </div>
          <p className="font-body text-sm text-zinc-500">Отправляйте уведомления подписчикам прямо в браузер</p>
        </button>
      </div>
    </div>
  );
}

interface ChatSession {
  session_id: string; user_name: string; last_at: string; last_text: string; unread: number;
}
interface ChatMessage {
  id: number; from: 'user' | 'manager'; text: string; time: string;
}

function Messages({ onUnreadChange }: { onUnreadChange: (n: number) => void }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selected, setSelected] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSessions();
    const t = setInterval(loadSessions, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!selected) return;
    loadMessages(selected.session_id);
    const t = setInterval(() => loadMessages(selected.session_id), 4000);
    return () => clearInterval(t);
  }, [selected?.session_id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadSessions = async () => {
    try {
      const res = await fetch(SESSIONS_URL);
      const data = await res.json();
      const list: ChatSession[] = data.sessions || [];
      setSessions(list);
      onUnreadChange(list.reduce((s, x) => s + x.unread, 0));
    } catch { /* silent */ }
  };

  const loadMessages = async (sessionId: string) => {
    try {
      const res = await fetch(`${SESSIONS_URL}?session_id=${sessionId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch { /* silent */ }
  };

  const selectSession = (s: ChatSession) => {
    setSelected(s);
    setSessions((prev) => prev.map((x) => x.session_id === s.session_id ? { ...x, unread: 0 } : x));
  };

  const sendReply = async () => {
    if (!reply.trim() || !selected || sending) return;
    setSending(true);
    const text = reply.trim();
    setReply('');
    try {
      await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: selected.session_id, text, from_role: 'manager' }),
      });
      await loadMessages(selected.session_id);
    } catch { /* silent */ }
    finally { setSending(false); }
  };

  return (
    <div className="p-8 flex flex-col gap-6" style={{ height: '100vh' }}>
      <div>
        <h1 className="font-display text-3xl font-light text-white">Чат с клиентами</h1>
        <p className="font-body text-sm text-zinc-500 mt-1">{sessions.length} диалогов</p>
      </div>
      <div className="grid md:grid-cols-[280px_1fr] gap-4 flex-1 min-h-0" style={{ height: 'calc(100vh - 180px)' }}>
        <div className="bg-zinc-900 border border-zinc-800 overflow-y-auto">
          {sessions.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 gap-2">
              <Icon name="MessageCircle" size={24} className="text-zinc-700" />
              <p className="font-body text-sm text-zinc-600">Нет диалогов</p>
            </div>
          )}
          {sessions.map((s) => (
            <button key={s.session_id} onClick={() => selectSession(s)}
              className={`w-full flex items-start gap-3 px-4 py-4 text-left border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors ${
                selected?.session_id === s.session_id ? 'bg-zinc-800/70' : ''
              }`}>
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                <span className="font-body text-xs text-zinc-300">{s.user_name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-body text-sm text-white">{s.user_name}</span>
                  <span className="font-body text-[11px] text-zinc-500">{s.last_at}</span>
                </div>
                <p className="font-body text-xs text-zinc-500 truncate">{s.last_text || 'Новый диалог'}</p>
              </div>
              {s.unread > 0 && <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1" />}
            </button>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 flex flex-col">
          {selected ? (
            <>
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                  <span className="font-body text-xs text-zinc-300">{selected.user_name[0]}</span>
                </div>
                <span className="font-body text-sm text-white">{selected.user_name}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 min-h-0">
                {messages.map((m) => (
                  <div key={m.id} className={`flex gap-2 ${m.from === 'manager' ? 'flex-row-reverse' : ''}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 ${m.from === 'manager' ? 'bg-white text-zinc-900' : 'bg-zinc-800 text-zinc-200'}`}>
                      <p className="font-body text-sm leading-relaxed">{m.text}</p>
                      <span className={`font-body text-[10px] mt-0.5 block text-zinc-500 ${m.from === 'manager' ? 'text-right' : ''}`}>{m.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div className="p-4 border-t border-zinc-800 flex gap-2">
                <input value={reply} onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendReply()}
                  placeholder="Написать ответ клиенту..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 text-zinc-200 placeholder:text-zinc-600 px-4 py-2.5 text-sm font-body outline-none focus:border-zinc-500"
                />
                <button onClick={sendReply} disabled={!reply.trim() || sending}
                  className="bg-white text-zinc-900 px-4 py-2.5 hover:bg-zinc-200 transition-colors disabled:opacity-40">
                  <Icon name="Send" size={15} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              <Icon name="MessageSquare" size={32} className="text-zinc-700" />
              <p className="font-body text-sm text-zinc-600">Выберите диалог слева</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PushSection() {
  const [title, setTitle] = useState('Флора');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch(PUSH_URL).then((r) => r.json()).then((d) => setCount(d.count)).catch(() => {});
  }, []);

  const send = async () => {
    if (!message.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch(`${PUSH_URL}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() || 'Флора', message: message.trim() }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('done');
        setResult(`Отправлено: ${data.sent ?? '—'} из ${data.total ?? count ?? 0}`);
        setMessage('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error'); setResult('Ошибка отправки');
      }
    } catch {
      setStatus('error'); setResult('Ошибка соединения');
    }
  };

  const templates = [
    '🌸 Новые поступления роз — заходите смотреть!',
    '🎁 Скидка 15% на все букеты до конца недели',
    '🚚 Ваш заказ передан курьеру. Ожидайте!',
    '💐 Весенняя коллекция уже доступна',
  ];

  return (
    <div className="p-8 flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="font-display text-3xl font-light text-white">Push-рассылка</h1>
        <p className="font-body text-sm text-zinc-500 mt-1">
          {count === null ? 'Загрузка...' : `${count} подписчик${count === 1 ? '' : count < 5 ? 'а' : 'ов'}`}
        </p>
      </div>

      {count === 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 px-5 py-4">
          <p className="font-body text-sm text-amber-300">
            Пока нет подписчиков. Когда клиенты разрешат уведомления в чате — они появятся здесь автоматически.
          </p>
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col gap-5">
        <div>
          <label className="font-body text-xs text-zinc-500 tracking-widest uppercase block mb-2">Заголовок</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 text-sm font-body outline-none focus:border-zinc-500 transition-colors"
          />
        </div>
        <div>
          <label className="font-body text-xs text-zinc-500 tracking-widest uppercase block mb-2">Текст сообщения</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
            placeholder="Введите текст уведомления..."
            className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-600 px-4 py-3 text-sm font-body outline-none focus:border-zinc-500 transition-colors resize-none"
          />
        </div>
        <div>
          <label className="font-body text-xs text-zinc-500 tracking-widest uppercase block mb-3">Шаблоны</label>
          <div className="flex flex-col gap-2">
            {templates.map((t) => (
              <button key={t} onClick={() => setMessage(t)}
                className="text-left font-body text-sm text-zinc-400 hover:text-white px-3 py-2 border border-zinc-800 hover:border-zinc-600 transition-colors">
                {t}
              </button>
            ))}
          </div>
        </div>
        <button onClick={send} disabled={!message.trim() || status === 'sending'}
          className="w-full bg-white text-zinc-900 py-3.5 font-body text-sm tracking-wider hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {status === 'sending'
            ? <><div className="w-4 h-4 border-2 border-zinc-600 border-t-transparent rounded-full animate-spin" /> Отправка...</>
            : <><Icon name="Send" size={15} /> Отправить всем</>
          }
        </button>
        {(status === 'done' || status === 'error') && (
          <div className={`font-body text-sm text-center ${status === 'done' ? 'text-emerald-400' : 'text-red-400'}`}>{result}</div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage({ onExit }: { onExit: () => void }) {
  const [auth, setAuth] = useState(false);
  const [section, setSection] = useState<AdminSection>('dashboard');
  const [unread, setUnread] = useState(0);

  if (!auth) return <LoginScreen onLogin={() => setAuth(true)} />;

  return (
    <div className="min-h-screen bg-[#111113] flex" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      <Sidebar active={section} onChange={setSection} onExit={onExit} unread={unread} />
      <div className="flex-1 overflow-auto">
        {section === 'dashboard' && <Dashboard onNavigate={setSection} />}
        {section === 'messages' && <Messages onUnreadChange={setUnread} />}
        {section === 'push' && <PushSection />}
      </div>
    </div>
  );
}
