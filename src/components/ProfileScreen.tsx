import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const STATS = [
  { label: 'Прочитано', value: '24', icon: 'BookCheck' },
  { label: 'Текущая серия', value: '7 дней', icon: 'Flame' },
  { label: 'Цель', value: '30 мин', icon: 'Target' },
  { label: 'Активность', value: '89%', icon: 'TrendingUp' }
];

const ACTIVITY_DATA = [12, 18, 15, 24, 20, 28, 25, 30, 22, 26, 19, 24, 28, 25, 30];

const MENU_ITEMS = [
  { label: 'Цели чтения', icon: 'Target', path: '/goals' },
  { label: 'Настройки', icon: 'Settings', path: '/settings' },
  { label: 'Безопасность', icon: 'Shield', path: '/security' },
  { label: 'Помощь', icon: 'HelpCircle', path: '/help' }
];

export default function ProfileScreen() {
  return (
    <div className="animate-fade-in pb-8">
      <header className="bg-gradient-to-b from-bg-secondary to-bg-primary px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20 border-2 border-accent">
            <AvatarFallback className="bg-accent text-accent-foreground text-2xl font-bold">
              ИП
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Иван Петров</h1>
            <p className="text-text-secondary text-sm">Читатель</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {STATS.map(stat => (
            <Card key={stat.label} className="bg-bg-tertiary border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon name={stat.icon as any} size={18} className="text-accent" />
                <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
              </div>
              <p className="text-xs text-text-secondary">{stat.label}</p>
            </Card>
          ))}
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Активность за месяц</h2>
            <button className="text-sm text-accent hover:text-accent-hover">
              Детали
            </button>
          </div>
          
          <Card className="bg-bg-secondary border-border p-4">
            <div className="flex items-end justify-between h-32 gap-1">
              {ACTIVITY_DATA.map((value, index) => (
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-accent to-accent-hover rounded-t opacity-70 hover:opacity-100 transition-opacity"
                  style={{ height: `${(value / 30) * 100}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-text-tertiary">
              <span>15 дней назад</span>
              <span>Сегодня</span>
            </div>
          </Card>
        </section>

        <section>
          <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1">Pluck Premium</h3>
                <p className="text-sm text-text-secondary">Расширьте возможности чтения</p>
              </div>
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-accent-foreground" />
              </div>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} className="text-accent" />
                Без рекламы
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} className="text-accent" />
                Офлайн-режим
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Icon name="Check" size={16} className="text-accent" />
                Расширенные теги
              </li>
            </ul>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-text-primary">150 ₽</span>
              <span className="text-text-secondary text-sm">/месяц</span>
              <span className="text-text-tertiary text-xs line-through ml-auto">1200 ₽/год</span>
            </div>

            <Button className="w-full bg-accent hover:bg-accent-hover text-accent-foreground font-semibold">
              Попробовать Premium
            </Button>
          </Card>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary mb-3">Настройки</h2>
          <div className="space-y-2">
            {MENU_ITEMS.map(item => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between p-4 bg-bg-secondary rounded-lg border border-border hover:border-border-hover transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon name={item.icon as any} size={20} className="text-text-secondary" />
                  <span className="text-text-primary font-medium">{item.label}</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-text-tertiary" />
              </button>
            ))}
          </div>
        </section>

        <Button
          variant="outline"
          className="w-full border-error text-error hover:bg-error/10"
        >
          <Icon name="LogOut" size={18} className="mr-2" />
          Выйти
        </Button>
      </main>
    </div>
  );
}
