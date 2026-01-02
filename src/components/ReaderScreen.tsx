import { useState } from 'react';
import { Article } from '@/pages/Index';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface ReaderScreenProps {
  article: Article;
  onBack: () => void;
}

export default function ReaderScreen({ article, onBack }: ReaderScreenProps) {
  const [viewMode, setViewMode] = useState<'short' | 'full'>('full');
  const [fontSize, setFontSize] = useState(16);
  const [showSettings, setShowSettings] = useState(false);

  const shortContent = `${article.description}\n\nОсновные тезисы:\n\n• Квантовые технологии совершают прорыв в вычислениях\n• Google представил новый процессор с рекордной производительностью\n• Эксперты прогнозируют революцию в обработке данных\n\nПолная версия статьи содержит детальный технический анализ и комментарии экспертов.`;

  const fullContent = `${article.description}\n\nКвантовые компьютеры представляют собой революционный подход к обработке информации. В отличие от классических компьютеров, которые используют биты со значениями 0 или 1, квантовые компьютеры используют кубиты, которые могут находиться в суперпозиции обоих состояний одновременно.\n\nНедавний прорыв Google в области квантовых вычислений демонстрирует потенциал этой технологии. Их новый процессор способен решать задачи, которые заняли бы у обычного суперкомпьютера тысячи лет, всего за несколько минут.\n\nЭксперты отмечают, что квантовые компьютеры могут произвести революцию в таких областях, как:\n\n• Криптография и кибербезопасность\n• Разработка новых лекарств и материалов\n• Моделирование сложных систем\n• Оптимизация логистических процессов\n• Искусственный интеллект и машинное обучение\n\nОднако технология всё ещё находится на ранней стадии развития. Квантовые компьютеры требуют экстремальных условий для работы, включая температуры близкие к абсолютному нулю.`;

  return (
    <div className="animate-fade-in min-h-screen">
      <header className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
          <h2 className="flex-1 mx-4 text-sm font-medium text-text-secondary truncate">
            {article.source}
          </h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors"
          >
            <Icon name="Settings" size={20} />
          </button>
        </div>
      </header>

      {showSettings && (
        <div className="bg-bg-secondary border-b border-border p-4 animate-fade-in">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-text-secondary mb-2 block">Размер текста</label>
              <div className="flex items-center gap-3">
                <Icon name="Type" size={16} className="text-text-tertiary" />
                <Slider
                  value={[fontSize]}
                  onValueChange={(val) => setFontSize(val[0])}
                  min={14}
                  max={24}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-text-secondary w-8">{fontSize}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-4 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <p className="text-sm text-text-secondary">{article.author}</p>
            <p className="text-xs text-text-tertiary">{article.date}</p>
          </div>
          <div className="flex gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-bg-secondary rounded-full text-xs text-text-secondary">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setViewMode('short')}
            variant={viewMode === 'short' ? 'default' : 'outline'}
            className={viewMode === 'short' ? 'bg-accent hover:bg-accent-hover' : 'border-border'}
            size="sm"
          >
            <Icon name="Zap" size={14} className="mr-1" />
            Кратко
          </Button>
          <Button
            onClick={() => setViewMode('full')}
            variant={viewMode === 'full' ? 'default' : 'outline'}
            className={viewMode === 'full' ? 'bg-accent hover:bg-accent-hover' : 'border-border'}
            size="sm"
          >
            <Icon name="FileText" size={14} className="mr-1" />
            Полностью
          </Button>
        </div>

        <article
          className="prose prose-invert max-w-none"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
        >
          <div className="text-text-primary whitespace-pre-line">
            {viewMode === 'short' ? shortContent : fullContent}
          </div>
        </article>
      </main>

      <footer className="fixed bottom-20 left-0 right-0 bg-bg-secondary/95 backdrop-blur-sm border-t border-border p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors">
              <Icon name="Volume2" size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors">
              <Icon name="Share2" size={18} />
            </button>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-1 bg-bg-tertiary rounded-full overflow-hidden">
              <div className="h-full bg-accent w-1/3 rounded-full"></div>
            </div>
          </div>
          <span className="text-xs text-text-tertiary">33%</span>
        </div>
      </footer>
    </div>
  );
}
