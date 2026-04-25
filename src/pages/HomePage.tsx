interface HomePageProps {
  onNavigate: (page: string) => void;
}

const featured = [
  {
    id: 1,
    name: 'Романтика',
    desc: 'Пионы, розы, эвкалипт',
    price: '4 200 ₽',
    img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/c7c18e6c-9aa3-4a73-a89a-b765ba619928.jpg',
    tag: 'Хит',
  },
  {
    id: 2,
    name: 'Весенний бриз',
    desc: 'Анемоны, тюльпаны, зелень',
    price: '3 100 ₽',
    img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/bd137c8a-32b9-4f88-aa0d-d2dc1df5817d.jpg',
    tag: 'Новинка',
  },
  {
    id: 3,
    name: 'Флора',
    desc: 'Сезонные цветы — лучший выбор',
    price: 'от 2 500 ₽',
    img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/79e08213-09b9-466c-b69a-3ba54924429a.jpg',
    tag: 'Сезонное',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-[#f5f0eb]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/79e08213-09b9-466c-b69a-3ba54924429a.jpg)`,
            opacity: 0.35,
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-xl animate-fade-up opacity-0-init" style={{ animationFillMode: 'forwards' }}>
            <div className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-6">
              Цветочный магазин · Москва
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-light leading-none text-foreground mb-6">
              Красота<br />
              <em className="italic text-accent">в каждом</em><br />
              букете
            </h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
              Авторские композиции из свежих цветов для любого повода. 
              Доставка по Москве в день заказа.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => onNavigate('catalog')}
                className="bg-primary text-primary-foreground px-8 py-3 font-body text-sm tracking-widest hover:bg-accent transition-colors"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => onNavigate('chat')}
                className="border border-foreground px-8 py-3 font-body text-sm tracking-widest hover:bg-foreground hover:text-primary-foreground transition-colors"
              >
                Написать нам
              </button>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
          <div className="w-px h-24 bg-foreground/20" />
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground rotate-90 whitespace-nowrap my-8">
            Scroll
          </span>
          <div className="w-px h-24 bg-foreground/20" />
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <div className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-2">Коллекция</div>
            <h2 className="font-display text-4xl md:text-5xl font-light">Популярные букеты</h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="hidden md:block font-body text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Весь каталог →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item, i) => (
            <div
              key={item.id}
              className="group cursor-pointer animate-fade-up opacity-0-init"
              style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="font-body text-[10px] tracking-widest uppercase bg-background px-2 py-1">
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-light">{item.name}</h3>
                  <p className="font-body text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
                <span className="font-body text-sm font-medium text-accent">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <button
            onClick={() => onNavigate('catalog')}
            className="font-body text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Весь каталог →
          </button>
        </div>
      </section>

      {/* About strip */}
      <section className="bg-primary text-primary-foreground py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">О нас</div>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-6">
              Больше 10 лет<br />
              <em className="italic">дарим радость</em>
            </h2>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed max-w-md">
              Мы — небольшая семейная мастерская с большой любовью к цветам. 
              Каждый букет создаётся вручную из свежих сезонных цветов.
            </p>
            <button
              onClick={() => onNavigate('about')}
              className="mt-8 border border-primary-foreground/30 text-primary-foreground px-6 py-2.5 font-body text-sm tracking-widest hover:border-primary-foreground transition-colors"
            >
              Узнать больше
            </button>
          </div>

          <div className="grid grid-cols-2 gap-px bg-primary-foreground/10">
            {[
              { num: '10+', label: 'лет на рынке' },
              { num: '5 000+', label: 'довольных клиентов' },
              { num: '200+', label: 'видов цветов' },
              { num: '2 часа', label: 'доставка по Москве' },
            ].map((stat) => (
              <div key={stat.label} className="bg-primary px-6 py-8 text-center">
                <div className="font-display text-3xl font-light text-accent mb-1">{stat.num}</div>
                <div className="font-body text-xs text-primary-foreground/60 tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
