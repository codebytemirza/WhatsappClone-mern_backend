# WhatsappClone

A full-stack WhatsApp-like chat application built with React, Node.js, Express, MongoDB, and Socket.IO.

## Project Structure

- **whatsapp-frontend/** – React frontend (modern WhatsApp UI)
- **whatsapp-backend/** – Node.js/Express backend (REST API + Socket.IO)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Setup

#### 1. Clone the repository

```sh
git clone https://github.com/your-username/WhatsappClone.git
cd WhatsappClone
```

#### 2. Install dependencies

```sh
cd whatsapp-frontend
npm install
cd ../whatsapp-backend
npm install
```

#### 3. Configure environment variables

- Copy `.env.example` to `.env` in `whatsapp-backend/` and set your MongoDB URI and JWT secret.

#### 4. Start the backend

```sh
cd whatsapp-backend
npm run dev
```

#### 5. Start the frontend

```sh
cd ../whatsapp-frontend
npm start
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## Features

- Modern WhatsApp-like UI
- Real-time messaging with Socket.IO
- User authentication (JWT)
- Online/offline status
- Typing indicators
- Responsive design

## License

MIT
