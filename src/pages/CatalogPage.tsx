import { useState } from 'react';
import Icon from '@/components/ui/icon';

const categories = ['Все', 'Букеты', 'Розы', 'Пионы', 'Тюльпаны', 'Экзотика', 'Композиции'];

const products = [
  { id: 1, name: 'Романтика', cat: 'Пионы', desc: 'Пионы, розы, эвкалипт', price: 4200, img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/c7c18e6c-9aa3-4a73-a89a-b765ba619928.jpg', tag: 'Хит' },
  { id: 2, name: 'Весенний бриз', cat: 'Тюльпаны', desc: 'Анемоны, тюльпаны, зелень', price: 3100, img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/bd137c8a-32b9-4f88-aa0d-d2dc1df5817d.jpg', tag: 'Новинка' },
  { id: 3, name: 'Флора Luxe', cat: 'Композиции', desc: 'Сезонная авторская композиция', price: 5800, img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/79e08213-09b9-466c-b69a-3ba54924429a.jpg', tag: 'Эксклюзив' },
  { id: 4, name: 'Нежность', cat: 'Розы', desc: 'Белые и кремовые розы', price: 2900, img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/c7c18e6c-9aa3-4a73-a89a-b765ba619928.jpg', tag: '' },
  { id: 5, name: 'Полевые грёзы', cat: 'Букеты', desc: 'Полевые цветы, ромашки, васильки', price: 1900, img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/bd137c8a-32b9-4f88-aa0d-d2dc1df5817d.jpg', tag: '' },
  { id: 6, name: 'Тропик', cat: 'Экзотика', desc: 'Антуриум, стрелиция, протея', price: 6500, img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/79e08213-09b9-466c-b69a-3ba54924429a.jpg', tag: 'Редкость' },
  { id: 7, name: 'Алые паруса', cat: 'Розы', desc: 'Красные розы, гипсофила', price: 3500, img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/c7c18e6c-9aa3-4a73-a89a-b765ba619928.jpg', tag: '' },
  { id: 8, name: 'Утро в Провансе', cat: 'Пионы', desc: 'Пионы, лаванда, вербена', price: 4800, img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/bd137c8a-32b9-4f88-aa0d-d2dc1df5817d.jpg', tag: 'Хит' },
  { id: 9, name: 'Летний день', cat: 'Букеты', desc: 'Герберы, подсолнухи, зелень', price: 2200, img: 'https://cdn.poehali.dev/projects/9c54ee03-e805-4f84-ba78-3ecdd0b604df/files/79e08213-09b9-466c-b69a-3ba54924429a.jpg', tag: '' },
];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [sort, setSort] = useState<'default' | 'asc' | 'desc'>('default');

  const filtered = products
    .filter((p) => activeCategory === 'Все' || p.cat === activeCategory)
    .sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      if (sort === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="pt-28 pb-20 max-w-6xl mx-auto px-6">
      <div className="mb-12 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
        <div className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-2">Каталог</div>
        <h1 className="font-display text-5xl md:text-6xl font-light">Все букеты</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-y border-border py-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-xs tracking-widest px-4 py-1.5 border transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="font-body text-xs tracking-wider bg-transparent border-0 text-muted-foreground focus:outline-none cursor-pointer"
          >
            <option value="default">По умолчанию</option>
            <option value="asc">Сначала дешевле</option>
            <option value="desc">Сначала дороже</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className="group cursor-pointer animate-fade-up"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'forwards', opacity: 0 }}
          >
            <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {item.tag && (
                <div className="absolute top-3 left-3">
                  <span className="font-body text-[10px] tracking-widest uppercase bg-background px-2 py-1">
                    {item.tag}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button className="w-full font-body text-xs tracking-widest text-center">
                  Заказать букет
                </button>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl font-light">{item.name}</h3>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <span className="font-body text-sm font-medium text-accent whitespace-nowrap ml-2">
                {item.price.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-body text-muted-foreground">В этой категории пока нет букетов</p>
        </div>
      )}
    </div>
  );
}
