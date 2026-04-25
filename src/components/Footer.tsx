interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border mt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="font-display text-2xl font-light tracking-widest mb-3">ФЛОРА</div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Изысканные букеты и цветочные<br />
            композиции для особых моментов
          </p>
        </div>

        <div>
          <div className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">Навигация</div>
          <div className="flex flex-col gap-2">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'catalog', label: 'Каталог' },
              { id: 'about', label: 'О нас' },
              { id: 'contacts', label: 'Контакты' },
              { id: 'faq', label: 'FAQ' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-left font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">Контакты</div>
          <div className="flex flex-col gap-2 text-sm font-body text-muted-foreground">
            <span>+7 (999) 123-45-67</span>
            <span>hello@flora-shop.ru</span>
            <span>Москва, ул. Цветочная, 12</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border flex justify-between items-center">
        <span className="font-body text-xs text-muted-foreground">© 2024 Флора. Все права защищены.</span>
        <span className="font-body text-xs text-muted-foreground">Работаем ежедневно 9:00–21:00</span>
      </div>
    </footer>
  );
}
