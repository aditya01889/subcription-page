Here’s a detailed README for both the **frontend** and **backend** parts of your application.

---

## Cozy Cat Kitchen - README

### Table of Contents
- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Frontend](#frontend-setup)
  - [Backend](#backend-setup)
- [Environment Variables](#environment-variables)
  - [Frontend Environment Variables](#frontend-environment-variables)
  - [Backend Environment Variables](#backend-environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)

---

## Introduction
Cozy Cat Kitchen is a subscription-based service for cat meals. The app allows users to subscribe to different meal plans for their cats, with payments handled through Razorpay and shipping handled via Shiprocket.

The app consists of a **React-based frontend** and an **Express-based backend**, and uses MongoDB as the database for storing user data and orders.

---

## Tech Stack

### Frontend:
- **React**
- **Axios** for API requests
- **CSS Modules** for styling
- **React-Modal** for form handling

### Backend:
- **Node.js**
- **Express**
- **MongoDB** for database
- **Razorpay** for payment subscriptions
- **Shiprocket API** for handling deliveries
- **Cron Jobs** for recurring orders
- **Helmet**, **CORS**, and **Rate Limit** for security

---

## Setup Instructions

### Prerequisites
1. **Node.js**: Ensure you have Node.js installed (version 12+)
2. **MongoDB**: Ensure MongoDB is installed and running on your machine, or use a hosted MongoDB instance like MongoDB Atlas.

---

### Frontend Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment files:
   - Create `.env.development` and `.env.production` in the root of the frontend directory.
   - Define the following variables:
   
```bash
# .env.development / .env.production
REACT_APP_RAZORPAY_KEY_ID=<your-razorpay-key-id>
REACT_APP_API_BASE_URL=<your-backend-url>
```

4. Run the development server:

```bash
npm start
```

This will start the frontend at `http://localhost:3000`.

---

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment files:
   - Create `.env.development` and `.env.production` in the root of the backend directory.
   - Define the following variables:
   
```bash
# .env.development / .env.production
MONGODB_URI=<your-mongodb-uri>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-secret>
SHIPROCKET_TOKEN=<your-shiprocket-api-token>
FRONTEND_URL=<your-frontend-url>
```

4. Start the server:

```bash
npm run dev
```

The backend will be running at `http://localhost:3001`.

---

## Environment Variables

### Frontend Environment Variables:
- `REACT_APP_RAZORPAY_KEY_ID`: The public Razorpay key to initialize payments.
- `REACT_APP_API_BASE_URL`: The base URL for the backend APIs.

### Backend Environment Variables:
- `MONGODB_URI`: The MongoDB connection string.
- `RAZORPAY_KEY_ID`: Razorpay public key.
- `RAZORPAY_KEY_SECRET`: Razorpay secret key.
- `SHIPROCKET_TOKEN`: API token for Shiprocket.
- `FRONTEND_URL`: URL for the frontend to allow CORS requests.

---

## Running the Application

### For Frontend
To run the frontend in development mode, use:

```bash
npm start
```

To build for production:

```bash
npm run build
```

### For Backend
To run the backend in development mode:

```bash
npm run dev
```

To run the backend in production mode:

```bash
npm start
```

---

## Deployment

### Frontend:
1. Deploy to Vercel or Netlify.
2. Make sure to add the environment variables for your production keys in the platform's dashboard.

### Backend:
1. Deploy on platforms like Vercel, Heroku, or AWS.
2. Set the environment variables in the platform's dashboard for production.

---

## API Endpoints

### Razorpay Subscription Creation
- **Endpoint:** `/create-razorpay-subscriptions`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "cart": [
      {
        "planId": "plan_XXXX",
        "quantity": 1
      }
    ],
    "email": "user@example.com",
    "phone": "1234567890"
  }
  ```
  
### Shiprocket Order Creation
- **Endpoint:** `/create-shiprocket-order`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "cart": [
      {
        "name": "Kitten Subscription",
        "sku": "SUB_KITTEN_SUBSCRIPTION",
        "quantity": 1,
        "price": 1499
      }
    ],
    "name": "John Doe",
    "address": "123 Street",
    "email": "john@example.com",
    "phone": "9876543210"
  }
  ```

---

## License

This project is open-source. Feel free to contribute!

---

This README file gives detailed instructions for both frontend and backend setup, how to run the application in different environments, and also how to deploy it.