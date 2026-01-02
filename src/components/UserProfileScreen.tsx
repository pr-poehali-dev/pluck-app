import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserProfileProps {
  onBack: () => void;
}

const USER_COLLECTIONS = [
  {
    id: '1',
    title: 'Прорывы в квантовых вычислениях',
    articlesCount: 15,
    likes: 234,
    tags: ['AI', 'Наука']
  },
  {
    id: '2',
    title: 'Будущее нейроинтерфейсов',
    articlesCount: 12,
    likes: 189,
    tags: ['Медицина', 'AI']
  }
];

const USER_ACTIVITY = [
  {
    id: '1',
    type: 'collection',
    title: 'Создала коллекцию "Прорывы в квантовых вычислениях"',
    date: '2 дня назад'
  },
  {
    id: '2',
    type: 'comment',
    title: 'Прокомментировала статью "SpaceX готовится к запуску"',
    date: '3 дня назад'
  },
  {
    id: '3',
    type: 'like',
    title: 'Понравилась коллекция "Путь к Марсу"',
    date: '5 дней назад'
  }
];

export default function UserProfileScreen({ onBack }: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('collections');

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
          <h1 className="flex-1 text-lg font-semibold text-text-primary">Профиль</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors">
            <Icon name="MoreVertical" size={20} />
          </button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <section className="text-center">
          <Avatar className="w-24 h-24 border-4 border-accent mx-auto mb-4">
            <AvatarFallback className="bg-accent text-accent-foreground text-3xl font-bold">
              АС
            </AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-bold text-text-primary mb-2">Анна Смирнова</h1>
          <p className="text-text-secondary mb-4">Изучаю квантовую физику и AI</p>

          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">1240</p>
              <p className="text-sm text-text-tertiary">Подписчиков</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">342</p>
              <p className="text-sm text-text-tertiary">Подписок</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">12</p>
              <p className="text-sm text-text-tertiary">Коллекций</p>
            </div>
          </div>

          <div className="flex gap-3 max-w-md mx-auto">
            <Button
              onClick={() => setIsFollowing(!isFollowing)}
              variant={isFollowing ? 'outline' : 'default'}
              className={`flex-1 ${isFollowing ? 'border-border' : 'bg-accent hover:bg-accent-hover'}`}
            >
              <Icon name={isFollowing ? 'UserCheck' : 'UserPlus'} size={16} className="mr-2" />
              {isFollowing ? 'Отписаться' : 'Подписаться'}
            </Button>
            <Button variant="outline" size="icon" className="border-border">
              <Icon name="MessageCircle" size={18} />
            </Button>
          </div>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-bg-secondary">
            <TabsTrigger value="collections" className="flex-1">
              <Icon name="BookMarked" size={16} className="mr-2" />
              Коллекции
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">
              <Icon name="Activity" size={16} className="mr-2" />
              Активность
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collections" className="mt-4 space-y-3">
            {USER_COLLECTIONS.map((collection) => (
              <Card
                key={collection.id}
                className="bg-bg-secondary border-border p-4 card-shine hover:border-border-hover transition-all cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {collection.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  {collection.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-bg-tertiary text-text-secondary border-0">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-text-tertiary">
                  <span className="flex items-center gap-1">
                    <Icon name="FileText" size={14} />
                    {collection.articlesCount} статей
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Heart" size={14} />
                    {collection.likes}
                  </span>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="activity" className="mt-4 space-y-3">
            {USER_ACTIVITY.map((activity) => (
              <Card key={activity.id} className="bg-bg-secondary border-border p-4">
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'collection' ? 'bg-accent/20' :
                    activity.type === 'comment' ? 'bg-blue-500/20' :
                    'bg-pink-500/20'
                  }`}>
                    <Icon
                      name={
                        activity.type === 'collection' ? 'BookMarked' :
                        activity.type === 'comment' ? 'MessageCircle' :
                        'Heart'
                      }
                      size={18}
                      className={
                        activity.type === 'collection' ? 'text-accent' :
                        activity.type === 'comment' ? 'text-blue-400' :
                        'text-pink-400'
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-primary mb-1">{activity.title}</p>
                    <p className="text-xs text-text-tertiary">{activity.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
