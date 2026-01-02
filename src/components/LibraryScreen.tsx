import { useState } from 'react';
import { Article } from '@/pages/Index';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LibraryScreenProps {
  onArticleClick: (article: Article) => void;
}

const SAVED_ARTICLES: Article[] = [
  {
    id: '2',
    title: 'SpaceX готовится к запуску миссии на Марс',
    source: 'SpaceDaily',
    description: 'Илон Маск объявил о новой дате запуска ракеты Starship.',
    tags: ['Космос', 'Наука'],
    readTime: 7,
    saved: true,
    content: 'Полный текст...',
    author: 'Мария Сидорова',
    date: '1 января 2026'
  },
  {
    id: '4',
    title: 'Революция в батареях: твердотельные элементы увеличат запас хода электромобилей',
    source: 'GreenTech',
    description: 'Новая технология батарей обещает увеличить автономность в 2 раза.',
    tags: ['Технологии', 'Экология'],
    readTime: 5,
    saved: true,
    content: 'Полный текст...',
    author: 'Дмитрий Волков',
    date: '30 декабря 2025'
  }
];

const FILTERS = ['Все', 'Сохранено', 'История', 'Загрузки'];

export default function LibraryScreen({ onArticleClick }: LibraryScreenProps) {
  const [activeFilter, setActiveFilter] = useState('Сохранено');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  return (
    <div className="animate-fade-in">
      <header className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-text-primary">Библиотека</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors"
            >
              <Icon name={viewMode === 'grid' ? 'List' : 'LayoutGrid'} size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-accent hover:bg-accent-hover transition-colors">
              <Icon name="Plus" size={20} className="text-accent-foreground" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <main className="p-4">
        {SAVED_ARTICLES.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mb-4">
              <Icon name="BookMarked" size={32} className="text-text-tertiary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Библиотека пуста</h3>
            <p className="text-text-secondary text-sm">
              Сохраняйте статьи из ленты, чтобы читать их позже
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
            {SAVED_ARTICLES.map((article, index) => (
              <article
                key={article.id}
                onClick={() => onArticleClick(article)}
                className={`bg-bg-secondary rounded-lg border border-border card-shine hover:border-border-hover transition-all cursor-pointer animate-fade-in-up ${
                  viewMode === 'list' ? 'p-5' : 'p-4'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {viewMode === 'grid' && (
                  <div className="aspect-video bg-bg-tertiary rounded-lg mb-3 flex items-center justify-center">
                    <Icon name="FileText" size={32} className="text-text-tertiary" />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-accent">{article.source}</span>
                  {viewMode === 'list' && (
                    <>
                      <span className="text-text-tertiary text-xs">•</span>
                      <span className="text-text-tertiary text-xs">{article.readTime} мин</span>
                    </>
                  )}
                </div>

                <h2 className={`font-semibold text-text-primary mb-2 ${viewMode === 'grid' ? 'text-sm line-clamp-2' : 'text-lg line-clamp-2'}`}>
                  {article.title}
                </h2>

                {viewMode === 'list' && (
                  <>
                    <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex gap-2">
                      {article.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-bg-tertiary text-text-secondary border-0 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </main>

      <div className="fixed bottom-24 right-6 flex flex-col gap-3">
        <button className="w-14 h-14 bg-accent hover:bg-accent-hover rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
          <Icon name="BookOpen" size={20} className="text-accent-foreground" />
        </button>
      </div>
    </div>
  );
}
