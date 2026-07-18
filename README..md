# Cloud Compass — MERN Weather Station

A real-time weather app built on the MERN stack (MongoDB, Express, React, Node).
The React frontend calls an Express/Node API, which proxies [OpenWeatherMap](https://openweathermap.org/api)
for live conditions and forecasts, and logs every search to MongoDB.

## Folder structure

```
Cloud Compass/
├── backend/                 # Express + MongoDB API
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── weatherController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── SearchHistory.js
│   ├── routes/
│   │   └── weatherRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/                 # React (Vite) client
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── WeatherCard.jsx
│   │   │   ├── ForecastList.jsx
│   │   │   ├── HistoryPanel.jsx
│   │   │   └── Loader.jsx
│   │   ├── hooks/
│   │   │   └── useWeather.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Features

- Live current conditions (temperature, feels-like, humidity, pressure, wind, visibility, sunrise/sunset)
- 5-day forecast
- City autocomplete via the OpenWeatherMap Geocoding API
- "Use my location" (browser geolocation)
- Search history persisted in MongoDB, shown in a sidebar
- Centralized error handling and API rate limiting

## Prerequisites

- Node.js 18+
- A free API key from [openweathermap.org/api](https://openweathermap.org/api)
- A MongoDB connection string — local MongoDB or free [MongoDB Atlas](https://www.mongodb.com/atlas) (optional)

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env with your OpenWeatherMap key and Mongo URI
npm run dev
```

Runs on `http://localhost:5000`. Health check: `GET /api/health`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5173`.

## API reference

| Method | Endpoint                          | Description                       |
|--------|------------------------------------|------------------------------------|
| GET    | `/api/health`                     | Server status                      |
| GET    | `/api/weather/current?city=Paris` | Current conditions by city name    |
| GET    | `/api/weather/current?lat=&lon=`  | Current conditions by coordinates  |
| GET    | `/api/weather/forecast?city=Paris`| 5-day forecast                     |
| GET    | `/api/weather/search?q=Par`       | City name autocomplete             |
| GET    | `/api/weather/history`            | Last 10 searches from MongoDB      |

## Tech stack

- **Frontend**: React 18, Vite, Axios
- **Backend**: Node.js, Express, Mongoose, Axios, express-rate-limit
- **Database**: MongoDB
- **External API**: OpenWeatherMap