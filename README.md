# ☁️ Cloud Compass — MERN Weather Station

Cloud Compass is a full-stack weather application built with the MERN stack (MongoDB, Express, React, and Node.js). It provides real-time weather conditions, 5-day forecasts, city autocomplete, and location-based weather updates. The application uses an Express backend to securely communicate with the OpenWeatherMap API while storing recent search history in MongoDB Atlas.

---

## 🚀 Live Demo

- **Frontend:** https://cloud-compass-two.vercel.app
- **Backend API:** https://cloud-compass.onrender.com

> **Note:** The backend is hosted on **Render's free tier**. If the application has been inactive for a while, the first request may take **30–60 seconds** while the server wakes up. Subsequent requests will be much faster.

---

## ✨ Features

### 🌤️ Weather

- View real-time weather conditions
- 5-day weather forecast
- City autocomplete using the OpenWeatherMap Geocoding API
- Search weather by current location using browser geolocation

### 📚 Search History

- Automatically saves recent searches
- Displays the latest searches in a sidebar
- Data persisted using MongoDB Atlas

### ⚙️ Backend

- RESTful Express API
- Secure API key management with environment variables
- Centralized error handling
- Rate limiting to prevent API abuse

---

## 🏗️ Architecture

```text
                 +---------------------+
                 |   React + Vite UI   |
                 +----------+----------+
                            |
                            | HTTP Requests
                            ▼
                 +---------------------+
                 | Express REST API    |
                 |      Node.js        |
                 +-----+----------+----+
                       |          |
          OpenWeather  |          | Mongoose
               API     |          |
                       ▼          ▼
           +---------------+  +----------------+
           | OpenWeather   |  | MongoDB Atlas  |
           +---------------+  +----------------+
```

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Axios

### Backend

- Node.js
- Express.js
- Mongoose
- Axios
- express-rate-limit

### Database

- MongoDB Atlas

### External API

- OpenWeatherMap API

---

## 📂 Project Structure

```text
Cloud Compass/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas account (optional for local development)
- OpenWeatherMap API key

---

### Clone the repository

```bash
git clone https://github.com/atulrawat4903/cloud-compass.git
cd cloud-compass
```

---

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Configure your `.env` file:

```env
OPENWEATHER_API_KEY=your_api_key
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/weather/current?city=Paris` | Current weather by city |
| GET | `/api/weather/current?lat=&lon=` | Current weather by coordinates |
| GET | `/api/weather/forecast?city=Paris` | 5-day forecast |
| GET | `/api/weather/search?q=Par` | City autocomplete |
| GET | `/api/weather/history` | Last 10 searches |

---

## ☁️ Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🔮 Future Improvements

- Favorite cities
- Hourly forecast
- Weather maps
- Air Quality Index (AQI)
- Dark/Light mode
- User authentication

---

## 📄 License

This project is licensed under the MIT License.