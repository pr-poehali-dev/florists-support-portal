import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'about', label: 'О нас' },
  { id: 'contacts', label: 'Контакты' },
  { id: 'faq', label: 'FAQ' },
];

export default function Header({ activePage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="font-display text-2xl font-light tracking-widest text-foreground hover:text-accent transition-colors"
        >
          ФЛОРА
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`font-body text-sm tracking-wider transition-colors ${
                activePage === link.id
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('chat')}
            className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs tracking-wider font-body hover:bg-accent transition-colors"
          >
            <Icon name="MessageCircle" size={14} />
            Чат с менеджером
          </button>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
              className={`text-left font-body text-sm tracking-wider py-1 transition-colors ${
                activePage === link.id ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onNavigate('chat'); setMobileOpen(false); }}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs tracking-wider font-body w-fit hover:bg-accent transition-colors"
          >
            <Icon name="MessageCircle" size={14} />
            Чат с менеджером
          </button>
        </div>
      )}
    </header>
  );
}
