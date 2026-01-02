import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  initials: string;
  followers: number;
  collections: number;
  bio: string;
}

interface Collection {
  id: string;
  title: string;
  author: User;
  articlesCount: number;
  likes: number;
  description: string;
  tags: string[];
  isLiked: boolean;
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Анна Смирнова', initials: 'АС', followers: 1240, collections: 12, bio: 'Изучаю квантовую физику и AI' },
  { id: '2', name: 'Дмитрий Волков', initials: 'ДВ', followers: 890, collections: 8, bio: 'Космос, технологии, будущее' },
  { id: '3', name: 'Мария Петрова', initials: 'МП', followers: 2150, collections: 24, bio: 'Медицина и биотехнологии' }
];

const MOCK_COLLECTIONS: Collection[] = [
  {
    id: '1',
    title: 'Прорывы в квантовых вычислениях',
    author: MOCK_USERS[0],
    articlesCount: 15,
    likes: 234,
    description: 'Лучшие статьи о квантовых компьютерах и их применении',
    tags: ['AI', 'Наука'],
    isLiked: false
  },
  {
    id: '2',
    title: 'Путь к Марсу',
    author: MOCK_USERS[1],
    articlesCount: 22,
    likes: 567,
    description: 'Всё о миссиях SpaceX и будущем освоения космоса',
    tags: ['Космос', 'SpaceX'],
    isLiked: true
  },
  {
    id: '3',
    title: 'Нейротехнологии будущего',
    author: MOCK_USERS[2],
    articlesCount: 18,
    likes: 421,
    description: 'Интерфейсы мозг-компьютер и новые горизонты медицины',
    tags: ['Медицина', 'AI'],
    isLiked: false
  }
];

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'collections' | 'users'>('collections');
  const [collections, setCollections] = useState(MOCK_COLLECTIONS);

  const toggleLike = (id: string) => {
    setCollections(prev => prev.map(col => 
      col.id === id ? { ...col, isLiked: !col.isLiked, likes: col.isLiked ? col.likes - 1 : col.likes + 1 } : col
    ));
  };

  return (
    <div className="animate-fade-in">
      <header className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-text-primary">Сообщество</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors">
            <Icon name="Search" size={20} />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('collections')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'collections'
                ? 'bg-accent text-accent-foreground'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
            }`}
          >
            <Icon name="BookMarked" size={16} className="inline mr-2" />
            Коллекции
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'users'
                ? 'bg-accent text-accent-foreground'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
            }`}
          >
            <Icon name="Users" size={16} className="inline mr-2" />
            Читатели
          </button>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {activeTab === 'collections' && (
          <>
            {collections.map((collection, index) => (
              <Card
                key={collection.id}
                className="bg-bg-secondary border-border p-5 card-shine hover:border-border-hover transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="w-10 h-10 border border-border">
                      <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                        {collection.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{collection.author.name}</p>
                      <p className="text-xs text-text-tertiary">{collection.author.followers} подписчиков</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-border hover:bg-bg-tertiary">
                    <Icon name="UserPlus" size={14} className="mr-1" />
                    Подписаться
                  </Button>
                </div>

                <h2 className="text-xl font-bold text-text-primary mb-2">
                  {collection.title}
                </h2>
                
                <p className="text-text-secondary text-sm mb-4">
                  {collection.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  {collection.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-bg-tertiary text-text-secondary border-0">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-text-tertiary">
                    <span className="flex items-center gap-1">
                      <Icon name="FileText" size={16} />
                      {collection.articlesCount} статей
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Heart" size={16} />
                      {collection.likes}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleLike(collection.id)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                        collection.isLiked 
                          ? 'bg-accent/20 text-accent' 
                          : 'hover:bg-bg-tertiary text-text-tertiary'
                      }`}
                    >
                      <Icon name={collection.isLiked ? "Heart" : "Heart"} size={18} fill={collection.isLiked ? "currentColor" : "none"} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-tertiary text-text-tertiary transition-colors">
                      <Icon name="Share2" size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}

        {activeTab === 'users' && (
          <>
            {MOCK_USERS.map((user, index) => (
              <Card
                key={user.id}
                className="bg-bg-secondary border-border p-5 card-shine hover:border-border-hover transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="w-14 h-14 border-2 border-accent">
                      <AvatarFallback className="bg-accent text-accent-foreground font-bold">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-primary mb-1">{user.name}</h3>
                      <p className="text-sm text-text-secondary mb-2">{user.bio}</p>
                      <div className="flex items-center gap-4 text-xs text-text-tertiary">
                        <span className="flex items-center gap-1">
                          <Icon name="Users" size={14} />
                          {user.followers} подписчиков
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="BookMarked" size={14} />
                          {user.collections} коллекций
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-border hover:bg-bg-tertiary">
                    <Icon name="UserPlus" size={14} className="mr-1" />
                    Подписаться
                  </Button>
                </div>
              </Card>
            ))}
          </>
        )}
      </main>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-accent hover:bg-accent-hover rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
        <Icon name="Plus" size={20} className="text-accent-foreground" />
      </button>
    </div>
  );
}
