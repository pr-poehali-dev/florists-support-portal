import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  return (
    <div className="pt-28 pb-20 max-w-6xl mx-auto px-6">
      <div className="mb-16 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
        <div className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-2">Связь</div>
        <h1 className="font-display text-5xl md:text-6xl font-light">Контакты</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-8">
          {/* Address */}
          <div className="border border-border p-8">
            <div className="flex items-start gap-4">
              <Icon name="MapPin" size={20} className="text-accent mt-0.5 shrink-0" />
              <div>
                <div className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">Адрес</div>
                <p className="font-display text-xl font-light">Москва, ул. Цветочная, 12</p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  м. Пушкинская, 5 минут пешком
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="border border-border p-8">
            <div className="flex items-start gap-4">
              <Icon name="Phone" size={20} className="text-accent mt-0.5 shrink-0" />
              <div>
                <div className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">Телефон</div>
                <a href="tel:+79991234567" className="font-display text-xl font-light hover:text-accent transition-colors">
                  +7 (999) 123-45-67
                </a>
                <p className="font-body text-sm text-muted-foreground mt-1">Ежедневно 9:00–21:00</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="border border-border p-8">
            <div className="flex items-start gap-4">
              <Icon name="Mail" size={20} className="text-accent mt-0.5 shrink-0" />
              <div>
                <div className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">Email</div>
                <a href="mailto:hello@flora-shop.ru" className="font-display text-xl font-light hover:text-accent transition-colors">
                  hello@flora-shop.ru
                </a>
                <p className="font-body text-sm text-muted-foreground mt-1">Отвечаем в течение 2 часов</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">Мы в социальных сетях</div>
            <div className="flex gap-3">
              {[
                { icon: 'Send', label: 'Telegram' },
                { icon: 'Instagram', label: 'Instagram' },
                { icon: 'MessageCircle', label: 'WhatsApp' },
              ].map((soc) => (
                <button
                  key={soc.label}
                  className="flex items-center gap-2 border border-border px-4 py-2 font-body text-xs tracking-wider text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={soc.icon as 'Send'} size={14} />
                  {soc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map placeholder + Hours */}
        <div className="flex flex-col gap-6">
          <div className="aspect-video bg-muted flex items-center justify-center border border-border overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/79e08213-09b9-466c-b69a-3ba54924429a.jpg"
              alt="Наш магазин"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute font-body text-xs tracking-widest uppercase text-foreground bg-background/80 px-4 py-2">
              Карта · Открыть в Яндекс
            </div>
          </div>

          <div className="border border-border p-8">
            <div className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">Часы работы</div>
            <div className="flex flex-col gap-2">
              {[
                { day: 'Понедельник — Пятница', time: '9:00 — 21:00' },
                { day: 'Суббота', time: '10:00 — 20:00' },
                { day: 'Воскресенье', time: '10:00 — 18:00' },
              ].map((row) => (
                <div key={row.day} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="font-body text-sm">{row.day}</span>
                  <span className="font-body text-sm text-accent font-medium">{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
