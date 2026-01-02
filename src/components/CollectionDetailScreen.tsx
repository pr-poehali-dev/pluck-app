import { useState } from 'react';
import { Article } from '@/pages/Index';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface Comment {
  id: string;
  author: {
    name: string;
    initials: string;
  };
  text: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface CollectionDetailProps {
  onBack: () => void;
  onArticleClick: (article: Article) => void;
}

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Квантовые компьютеры: прорыв Google',
    source: 'TechNews',
    description: 'Новый процессор от Google показал рекордные результаты.',
    tags: ['AI', 'Технологии'],
    readTime: 5,
    saved: false,
    content: 'Полный текст...',
    author: 'Иван Петров',
    date: '2 января 2026'
  },
  {
    id: '2',
    title: 'IBM представила квантовый процессор на 1000 кубит',
    source: 'ScienceDaily',
    description: 'Новая веха в развитии квантовых технологий.',
    tags: ['Наука', 'AI'],
    readTime: 6,
    saved: true,
    content: 'Полный текст...',
    author: 'Мария Сидорова',
    date: '1 января 2026'
  }
];

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    author: { name: 'Дмитрий Волков', initials: 'ДВ' },
    text: 'Отличная подборка! Особенно статья про IBM — очень детальный разбор.',
    date: '2 часа назад',
    likes: 12,
    isLiked: false
  },
  {
    id: '2',
    author: { name: 'Елена Иванова', initials: 'ЕИ' },
    text: 'Спасибо за коллекцию, давно искала материалы по этой теме.',
    date: '5 часов назад',
    likes: 8,
    isLiked: true
  }
];

export default function CollectionDetailScreen({ onBack, onArticleClick }: CollectionDetailProps) {
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const toggleCommentLike = (id: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === id 
        ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 } 
        : comment
    ));
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: { name: 'Вы', initials: 'ИП' },
      text: newComment,
      date: 'Только что',
      likes: 0,
      isLiked: false
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="animate-fade-in min-h-screen">
      <header className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
          <h1 className="flex-1 text-lg font-semibold text-text-primary">Коллекция</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors">
            <Icon name="Share2" size={20} />
          </button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12 border border-border">
              <AvatarFallback className="bg-accent text-accent-foreground">
                АС
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-semibold text-text-primary">Анна Смирнова</h2>
              <p className="text-sm text-text-tertiary">1240 подписчиков</p>
            </div>
            <Button variant="default" size="sm" className="bg-accent hover:bg-accent-hover">
              <Icon name="UserPlus" size={14} className="mr-1" />
              Подписаться
            </Button>
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-3">
            Прорывы в квантовых вычислениях
          </h1>
          
          <p className="text-text-secondary mb-4">
            Лучшие статьи о квантовых компьютерах и их применении в современном мире
          </p>

          <div className="flex items-center gap-4 text-sm text-text-tertiary mb-4">
            <span className="flex items-center gap-1">
              <Icon name="FileText" size={16} />
              {MOCK_ARTICLES.length} статей
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Heart" size={16} />
              234 лайка
            </span>
            <span className="flex items-center gap-1">
              <Icon name="MessageCircle" size={16} />
              {comments.length} комментариев
            </span>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-bg-tertiary text-text-secondary border-0">
              AI
            </Badge>
            <Badge variant="secondary" className="bg-bg-tertiary text-text-secondary border-0">
              Наука
            </Badge>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Статьи в коллекции</h3>
          <div className="space-y-3">
            {MOCK_ARTICLES.map((article) => (
              <Card
                key={article.id}
                onClick={() => onArticleClick(article)}
                className="bg-bg-secondary border-border p-4 card-shine hover:border-border-hover transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-accent">{article.source}</span>
                  <span className="text-text-tertiary text-xs">•</span>
                  <span className="text-text-tertiary text-xs">{article.readTime} мин</span>
                </div>
                
                <h4 className="text-base font-semibold text-text-primary mb-2 line-clamp-2">
                  {article.title}
                </h4>
                
                <p className="text-text-secondary text-sm line-clamp-2">
                  {article.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Комментарии ({comments.length})
            </h3>
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-sm text-accent hover:text-accent-hover"
            >
              {showComments ? 'Скрыть' : 'Показать'}
            </button>
          </div>

          {showComments && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                    ИП
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Написать комментарий..."
                    className="bg-bg-secondary border-border text-text-primary resize-none"
                    rows={3}
                  />
                  <Button
                    onClick={addComment}
                    disabled={!newComment.trim()}
                    className="bg-accent hover:bg-accent-hover"
                    size="sm"
                  >
                    Отправить
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="bg-bg-secondary border-border p-4">
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10 border border-border">
                        <AvatarFallback className="bg-bg-tertiary text-text-secondary text-sm">
                          {comment.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-semibold text-text-primary">
                              {comment.author.name}
                            </p>
                            <p className="text-xs text-text-tertiary">{comment.date}</p>
                          </div>
                          <button
                            onClick={() => toggleCommentLike(comment.id)}
                            className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-bg-tertiary transition-colors"
                          >
                            <Icon
                              name="Heart"
                              size={14}
                              className={comment.isLiked ? 'text-accent' : 'text-text-tertiary'}
                              fill={comment.isLiked ? 'currentColor' : 'none'}
                            />
                            <span className="text-xs text-text-tertiary">{comment.likes}</span>
                          </button>
                        </div>
                        <p className="text-sm text-text-secondary">{comment.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
