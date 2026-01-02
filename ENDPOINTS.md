# Pluck API Endpoints

Полная документация всех API endpoints приложения Pluck.

## 🔐 Аутентификация

### POST `/api/auth/login`
Вход в систему
- **Body**: `{ email: string, password: string }`
- **Response**: `{ success: boolean, token: string, user: User }`

### POST `/api/auth/register`
Регистрация нового пользователя
- **Body**: `{ email: string, password: string, name: string }`
- **Response**: `{ success: boolean, token: string, user: User }`

### POST `/api/auth/logout`
Выход из системы
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean }`

### POST `/api/auth/reset-password`
Восстановление пароля
- **Body**: `{ email: string }`
- **Response**: `{ success: boolean, message: string }`

### POST `/api/auth/verify-email`
Подтверждение email
- **Body**: `{ token: string }`
- **Response**: `{ success: boolean }`

---

## 👤 Пользователи

### GET `/api/users/:userId`
Получить профиль пользователя
- **Params**: `userId` - ID пользователя
- **Response**: `User`

### PUT `/api/users/:userId`
Обновить профиль
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name?: string, bio?: string, avatar?: string }`
- **Response**: `User`

### POST `/api/users/:userId/follow`
Подписаться на пользователя
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean, followers: number }`

### DELETE `/api/users/:userId/unfollow`
Отписаться от пользователя
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean, followers: number }`

### GET `/api/users/:userId/followers`
Список подписчиков
- **Query**: `page?: number, limit?: number`
- **Response**: `PaginatedResponse<User>`

### GET `/api/users/:userId/following`
Список подписок
- **Query**: `page?: number, limit?: number`
- **Response**: `PaginatedResponse<User>`

---

## 📰 Статьи

### GET `/api/articles/feed`
Получить ленту статей
- **Query**: `category?: string, page?: number, limit?: number`
- **Response**: `PaginatedResponse<Article>`

### GET `/api/articles/:articleId`
Получить статью по ID
- **Params**: `articleId` - ID статьи
- **Response**: `Article`

### POST `/api/articles/:articleId/save`
Сохранить статью
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean }`

### DELETE `/api/articles/:articleId/unsave`
Удалить из сохраненных
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean }`

### GET `/api/articles/saved`
Список сохраненных статей
- **Headers**: `Authorization: Bearer <token>`
- **Query**: `page?: number, limit?: number`
- **Response**: `PaginatedResponse<Article>`

### POST `/api/articles/:articleId/track`
Отслеживание прогресса чтения
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ progress: number, duration: number }`
- **Response**: `{ success: boolean }`

---

## 📚 Коллекции

### GET `/api/collections`
Список всех коллекций
- **Query**: `userId?: string, page?: number, limit?: number`
- **Response**: `PaginatedResponse<Collection>`

### GET `/api/collections/:collectionId`
Получить коллекцию по ID
- **Params**: `collectionId` - ID коллекции
- **Response**: `Collection`

### POST `/api/collections`
Создать коллекцию
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title: string, description: string, tags: string[] }`
- **Response**: `Collection`

### PUT `/api/collections/:collectionId`
Обновить коллекцию
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title?: string, description?: string, tags?: string[] }`
- **Response**: `Collection`

### DELETE `/api/collections/:collectionId`
Удалить коллекцию
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean }`

### POST `/api/collections/:collectionId/like`
Лайкнуть коллекцию
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean, likes: number }`

### DELETE `/api/collections/:collectionId/unlike`
Убрать лайк
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean, likes: number }`

### POST `/api/collections/:collectionId/articles`
Добавить статью в коллекцию
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ articleId: string }`
- **Response**: `{ success: boolean }`

### DELETE `/api/collections/:collectionId/articles/:articleId`
Удалить статью из коллекции
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean }`

---

## 💬 Комментарии

### GET `/api/collections/:collectionId/comments`
Список комментариев к коллекции
- **Params**: `collectionId` - ID коллекции
- **Query**: `page?: number, limit?: number`
- **Response**: `PaginatedResponse<Comment>`

### POST `/api/collections/:collectionId/comments`
Добавить комментарий
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ text: string, parentId?: string }`
- **Response**: `Comment`

### PUT `/api/comments/:commentId`
Обновить комментарий
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ text: string }`
- **Response**: `Comment`

### DELETE `/api/comments/:commentId`
Удалить комментарий
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean }`

### POST `/api/comments/:commentId/like`
Лайкнуть комментарий
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean, likes: number }`

### DELETE `/api/comments/:commentId/unlike`
Убрать лайк с комментария
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean, likes: number }`

---

## 🎯 Цели чтения

### GET `/api/goals`
Список целей пользователя
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `ReadingGoal[]`

### POST `/api/goals`
Создать цель
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ type: 'daily' | 'weekly' | 'monthly', targetMinutes: number }`
- **Response**: `ReadingGoal`

### PUT `/api/goals/:goalId`
Обновить цель
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ targetMinutes?: number }`
- **Response**: `ReadingGoal`

### DELETE `/api/goals/:goalId`
Удалить цель
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean }`

### GET `/api/goals/progress`
Прогресс по целям
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ daily: number, weekly: number, monthly: number }`

---

## 📡 Источники RSS

### GET `/api/sources`
Список источников пользователя
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `RSSSource[]`

### POST `/api/sources`
Добавить источник
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name: string, url: string, category: string }`
- **Response**: `RSSSource`

### PUT `/api/sources/:sourceId`
Обновить источник
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name?: string, category?: string }`
- **Response**: `RSSSource`

### DELETE `/api/sources/:sourceId`
Удалить источник
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean }`

### PATCH `/api/sources/:sourceId/toggle`
Включить/выключить источник
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean, enabled: boolean }`

---

## 💎 Подписка Premium

### GET `/api/subscription/status`
Статус подписки
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ isPremium: boolean, expiresAt?: string }`

### POST `/api/subscription/create`
Оформить подписку
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ plan: 'monthly' | 'yearly', paymentMethod: string }`
- **Response**: `{ success: boolean, subscriptionId: string }`

### DELETE `/api/subscription/cancel`
Отменить подписку
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean }`

---

## 📊 Статус коды

- `200` - Успешный запрос
- `201` - Ресурс создан
- `400` - Ошибка валидации
- `401` - Не авторизован
- `403` - Доступ запрещен
- `404` - Ресурс не найден
- `500` - Ошибка сервера

## 🔒 Авторизация

Большинство endpoints требует авторизации через Bearer token:

```
Authorization: Bearer <your_jwt_token>
```

Token получается при успешном логине/регистрации.
