import { useState } from 'react';
import { Article } from '@/pages/Index';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FeedScreenProps {
  onArticleClick: (article: Article) => void;
}

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Квантовые компьютеры: прорыв Google в обработке данных',
    source: 'TechNews',
    description: 'Новый квантовый процессор от Google показал результаты, которые обычный компьютер просчитывал бы тысячи лет.',
    tags: ['AI', 'Технологии'],
    readTime: 5,
    saved: false,
    content: 'Полный текст статьи о квантовых компьютерах...',
    author: 'Иван Петров',
    date: '2 января 2026'
  },
  {
    id: '2',
    title: 'SpaceX готовится к запуску миссии на Марс',
    source: 'SpaceDaily',
    description: 'Илон Маск объявил о новой дате запуска ракеты Starship, которая доставит первый груз на Красную планету.',
    tags: ['Космос', 'Наука'],
    readTime: 7,
    saved: true,
    content: 'Полный текст статьи о миссии на Марс...',
    author: 'Мария Сидорова',
    date: '1 января 2026'
  },
  {
    id: '3',
    title: 'Новая эра нейроинтерфейсов: Neuralink провел первые тесты',
    source: 'MedTech',
    description: 'Первый пациент с имплантом Neuralink смог управлять компьютером силой мысли.',
    tags: ['Медицина', 'AI'],
    readTime: 6,
    saved: false,
    content: 'Полный текст статьи о нейроинтерфейсах...',
    author: 'Алексей Смирнов',
    date: '31 декабря 2025'
  }
];

const CATEGORIES = ['Для вас', 'Технологии', 'Наука', 'Сохранено'];

export default function FeedScreen({ onArticleClick }: FeedScreenProps) {
  const [activeCategory, setActiveCategory] = useState('Для вас');
  const [articles, setArticles] = useState(MOCK_ARTICLES);

  const toggleSave = (id: string) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, saved: !article.saved } : article
    ));
  };

  const skipArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  return (
    <div className="animate-fade-in">
      <header className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gradient">Pluck</h1>
          <div className="flex gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors">
              <Icon name="Search" size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors relative">
              <Icon name="Bell" size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="p-4 space-y-4">
        {articles.map((article, index) => (
          <article
            key={article.id}
            className="bg-bg-secondary rounded-lg p-5 border border-border card-shine hover:border-border-hover transition-all cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div onClick={() => onArticleClick(article)}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-accent">{article.source}</span>
                <span className="text-text-tertiary text-xs">•</span>
                <span className="text-text-tertiary text-xs">{article.readTime} мин чтения</span>
              </div>

              <h2 className="text-xl font-semibold text-text-primary mb-2 line-clamp-2">
                {article.title}
              </h2>

              <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                {article.description}
              </p>

              <div className="flex gap-2 mb-4">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-bg-tertiary text-text-secondary border-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave(article.id);
                }}
                variant={article.saved ? "default" : "outline"}
                className={`flex-1 ${article.saved ? 'bg-accent hover:bg-accent-hover' : 'border-border hover:bg-bg-tertiary'}`}
              >
                <Icon name={article.saved ? "BookmarkCheck" : "Bookmark"} size={16} className="mr-2" />
                {article.saved ? 'Сохранено' : 'Сохранить'}
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  skipArticle(article.id);
                }}
                variant="outline"
                className="border-border hover:bg-bg-tertiary"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </article>
        ))}
      </main>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-accent hover:bg-accent-hover rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
        <Icon name="RefreshCw" size={20} className="text-accent-foreground" />
      </button>
    </div>
  );
}
