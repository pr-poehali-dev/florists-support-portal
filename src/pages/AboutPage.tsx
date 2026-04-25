export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <div className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-2">О нас</div>
          <h1 className="font-display text-5xl md:text-6xl font-light">Наша история</h1>
        </div>

        {/* Main story */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img
              src="https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/79e08213-09b9-466c-b69a-3ba54924429a.jpg"
              alt="Наш магазин"
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-display text-2xl md:text-3xl font-light leading-relaxed text-foreground">
              «Цветы — это язык без слов. Мы помогаем людям говорить на нём с 2014 года.»
            </p>
            <div className="w-12 h-px bg-accent" />
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Флора начиналась как маленькая мастерская в двух шагах от Патриарших прудов. 
              Основатель — Анна Соколова — флорист с 15-летним опытом, ученица мастеров 
              из Амстердама и Лондона. Каждый букет она рассматривает как произведение 
              искусства: с продуманной формой, фактурой и ароматом.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Сегодня команда Флоры — это 12 флористов, которые работают ежедневно, 
              принимая заказы на букеты любой сложности. Мы сотрудничаем 
              с лучшими плантациями Нидерландов, Колумбии и Эквадора.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: '🌿',
              title: 'Свежесть',
              desc: 'Цветы поступают напрямую с плантаций дважды в неделю. Никаких посредников.',
            },
            {
              icon: '✦',
              title: 'Авторство',
              desc: 'Каждая композиция создаётся вручную. Мы не используем шаблоны — только творчество.',
            },
            {
              icon: '🚚',
              title: 'Скорость',
              desc: 'Доставка по Москве от 2 часов. Срочная доставка за 60 минут по договорённости.',
            },
          ].map((val) => (
            <div key={val.title} className="border border-border p-8">
              <div className="text-3xl mb-4">{val.icon}</div>
              <h3 className="font-display text-xl font-light mb-3">{val.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div>
          <div className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-2">Команда</div>
          <h2 className="font-display text-4xl font-light mb-10">Наши флористы</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Анна Соколова', role: 'Основатель & главный флорист' },
              { name: 'Мария Белова', role: 'Флорист-дизайнер' },
              { name: 'Дмитрий Крылов', role: 'Флорист & декоратор' },
              { name: 'Ольга Новикова', role: 'Флорист & консультант' },
            ].map((person) => (
              <div key={person.name} className="text-center">
                <div className="aspect-square bg-muted mb-3 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/c7c18e6c-9aa3-4a73-a89a-b765ba619928.jpg"
                    alt={person.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <h4 className="font-display text-lg font-light">{person.name}</h4>
                <p className="font-body text-xs text-muted-foreground mt-1">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
