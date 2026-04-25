import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  from: 'user' | 'manager';
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    from: 'manager',
    text: 'Добрый день! Я Мария, флорист Флоры 🌸 Чем могу помочь?',
    time: '10:01',
  },
];

function now() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now(), from: 'user', text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        from: 'manager',
        text: 'Спасибо за ваш вопрос! Наш менеджер ответит в ближайшее время. Среднее время ответа — 5 минут.',
        time: now(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="pt-16 h-screen flex flex-col max-w-3xl mx-auto px-0 md:px-6">
      {/* Chat header */}
      <div className="bg-background border-b border-border px-6 py-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <Icon name="Flower" size={18} className="text-accent-foreground" />
        </div>
        <div>
          <div className="font-display text-lg font-light">Поддержка Флора</div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="font-body text-xs text-muted-foreground">Онлайн сейчас</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 bg-secondary/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {msg.from === 'manager' && (
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 mt-auto">
                <Icon name="Flower2" size={14} className="text-accent-foreground" />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 ${
                msg.from === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border text-foreground'
              }`}
            >
              <p className="font-body text-sm leading-relaxed">{msg.text}</p>
              <span className={`font-body text-[10px] mt-1 block ${
                msg.from === 'user' ? 'text-primary-foreground/60 text-right' : 'text-muted-foreground'
              }`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
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
          disabled={!input.trim()}
          className="bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Icon name="Send" size={16} />
        </button>
      </div>
    </div>
  );
}
