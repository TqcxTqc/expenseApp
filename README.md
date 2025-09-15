# Expense Web App

Простое веб‑приложение для учёта расходов: дашборд, список расходов, отчёты.

## Стек
- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React (Vite), Tailwind CSS, react-chartjs-2

## Быстрый старт (локально)

### 1) Backend
```bash
cd backend
# создайте .env с MONGO_URI и PORT, можно взять за основу:
# MONGO_URI=mongodb://localhost:27017/expenses
# PORT=5050
npm install
npm run dev # или npm start
```
Сервер поднимется на `http://localhost:5050`.

ENV переменные:
- `MONGO_URI` — строка подключения к MongoDB (например, `mongodb://localhost:27017/expenses`)
- `PORT` — порт сервера (по умолчанию 5050)

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```
Vite dev‑сервер поднимется на `http://localhost:5173` с прокси на бэкенд (`/api` → `http://localhost:5050`).

## Запуск в Docker

Требуется Docker и Docker Compose.

```bash
# из корня проекта
docker compose build
docker compose up -d
```
Сервисы:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5050`
- MongoDB: `mongodb://localhost:27017` (volume `mongo_data`)

Остановить и удалить контейнеры:
```bash
docker compose down
```

## API
- `GET /api/expenses?year=YYYY&month=MM` — получить расходы (фильтры опциональны)
- `POST /api/expenses` — создать расход `{ amount, category, date, description? }`
- `PUT /api/expenses/:id` — изменить расход (любые поля из тела)
- `DELETE /api/expenses/:id` — удалить расход

## Заметки
- Схема `Expense`: `{ amount: Number, category: String, date: String, description: String }`
- Дата хранится как ISO‑строка `YYYY-MM-DD`.
