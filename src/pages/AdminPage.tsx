import { useState } from 'react';
import Icon from '@/components/ui/icon';

type AdminSection = 'dashboard' | 'orders' | 'catalog' | 'messages';

const ADMIN_PASSWORD = 'flora2024';

// ─── Mock Data ────────────────────────────────────────────────
const mockOrders = [
  { id: '#1042', client: 'Анна Петрова', phone: '+7 915 123-45-67', product: 'Романтика', price: 4200, status: 'new', date: '25.04.2024', address: 'Ленинский пр-т, 32' },
  { id: '#1041', client: 'Дмитрий Козлов', phone: '+7 926 987-65-43', product: 'Весенний бриз', price: 3100, status: 'delivery', date: '25.04.2024', address: 'Тверская ул., 18' },
  { id: '#1040', client: 'Мария Сидорова', phone: '+7 903 456-78-90', product: 'Флора Luxe', price: 5800, status: 'done', date: '24.04.2024', address: 'Арбат, 7' },
  { id: '#1039', client: 'Иван Новиков', phone: '+7 916 321-00-11', product: 'Алые паруса', price: 3500, status: 'done', date: '24.04.2024', address: 'Пречистенка, 44' },
  { id: '#1038', client: 'Елена Васильева', phone: '+7 903 777-88-99', product: 'Нежность', price: 2900, status: 'cancelled', date: '23.04.2024', address: 'Садовая, 12' },
  { id: '#1037', client: 'Сергей Морозов', phone: '+7 916 654-32-10', product: 'Тропик', price: 6500, status: 'new', date: '25.04.2024', address: 'Кутузовский пр-т, 55' },
];

const mockProducts = [
  { id: 1, name: 'Романтика', cat: 'Пионы', price: 4200, stock: 8, active: true },
  { id: 2, name: 'Весенний бриз', cat: 'Тюльпаны', price: 3100, stock: 5, active: true },
  { id: 3, name: 'Флора Luxe', cat: 'Композиции', price: 5800, stock: 3, active: true },
  { id: 4, name: 'Нежность', cat: 'Розы', price: 2900, stock: 12, active: true },
  { id: 5, name: 'Полевые грёзы', cat: 'Букеты', price: 1900, stock: 0, active: false },
  { id: 6, name: 'Тропик', cat: 'Экзотика', price: 6500, stock: 2, active: true },
  { id: 7, name: 'Алые паруса', cat: 'Розы', price: 3500, stock: 7, active: true },
  { id: 8, name: 'Утро в Провансе', cat: 'Пионы', price: 4800, stock: 4, active: true },
];

