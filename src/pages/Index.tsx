import { useState } from 'react';
import FeedScreen from '@/components/FeedScreen';
import ReaderScreen from '@/components/ReaderScreen';
import LibraryScreen from '@/components/LibraryScreen';
import ProfileScreen from '@/components/ProfileScreen';
import BottomNav from '@/components/BottomNav';

type Screen = 'feed' | 'reader' | 'library' | 'profile';

export interface Article {
  id: string;
  title: string;
  source: string;
  description: string;
  tags: string[];
  readTime: number;
  saved: boolean;
  content: string;
  author: string;
  date: string;
}

export default function Index() {
  const [activeScreen, setActiveScreen] = useState<Screen>('feed');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setActiveScreen('reader');
  };

  const handleBackToFeed = () => {
    setActiveScreen('feed');
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <div className="max-w-2xl mx-auto">
        {activeScreen === 'feed' && (
          <FeedScreen onArticleClick={handleArticleClick} />
        )}
        {activeScreen === 'reader' && selectedArticle && (
          <ReaderScreen article={selectedArticle} onBack={handleBackToFeed} />
        )}
        {activeScreen === 'library' && <LibraryScreen onArticleClick={handleArticleClick} />}
        {activeScreen === 'profile' && <ProfileScreen />}
      </div>
      
      <BottomNav activeScreen={activeScreen} onScreenChange={setActiveScreen} />
    </div>
  );
}
