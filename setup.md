## Setup fo Wellnet-Arvyax
This guide will help you set up the WellNet-Arvyax project locally for development and testing.
# Clone the Repository

```bash
git clone https://github.com/amit-gupta18/arvyax.git

cd arvyax
```
# Backend Setup
### 1. Navigate to the Backend Directory
```bash
cd backend
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Make a .env file in the root of the backend directory and add the following variables:

```plaintext
DATABASE_URI=MONGODB_DATABASE_URI
JWT_SECRET=YOUR_JWT_SECRET_KEY
PORT=3000
```

### 4. Run Backend (Node) Server

```bash
cd backend
npm run start
```

You should see:

```
Server running at http://localhost:3000
```
# Frontend Setup
### 1. Navigate to the Frontend Directory

```bash
cd frontend
```
### 2. Install Dependencies

```bash
npm install
```
### 3. Set Up Environment Variables
Create a `.env.local` file in the root of the frontend directory and add the following variables:

```plaintext
VITE_API_BASE_URL=YOUR_BACKEND_URL
```

### 4. Start the Frontend Server

```bash
npm run dev
```

The frontend should now be running at `http://localhost:5173` (or the port specified in your terminal).
