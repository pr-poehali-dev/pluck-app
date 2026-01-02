export type AppRoute = 
  | '/'
  | '/feed'
  | '/reader/:articleId'
  | '/library'
  | '/library/add/book'
  | '/library/add/article'
  | '/community'
  | '/community/collection/:collectionId'
  | '/community/user/:userId'
  | '/profile'
  | '/goals'
  | '/settings'
  | '/settings/app'
  | '/settings/sources'
  | '/security'
  | '/help'
  | '/login'
  | '/register'
  | '/reset-password'
  | '/subscribe';

export interface RouteDefinition {
  path: AppRoute;
  description: string;
  params?: string[];
  queryParams?: string[];
}

export const APP_ROUTES: RouteDefinition[] = [
  {
    path: '/',
    description: 'Главная страница (лента)'
  },
  {
    path: '/feed',
    description: 'Лента статей с категориями'
  },
  {
    path: '/reader/:articleId',
    description: 'Читалка статьи',
    params: ['articleId']
  },
  {
    path: '/library',
    description: 'Библиотека сохраненных материалов'
  },
  {
    path: '/library/add/book',
    description: 'Добавление книги в библиотеку',
    queryParams: ['file', 'tags']
  },
  {
    path: '/library/add/article',
    description: 'Добавление статьи по ссылке',
    queryParams: ['url', 'tags']
  },
  {
    path: '/community',
    description: 'Сообщество: коллекции и пользователи'
  },
  {
    path: '/community/collection/:collectionId',
    description: 'Детали коллекции с комментариями',
    params: ['collectionId']
  },
  {
    path: '/community/user/:userId',
    description: 'Профиль пользователя',
    params: ['userId']
  },
  {
    path: '/profile',
    description: 'Личный профиль'
  },
  {
    path: '/goals',
    description: 'Установка и отслеживание целей чтения'
  },
  {
    path: '/settings',
    description: 'Главная страница настроек'
  },
  {
    path: '/settings/app',
    description: 'Настройки приложения (шрифт, тема, уведомления)'
  },
  {
    path: '/settings/sources',
    description: 'Управление источниками RSS',
    queryParams: ['category', 'custom_url']
  },
  {
    path: '/security',
    description: 'Безопасность (email, телефон, пароль)'
  },
  {
    path: '/help',
    description: 'FAQ и поддержка'
  },
  {
    path: '/login',
    description: 'Авторизация'
  },
  {
    path: '/register',
    description: 'Регистрация нового пользователя'
  },
  {
    path: '/reset-password',
    description: 'Восстановление пароля'
  },
  {
    path: '/subscribe',
    description: 'Покупка Premium подписки'
  }
];

export const getRouteDescription = (path: AppRoute): string => {
  const route = APP_ROUTES.find(r => r.path === path);
  return route?.description || 'Неизвестный маршрут';
};

export const getRouteWithParams = (path: string, params: Record<string, string>): string => {
  let result = path;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, value);
  });
  return result;
};