const mockMessages = [
  { id: 1, name: 'Ольга К.', text: 'Хочу заказать букет на свадьбу. Бюджет 15 000 ₽, 15 мая.', time: '10:34', read: false },
  { id: 2, name: 'Артём М.', text: 'Есть ли у вас орхидеи в продаже?', time: '09:12', read: false },
  { id: 3, name: 'Наталья С.', text: 'Когда будет готов мой заказ #1040?', time: 'вчера', read: true },
  { id: 4, name: 'Борис Л.', text: 'Спасибо за букет! Всё очень красиво 🌸', time: 'вчера', read: true },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: 'Новый', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  delivery: { label: 'Доставка', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  done: { label: 'Выполнен', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  cancelled: { label: 'Отменён', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
};

// ─── Login ────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const submit = () => {
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-display text-3xl tracking-widest text-white mb-1">ФЛОРА</div>
          <div className="text-[11px] tracking-[0.3em] uppercase text-zinc-500">Административная панель</div>
        </div>
        <div className={`transition-transform ${error ? 'animate-[shake_0.3s_ease]' : ''}`}>
          <input
            type="password"
            placeholder="Пароль"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className={`w-full bg-zinc-900 border ${error ? 'border-red-500' : 'border-zinc-700'} text-white placeholder:text-zinc-600 px-5 py-3.5 text-sm font-body outline-none focus:border-zinc-400 transition-colors mb-3`}
          />
          {error && <p className="text-red-400 text-xs font-body mb-3">Неверный пароль</p>}
          <button
            onClick={submit}
            className="w-full bg-white text-zinc-900 py-3.5 text-sm font-body tracking-widest hover:bg-zinc-200 transition-colors"
          >
            Войти
          </button>
        </div>
        <p className="text-center text-zinc-600 text-[11px] mt-6 font-body">Доступ только для администраторов</p>
      </div>
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`}</style>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────
const navItems = [
  { id: 'dashboard', icon: 'LayoutDashboard', label: 'Дашборд' },
  { id: 'orders', icon: 'ShoppingBag', label: 'Заказы', badge: 2 },
  { id: 'catalog', icon: 'Package', label: 'Каталог' },
  { id: 'messages', icon: 'MessageSquare', label: 'Сообщения', badge: 2 },
] as const;

function Sidebar({ active, onChange, onExit }: {
  active: AdminSection;
  onChange: (s: AdminSection) => void;
  onExit: () => void;
}) {
  return (
    <aside className="w-56 bg-[#0e0e10] border-r border-zinc-800 flex flex-col shrink-0">
      <div className="px-6 py-6 border-b border-zinc-800">
        <div className="font-display text-xl tracking-widest text-white">ФЛОРА</div>
        <div className="text-[10px] tracking-widest text-zinc-500 mt-0.5">ADMIN</div>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id as AdminSection)}
            className={`flex items-center gap-3 px-3 py-2.5 text-left transition-colors rounded-sm relative ${
              active === item.id
                ? 'bg-white/10 text-white'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
            }`}
          >
            <Icon name={item.icon} size={16} />
            <span className="font-body text-sm">{item.label}</span>
            {(item as { badge?: number }).badge && (
              <span className="ml-auto bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                {(item as { badge?: number }).badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-zinc-800">
        <button
          onClick={onExit}
          className="flex items-center gap-3 px-3 py-2.5 text-zinc-500 hover:text-zinc-300 w-full transition-colors"
        >
          <Icon name="LogOut" size={16} />
          <span className="font-body text-sm">Выйти</span>
        </button>
      </div>
    </aside>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
function Dashboard() {
  const stats = [
    { label: 'Заказов сегодня', value: '4', delta: '+1 вчера', icon: 'ShoppingBag', up: true },
    { label: 'Выручка (апрель)', value: '87 400 ₽', delta: '+12% к марту', icon: 'TrendingUp', up: true },
    { label: 'Новых клиентов', value: '18', delta: '+3 вчера', icon: 'Users', up: true },
    { label: 'Отменённых', value: '2', delta: '-1 вчера', icon: 'XCircle', up: false },
  ];

  const recentOrders = mockOrders.slice(0, 4);

  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-light text-white">Дашборд</h1>
        <p className="font-body text-sm text-zinc-500 mt-1">Суббота, 25 апреля 2024</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
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

      {/* Recent orders */}
      <div className="bg-zinc-900 border border-zinc-800">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <span className="font-body text-sm text-white">Последние заказы</span>
          <span className="font-body text-xs text-zinc-500">Апрель 2024</span>
        </div>
        <div className="divide-y divide-zinc-800">
          {recentOrders.map((order) => {
            const st = statusLabels[order.status];
            return (
              <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                <span className="font-body text-sm text-zinc-400 w-14">{order.id}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-body text-sm text-white truncate">{order.client}</div>
                  <div className="font-body text-xs text-zinc-500 truncate">{order.product}</div>
                </div>
                <span className="font-body text-sm text-white">{order.price.toLocaleString('ru-RU')} ₽</span>
                <span className={`font-body text-[11px] px-2.5 py-0.5 border rounded-full ${st.color}`}>{st.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Orders ───────────────────────────────────────────────────
function Orders() {
  const [filter, setFilter] = useState<string>('all');
  const [orders, setOrders] = useState(mockOrders);

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  const cycleStatus = (id: string) => {
    const cycle: Record<string, string> = { new: 'delivery', delivery: 'done', done: 'done', cancelled: 'cancelled' };
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: cycle[o.status] } : o));
  };

  const filters = [
    { key: 'all', label: 'Все' },
    { key: 'new', label: 'Новые' },
    { key: 'delivery', label: 'Доставка' },
    { key: 'done', label: 'Выполнен' },
    { key: 'cancelled', label: 'Отменён' },
  ];

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-light text-white">Заказы</h1>
        <p className="font-body text-sm text-zinc-500 mt-1">{orders.length} заказов</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`font-body text-xs tracking-wider px-4 py-1.5 border transition-colors ${
              filter === f.key
                ? 'bg-white text-zinc-900 border-white'
                : 'border-zinc-700 text-zinc-500 hover:border-zinc-400 hover:text-zinc-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                {['Номер', 'Клиент', 'Букет', 'Адрес', 'Дата', 'Сумма', 'Статус', ''].map((h) => (
                  <th key={h} className="px-5 py-3 text-left font-body text-[11px] tracking-widest uppercase text-zinc-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filtered.map((order) => {
                const st = statusLabels[order.status];
                return (
                  <tr key={order.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-5 py-4 font-body text-sm text-zinc-400">{order.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-body text-sm text-white">{order.client}</div>
                      <div className="font-body text-xs text-zinc-500">{order.phone}</div>
                    </td>
                    <td className="px-5 py-4 font-body text-sm text-zinc-300">{order.product}</td>
                    <td className="px-5 py-4 font-body text-xs text-zinc-500 max-w-[140px] truncate">{order.address}</td>
                    <td className="px-5 py-4 font-body text-xs text-zinc-500">{order.date}</td>
                    <td className="px-5 py-4 font-body text-sm text-white">{order.price.toLocaleString('ru-RU')} ₽</td>
                    <td className="px-5 py-4">
                      <span className={`font-body text-[11px] px-2.5 py-0.5 border rounded-full ${st.color}`}>{st.label}</span>
                    </td>
                    <td className="px-5 py-4">
                      {order.status !== 'done' && order.status !== 'cancelled' && (
                        <button
                          onClick={() => cycleStatus(order.id)}
                          className="font-body text-xs text-zinc-500 hover:text-white transition-colors"
                        >
                          →
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 font-body text-zinc-600 text-sm">Нет заказов</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Catalog ──────────────────────────────────────────────────
function Catalog() {
  const [products, setProducts] = useState(mockProducts);
  const [editing, setEditing] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState('');

  const toggleActive = (id: number) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));
  };

  const startEdit = (p: typeof products[0]) => {
    setEditing(p.id);
    setEditPrice(String(p.price));
  };

  const saveEdit = (id: number) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, price: Number(editPrice) || p.price } : p));
    setEditing(null);
  };

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-light text-white">Каталог</h1>
          <p className="font-body text-sm text-zinc-500 mt-1">{products.length} позиций</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-zinc-900 px-5 py-2.5 font-body text-sm tracking-wider hover:bg-zinc-200 transition-colors">
          <Icon name="Plus" size={15} />
          Добавить
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                {['Название', 'Категория', 'Цена', 'Остаток', 'Статус', ''].map((h) => (
                  <th key={h} className="px-5 py-3 text-left font-body text-[11px] tracking-widest uppercase text-zinc-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-5 py-4 font-body text-sm text-white">{p.name}</td>
                  <td className="px-5 py-4 font-body text-xs text-zinc-500">{p.cat}</td>
                  <td className="px-5 py-4">
                    {editing === p.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-24 bg-zinc-800 border border-zinc-600 text-white px-2 py-1 text-sm font-body outline-none"
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(p.id)}
                        />
                        <button onClick={() => saveEdit(p.id)} className="text-emerald-400 hover:text-emerald-300">
                          <Icon name="Check" size={14} />
                        </button>
                        <button onClick={() => setEditing(null)} className="text-zinc-500 hover:text-zinc-300">
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(p)}
                        className="font-body text-sm text-white hover:text-zinc-400 transition-colors"
                      >
                        {p.price.toLocaleString('ru-RU')} ₽
                      </button>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-body text-sm ${p.stock === 0 ? 'text-red-400' : p.stock <= 3 ? 'text-amber-400' : 'text-zinc-300'}`}>
                      {p.stock === 0 ? 'Нет' : `${p.stock} шт.`}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleActive(p.id)}
                      className={`font-body text-[11px] px-2.5 py-0.5 border rounded-full transition-colors ${
                        p.active
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                      }`}
                    >
                      {p.active ? 'Активен' : 'Скрыт'}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEdit(p)} className="text-zinc-500 hover:text-white transition-colors">
                        <Icon name="Pencil" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Messages ─────────────────────────────────────────────────
function Messages() {
  const [msgs, setMsgs] = useState(mockMessages);
  const [selected, setSelected] = useState<typeof mockMessages[0] | null>(null);

  const markRead = (id: number) => {
    setMsgs((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  };

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-light text-white">Сообщения</h1>
        <p className="font-body text-sm text-zinc-500 mt-1">{msgs.filter((m) => !m.read).length} непрочитанных</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* List */}
        <div className="bg-zinc-900 border border-zinc-800 divide-y divide-zinc-800">
          {msgs.map((m) => (
            <button
              key={m.id}
              onClick={() => { setSelected(m); markRead(m.id); }}
              className={`w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-zinc-800/50 transition-colors ${selected?.id === m.id ? 'bg-zinc-800/70' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                <span className="font-body text-xs text-zinc-300">{m.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body text-sm text-white">{m.name}</span>
                  <span className="font-body text-[11px] text-zinc-500">{m.time}</span>
                </div>
                <p className="font-body text-xs text-zinc-500 truncate">{m.text}</p>
              </div>
              {!m.read && <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1" />}
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="bg-zinc-900 border border-zinc-800">
          {selected ? (
            <div className="flex flex-col h-full">
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                  <span className="font-body text-xs text-zinc-300">{selected.name[0]}</span>
                </div>
                <span className="font-body text-sm text-white">{selected.name}</span>
              </div>
              <div className="flex-1 p-5">
                <div className="bg-zinc-800 px-4 py-3 max-w-[85%]">
                  <p className="font-body text-sm text-zinc-200 leading-relaxed">{selected.text}</p>
                  <span className="font-body text-[10px] text-zinc-500 mt-1 block">{selected.time}</span>
                </div>
              </div>
              <div className="p-4 border-t border-zinc-800 flex gap-2">
                <input
                  placeholder="Написать ответ..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 text-zinc-200 placeholder:text-zinc-600 px-4 py-2.5 text-sm font-body outline-none focus:border-zinc-500"
                />
                <button className="bg-white text-zinc-900 px-4 py-2.5 hover:bg-zinc-200 transition-colors">
                  <Icon name="Send" size={15} />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="font-body text-sm text-zinc-600">Выберите сообщение</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────
export default function AdminPage({ onExit }: { onExit: () => void }) {
  const [auth, setAuth] = useState(false);
  const [section, setSection] = useState<AdminSection>('dashboard');

  if (!auth) {
    return <LoginScreen onLogin={() => setAuth(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#111113] flex" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      <Sidebar active={section} onChange={setSection} onExit={onExit} />
      <div className="flex-1 overflow-auto">
        {section === 'dashboard' && <Dashboard />}
        {section === 'orders' && <Orders />}
        {section === 'catalog' && <Catalog />}
        {section === 'messages' && <Messages />}
      </div>
    </div>
  );
}
