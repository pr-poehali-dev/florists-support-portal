import { useState } from 'react';
import Icon from '@/components/ui/icon';

const faqs = [
  {
    q: 'Как быстро вы доставляете цветы?',
    a: 'Доставка по Москве занимает от 2 до 4 часов. При срочном заказе (доплата) — в течение 60 минут. Время доставки указывается при оформлении заказа.',
  },
  {
    q: 'Можно ли заказать букет по фотографии или описанию?',
    a: 'Конечно! Напишите нам в чат или по WhatsApp фото-вдохновение или опишите желаемый букет. Наш флорист предложит похожий вариант и согласует всё перед сборкой.',
  },
  {
    q: 'Какие способы оплаты вы принимаете?',
    a: 'Мы принимаем оплату картой онлайн, наличными при получении, переводом на карту, а также через Apple Pay и Google Pay.',
  },
  {
    q: 'Как долго простоят цветы?',
    a: 'При правильном уходе (свежая вода, прохладное место без прямого солнца) большинство букетов простоят 7–10 дней. К каждому заказу прилагается инструкция по уходу.',
  },
  {
    q: 'Работаете ли вы в праздники?',
    a: 'Да, мы работаем ежедневно, включая праздничные дни. В 8 марта, 14 февраля и другие пиковые праздники рекомендуем заказывать заранее — за 2–3 дня.',
  },
  {
    q: 'Можно ли оформить подписку на цветы?',
    a: 'Да! Мы предлагаем еженедельную или ежемесячную подписку на букеты со скидкой 15%. Напишите нам для оформления.',
  },
  {
    q: 'Делаете ли вы оформление мероприятий?',
    a: 'Да, мы занимаемся флористическим оформлением свадеб, корпоративов и других мероприятий. Для расчёта стоимости свяжитесь с нами заранее — минимум за 2 недели.',
  },
  {
    q: 'Как вернуть или обменять цветы?',
    a: 'Если букет не соответствует описанию или повреждён при доставке — мы заменим его бесплатно. Фото проблемы направьте в течение 2 часов после получения.',
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-6">
      <div className="mb-16 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
        <div className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-2">Помощь</div>
        <h1 className="font-display text-5xl md:text-6xl font-light">Частые вопросы</h1>
      </div>

      <div className="flex flex-col gap-0 border-t border-border">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-border">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start justify-between gap-4 py-6 text-left group"
            >
              <span className="font-display text-lg md:text-xl font-light group-hover:text-accent transition-colors leading-snug">
                {faq.q}
              </span>
              <Icon
                name={open === i ? 'Minus' : 'Plus'}
                size={18}
                className="text-muted-foreground shrink-0 mt-1 transition-colors group-hover:text-accent"
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                open === i ? 'max-h-64 pb-6' : 'max-h-0'
              }`}
            >
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-secondary p-8 text-center">
        <h3 className="font-display text-2xl font-light mb-2">Не нашли ответ?</h3>
        <p className="font-body text-sm text-muted-foreground mb-6">Напишите нам — ответим в течение 15 минут</p>
        <button className="bg-primary text-primary-foreground px-8 py-3 font-body text-sm tracking-widest hover:bg-accent transition-colors">
          Написать в чат
        </button>
      </div>
    </div>
  );
}
