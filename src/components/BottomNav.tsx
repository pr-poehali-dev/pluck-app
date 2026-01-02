import Icon from '@/components/ui/icon';

type Screen = 'feed' | 'reader' | 'library' | 'community' | 'profile';

interface BottomNavProps {
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

const NAV_ITEMS = [
  { screen: 'feed' as Screen, icon: 'Home', label: 'Лента' },
  { screen: 'library' as Screen, icon: 'BookMarked', label: 'Библиотека' },
  { screen: 'community' as Screen, icon: 'Users', label: 'Сообщество' },
  { screen: 'profile' as Screen, icon: 'User', label: 'Профиль' }
];

export default function BottomNav({ activeScreen, onScreenChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-secondary/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-2xl mx-auto flex items-center justify-around px-4 py-3">
        {NAV_ITEMS.map(item => {
          const isActive = activeScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => onScreenChange(item.screen)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                isActive 
                  ? 'bg-accent/10' 
                  : 'hover:bg-bg-tertiary'
              }`}
            >
              <Icon
                name={item.icon as any}
                size={22}
                className={isActive ? 'text-accent' : 'text-text-tertiary'}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-accent' : 'text-text-tertiary'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}