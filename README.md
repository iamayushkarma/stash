# 📌 Stash - Smart Content Management System

A comprehensive full-stack application for saving, organizing, and managing web content including text snippets and images. Built with React, Node.js, MongoDB, and deployed on Render (backend) and Vercel (frontend).

## 🌟 Features

- **User Authentication** - Secure JWT + Firebase OAuth (Google Sign-In)
- **Content Management** - Save and organize text snippets and images
- **Browser Extension** - Capture content directly from any website
- **Theme Support** - Dark and light mode across all platforms
- **Search & Filter** - Real-time search with category organization
- **Cloud Storage** - Images stored securely on Cloudinary
- **Responsive Design** - Mobile-first approach for all devices

## 🔧 Tech Stack

**Backend:** Node.js, Express, MongoDB, JWT, Cloudinary  
**Frontend:** React 18, Vite, Tailwind CSS, Firebase Auth, Axios  
**Extension:** React, Chrome Manifest V3, Chrome Storage API  
**Deployment:** Render (Backend), Vercel (Frontend)

## 📁 Complete Project Structure

```
Stash/
├── .github/
│   └── appmod/
│       └── appcat/
├── stash-backend/
│   ├── public/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── healthcheck.controller.js
│   │   │   ├── stash.controller.js
│   │   │   └── user.controller.js
│   │   ├── db/
│   │   │   └── index.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── validator.middleware.js
│   │   ├── models/
│   │   │   ├── stash.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   ├── healthcheck.route.js
│   │   │   └── stash.route.js
│   │   ├── utils/
│   │   │   ├── api-error.js
│   │   │   ├── api-response.js
│   │   │   └── async-handler.js
│   │   ├── validators/
│   │   │   └── index.js
│   │   ├── app.js
│   │   └── index.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package-lock.json
│   └── package.json
├── stash-extension/
│   ├── public/
│   │   ├── icons/
│   │   │   ├── icon128.png
│   │   │   ├── icon16.png
│   │   │   └── icon48.png
│   │   ├── background.js
│   │   ├── content-sync.js
│   │   ├── getSelection.js
│   │   └── manifest.json
│   ├── src/
│   │   ├── StashToast/
│   │   │   ├── StashToast.jsx
│   │   │   ├── StashToastUi.jsx
│   │   │   └── useStashToast.jsx
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── App.jsx
│   │   ├── constants.js
│   │   ├── index.css
│   │   ├── index.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── tailwind.config.js
│   └── vite.config.js
├── stash-frontend/
│   ├── public/
│   │   ├── favicon/
│   │   │   └── stash-favicon.png
│   │   ├── images/
│   │   │   ├── blue-stroke.png
│   │   │   ├── cloude-drawing-image-dark.png
│   │   │   ├── cloude-drawing-image-light.png
│   │   │   ├── dashboard-image-dark.png
│   │   │   ├── dashboard-image-light.png
│   │   │   ├── security-image.png
│   │   │   └── security-image.webp
│   │   └── logo/
│   │       ├── stash-logo-dark-secondary.png
│   │       ├── stash-logo-dark.png
│   │       ├── stash-logo-light-secondary.png
│   │       └── stash-logo-light.jpg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── icons/
│   │   │   │   ├── Access.png
│   │   │   │   ├── cloud-computing.png
│   │   │   │   ├── note.png
│   │   │   │   ├── save.png
│   │   │   │   └── sign-in.png
│   │   │   ├── images/
│   │   │   └── json/
│   │   │       └── Login.json
│   │   ├── components/
│   │   │   ├── DashboardNavbar.jsx
│   │   │   ├── DashboardSidebar.jsx
│   │   │   ├── DecisionClosureSection.jsx
│   │   │   ├── FeatureSection.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SearchOrganizationSection.jsx
│   │   │   ├── UseCasesSection.jsx
│   │   │   ├── UserDashboardImage.jsx
│   │   │   └── components.css
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx
│   │   │   ├── ToastContext.jsx
│   │   │   ├── UserContext.jsx
│   │   │   ├── UserImageSnippetsContent.jsx
│   │   │   ├── UserSnippetsContext.jsx
│   │   │   └── UserTextSnippetsContent.jsx
│   │   ├── hooks/
│   │   │   ├── useDebounce.js
│   │   │   ├── useTheme.js
│   │   │   ├── useUpdateUser.js
│   │   │   ├── useUserContext.js
│   │   │   ├── useUserImageSnippetsContent.js
│   │   │   ├── useUserSnippetContext.js
│   │   │   └── useUserTextSnippetsContent.js
│   │   ├── layouts/
│   │   │   ├── Footer.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   │   ├── Categories.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── DashboardHome.jsx
│   │   │   │   ├── DashboardSnippet.jsx
│   │   │   │   ├── Help.jsx
│   │   │   │   ├── Image.jsx
│   │   │   │   ├── MobileDashboardSidebar.jsx
│   │   │   │   ├── Snippets.jsx
│   │   │   │   ├── UserAccount.jsx
│   │   │   │   └── dashboard.css
│   │   │   ├── login/
│   │   │   │   └── Login.jsx
│   │   │   ├── register/
│   │   │   │   └── Register.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Docs.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── PageNotFound.jsx
│   │   │   ├── Privacy.jsx
│   │   │   ├── Terms.jsx
│   │   │   ├── constents.js
│   │   │   └── pages.css
│   │   ├── utils/
│   │   │   ├── functions/
│   │   │   │   └── copyToClipboard.jsx
│   │   │   ├── ui/
│   │   │   │   ├── Buttons/
│   │   │   │   ├── AuthWelcomeSidebar.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── LoadingSkleton.jsx
│   │   │   └── Firebase.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
├── .prettierignore
├── .prettierrc
├── README.md
├── package-lock.json
├── package.json
└── tree.js
```

## 📦 Prerequisites

- Node.js v16+ - [Download](https://nodejs.org/)
- MongoDB Atlas account - [Sign up](https://www.mongodb.com/cloud/atlas)
- Firebase account - [Console](https://console.firebase.google.com/)
- Cloudinary account - [Sign up](https://cloudinary.com/)
- Chrome browser (for extension)

---

## 🔥 Firebase OAuth Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** → Enter name "Stash" → Continue
3. Disable Google Analytics (optional) → Create project

### Step 2: Register Web App

1. Click Web icon (`</>`) → App nickname: "Stash Web" → Register app
2. Copy the configuration object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX",
};
```

### Step 3: Enable Authentication

1. Navigate to **Authentication** → **Get started** → **Sign-in method** tab
2. Enable **Email/Password** → Save
3. Enable **Google** → Select support email → Save

### Step 4: Configure OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project → **APIs & Services** → **OAuth consent screen**
3. Select **External** → Fill required fields:
   - App name: Stash
   - User support email: your-email@example.com
4. **Scopes** → Add: `userinfo.email`, `userinfo.profile` → Save

### Step 5: Configure Redirect URIs

1. **APIs & Services** → **Credentials** → OAuth 2.0 Client ID
2. **Authorized JavaScript origins**:
   ```
   http://localhost:5173
   https://your-production-domain.com
   ```
3. **Authorized redirect URIs**:
   ```
   http://localhost:5173/__/auth/handler
   https://your-project.firebaseapp.com/__/auth/handler
   https://your-production-domain.com/__/auth/handler
   ```
4. Save

### Step 6: Add Authorized Domains

1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Add:
   - `localhost` (pre-added)
   - Your Vercel domain (after deployment)
   - Chrome extension ID: `chrome-extension://YOUR_EXTENSION_ID`

---

## 🗄️ MongoDB Setup

### MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → Create free cluster
2. Create database user (username + password)
3. **Network Access** → Add IP: `0.0.0.0/0` (allow all)
4. Click **Connect** → **Connect your application** → Copy connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/stashDB?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your credentials

---

## ☁️ Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/) → Dashboard
2. Copy credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret** (click "Reveal")

---

## 1️⃣ Backend Setup

```bash
# Clone and navigate
git clone https://github.com/yourusername/stash.git
cd stash/stash-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `stash-backend/.env`:**

```env
# Server
PORT=8000

# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stashDB?retryWrites=true&w=majority

# CORS (update after frontend deployment)
CORS_ORIGIN=http://localhost:5173

# JWT Secrets (generate with commands below)
ACCESS_TOKEN_SECRET=your_generated_secret_min_32_chars
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_different_generated_secret_min_32_chars
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Generate JWT Secrets:**

```bash
node -e "console.log('ACCESS_TOKEN_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('REFRESH_TOKEN_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

**Start backend:**

```bash
npm start
# Server running on http://localhost:8000
```

**Test health check:**

```bash
curl http://localhost:8000/api/health
```

---

## 2️⃣ Frontend Setup

```bash
cd ../stash-frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `stash-frontend/.env`:**

```env
# Backend API
VITE_BACKEND_API_PORT=8000

# Firebase (from Firebase Console → Project Settings)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Chrome Extension ID (add after building extension)
VITE_CHROME_EXTENSION_ID=
```

**Start frontend:**

```bash
npm run dev
# Running on http://localhost:5173
```

---

## 3️⃣ Extension Setup

```bash
cd ../stash-extension

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `stash-extension/.env`:**

```env
# Same Firebase config as frontend
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Build and install:**

```bash
# Build extension
npm run build

# Install in Chrome:
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Load unpacked → Select stash-extension/dist folder
# 4. Copy Extension ID shown
```

**Update configs with Extension ID:**

1. Add to `stash-frontend/.env`: `VITE_CHROME_EXTENSION_ID=your_extension_id`
2. Add to Firebase Authorized domains: `chrome-extension://your_extension_id`
3. Restart frontend

---

## 🌐 Deployment

### Backend - Deploy to Render

1. **Push code to GitHub**

   ```bash
   git add .
   git commit -m "Deploy backend"
   git push origin main
   ```

2. **Create Web Service on Render**
   - Go to [render.com](https://render.com/) → Sign in with GitHub
   - **New** → **Web Service** → Connect repository
   - Configure:
     - **Name:** stash-backend
     - **Root Directory:** `stash-backend`
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Instance Type:** Free

3. **Add Environment Variables**

   In Render dashboard → **Environment** tab, add:

   ```
   PORT=8000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stashDB?retryWrites=true&w=majority
   CORS_ORIGIN=https://your-frontend.vercel.app
   ACCESS_TOKEN_SECRET=your_generated_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_different_secret
   REFRESH_TOKEN_EXPIRY=10d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Deploy & Get URL**
   - Click **Create Web Service**
   - Copy your backend URL: `https://stash-backend-xxxx.onrender.com`

### Frontend - Deploy to Vercel

**Method 1: Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

cd stash-frontend

# Login and deploy
vercel login
vercel

# Production deployment
vercel --prod
```

**Method 2: Vercel Dashboard (Recommended)**

1. Go to [vercel.com](https://vercel.com/) → **Add New** → **Project**
2. Import GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `stash-frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Add Environment Variables** (Settings → Environment Variables):

   ```
   VITE_BACKEND_API_PORT=https://stash-backend-xxxx.onrender.com
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_CHROME_EXTENSION_ID=your_extension_id
   ```

5. **Deploy** → Get URL: `https://your-app.vercel.app`

6. **Update Backend CORS**
   - Render → Environment → Update `CORS_ORIGIN`:
     ```
     CORS_ORIGIN=https://your-app.vercel.app,http://localhost:5173
     ```
   - Redeploy backend

---

## 📚 API Documentation

### Base URL

- Development: `http://localhost:8000/api`
- Production: `https://your-backend.onrender.com/api`

### Authentication

**Register**

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "username": "johndoe"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "username": "..." },
    "accessToken": "eyJhbG...",
    "refreshToken": "eyJhbG..."
  },
  "message": "User registered successfully"
}
```

**Login**

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Refresh Token**

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbG..."
}
```

**Logout**

```http
POST /auth/logout
Authorization: Bearer <access_token>
```

### Stash/Snippets

**Create Text Stash**

```http
POST /stash
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "JavaScript Tips",
  "content": "Use const and let instead of var",
  "category": "coding",
  "type": "text"
}
```

**Create Image Stash**

```http
POST /stash
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Design Inspiration",
  "image": <file>,
  "category": "design",
  "type": "image"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "stash_id",
    "title": "JavaScript Tips",
    "content": "Use const and let instead of var",
    "category": "coding",
    "type": "text",
    "userId": "user_id",
    "createdAt": "2026-01-31T10:00:00.000Z"
  },
  "message": "Stash created successfully"
}
```

**Get All Stashes**

```http
GET /stash?page=1&limit=10&category=coding&search=javascript&type=text
Authorization: Bearer <token>
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `search` (optional): Search in title and content
- `type` (optional): Filter by type (text/image)

**Response:**

```json
{
  "success": true,
  "data": {
    "stashes": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 47,
      "itemsPerPage": 10
    }
  }
}
```

**Get Single Stash**

```http
GET /stash/:id
Authorization: Bearer <token>
```

**Update Stash**

```http
PUT /stash/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "category": "new-category"
}
```

**Delete Stash**

```http
DELETE /stash/:id
Authorization: Bearer <token>
```

### User

**Get Profile**

```http
GET /user/profile
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "johndoe",
    "createdAt": "2026-01-15T08:30:00.000Z",
    "stats": {
      "totalStashes": 47,
      "textStashes": 32,
      "imageStashes": 15
    }
  }
}
```

**Update Profile**

```http
PUT /user/profile
Authorization: Bearer <token>

{
  "username": "newname",
  "email": "new@email.com"
}
```

**Change Password**

```http
PUT /user/password
Authorization: Bearer <token>

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

**Delete Account**

```http
DELETE /user/account
Authorization: Bearer <token>

{
  "password": "UserPass123!",
  "confirmation": "DELETE"
}
```

### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2026-01-31T10:00:00.000Z",
  "uptime": 3600,
  "database": "connected"
}
```

### Error Responses

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## 🎯 Architecture Overview

### Backend Components

**Controllers** - Business logic for requests

- `healthcheck.controller.js` - API health monitoring
- `stash.controller.js` - CRUD operations for stashes
- `user.controller.js` - User management and auth

**Models** - MongoDB schemas

- `user.model.js` - User data with authentication
- `stash.model.js` - Stash/snippet data with categories

**Middlewares** - Request processing

- `auth.middleware.js` - JWT verification
- `validator.middleware.js` - Input validation
- `multer.middleware.js` - File upload handling
- `error.middleware.js` - Global error handling

**Routes** - API endpoints

- `auth.route.js` - Authentication routes
- `stash.route.js` - Stash management routes
- `user.route.js` - User profile routes
- `healthcheck.route.js` - Health monitoring

**Utilities**

- `api-error.js` - Custom error classes
- `api-response.js` - Standardized responses
- `async-handler.js` - Async/await wrapper
- `cloudinary.js` - Image upload utility
- `jwt.js` - Token generation/verification

**Database**

- `db/index.js` - MongoDB connection with Mongoose

### Frontend Components

**Pages**

- `Home.jsx` - Landing page with features
- `Login.jsx` / `Register.jsx` - Authentication
- `About.jsx`, `Contact.jsx`, `Docs.jsx` - Info pages
- `Dashboard/` - User dashboard suite
  - `DashboardHome.jsx` - Overview and stats
  - `Snippets.jsx` - Text snippets list
  - `Image.jsx` - Image stashes list
  - `Categories.jsx` - Category management
  - `UserAccount.jsx` - Profile settings
  - `Help.jsx` - Help and support

**Components**

- **Navigation:** `Navbar.jsx`, `DashboardNavbar.jsx`, `DashboardSidebar.jsx`, `Footer.jsx`
- **Landing Sections:** `HeroSection.jsx`, `FeatureSection.jsx`, `HowItWorks.jsx`, `UseCasesSection.jsx`
- **Auth:** `ProtectedRoute.jsx` - Route protection

**Context (State Management)**

- `UserContext.jsx` - User auth state
- `ThemeContext.jsx` - Dark/light theme
- `ToastContext.jsx` - Toast notifications
- `UserSnippetsContext.jsx` - Snippet management
- `UserTextSnippetsContent.jsx` - Text snippets
- `UserImageSnippetsContent.jsx` - Image snippets

**Custom Hooks**

- `useUserContext.js` - User state access
- `useTheme.js` - Theme management
- `useDebounce.js` - Debounced input
- `useUserSnippetContext.js` - Snippet CRUD
- `useUpdateUser.js` - Profile updates

**Utilities**

- `copyToClipboard.jsx` - Clipboard utility
- `Input.jsx`, `LoadingSkleton.jsx` - UI components
- `Firebase.js` - Firebase SDK initialization

**Layouts**

- `MainLayout.jsx` - Main app wrapper (Navbar + Content + Footer)

### Extension Architecture

**Manifest & Scripts**

- `manifest.json` - Extension config (Manifest V3)
- `background.js` - Service worker
- `content-sync.js` - Data sync
- `getSelection.js` - Text capture

**UI**

- `App.jsx` - Extension popup
- `StashToast/` - Toast notification system

**Communication Flow:**

```
Web Page → Content Script → Background Script → Extension Popup → Backend API → Web Dashboard
```

---

## 🔐 Security Features

**Backend Security:**

- JWT authentication (access + refresh tokens)
- Password hashing with bcrypt
- Input validation & sanitization
- CORS protection
- Environment variable protection
- Mongoose parameterized queries

**Frontend Security:**

- Firebase OAuth (Google Sign-In)
- Protected routes with guards
- Secure token storage
- HTTPS enforcement
- Input sanitization

**Extension Security:**

- Manifest V3 standards
- Content Security Policy
- Minimal permissions
- Secure messaging
- No inline scripts

**Data Security:**

- HTTPS for all API calls
- Cloudinary secure URLs
- User data isolation
- File type validation
- Size limits on uploads

---

## 🎨 UI/UX Features

**Design System:**

- Responsive mobile-first design
- Dark/light theme with system detection
- Tailwind CSS utilities
- Consistent color palette
- Typography hierarchy

**User Experience:**

- Toast notifications for feedback
- Skeleton loaders for performance
- User-friendly error messages
- Empty state handling
- Real-time search with debouncing
- Pagination for large datasets
- Keyboard navigation support
- Real-time form validation

**Accessibility:**

- Semantic HTML5
- ARIA labels
- Clear focus states
- WCAG AA contrast ratios
- Descriptive alt text
- Skip links for navigation

**Performance:**

- Code splitting & lazy loading
- Cloudinary image optimization
- Debounced search
- React.memo memoization
- Vite optimized builds

---

## 📝 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=8000

# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stashDB?retryWrites=true&w=majority

# CORS (comma-separated, no spaces)
CORS_ORIGIN=https://your-app.vercel.app,http://localhost:5173

# JWT Configuration
ACCESS_TOKEN_SECRET=your_generated_secret_min_32_characters
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_different_generated_secret_min_32_characters
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Notes:**

- Generate JWT secrets: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Use MongoDB Atlas for production
- Update CORS_ORIGIN with production frontend URL
- Never commit .env files to Git

### Frontend (.env)

```env
# Backend API
VITE_BACKEND_API_PORT=8000  # Development
# VITE_BACKEND_API_PORT=https://your-backend.onrender.com  # Production

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Chrome Extension ID
VITE_CHROME_EXTENSION_ID=abcdefghijklmnopqrstuvwxyz123456
```

**Notes:**

- Get Firebase config from Firebase Console → Project Settings
- For production, use full backend URL
- Add extension ID after building extension

### Extension (.env)

```env
# Firebase (same as frontend)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Notes:**

- Use same Firebase project as frontend
- Add extension ID to Firebase authorized domains

---

## 🛠️ Troubleshooting

### Backend Issues

**MongoDB Connection Failed**

```
Error: MongooseServerSelectionError
```

Solutions:

- Check MONGO_URI in .env
- Whitelist IP in MongoDB Atlas (0.0.0.0/0)
- Verify credentials
- Test connection string

**CORS Error**

```
Access blocked by CORS policy
```

Solutions:

- Update CORS_ORIGIN in backend .env
- Include frontend URL (no trailing slash)
- Restart backend server
- Clear browser cache

**JWT Error**

```
JsonWebTokenError: invalid signature
```

Solutions:

- Verify ACCESS_TOKEN_SECRET matches
- Clear browser localStorage
- Re-login to get new token
- Check token hasn't expired

**Cloudinary Upload Failed**

```
Invalid cloud_name
```

Solutions:

- Verify Cloudinary credentials in .env
- Check API key and secret
- Ensure cloud name is correct
- Test in Cloudinary console

### Frontend Issues

**API Connection Failed**

```
Failed to fetch
```

Solutions:

- Ensure backend is running
- Check VITE_BACKEND_API_PORT in .env
- Verify CORS is configured
- Check browser console for details

**Firebase Auth Error**

```
auth/invalid-api-key
```

Solutions:

- Verify all Firebase env variables
- Check Firebase project status
- Ensure authorized domains configured
- Verify OAuth is enabled

**Build Error**

```
Cannot find module
```

Solutions:

- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear cache: `npm cache clean --force`
- Check Node.js version (16+)

### Extension Issues

**Extension Not Loading**
Solutions:

- Rebuild: `npm run build`
- Load dist folder, not src
- Enable Developer Mode in Chrome
- Check manifest.json syntax

**Can't Save Content**
Solutions:

- Verify user is logged in
- Check Firebase config matches frontend
- Review extension permissions
- Check background script errors

**Sync Failed**
Solutions:

- Ensure backend is accessible
- Verify CORS includes extension ID
- Check extension storage permissions
- Clear extension data and re-login

### Debug Commands

```bash
# Backend logs
npm run dev

# Frontend console
# F12 → Console tab

# Extension logs
# Right-click extension → Inspect popup
```

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open Pull Request

**Code Style:**

- Use ESLint and Prettier
- Follow existing patterns
- Add comments for complex logic
- Update documentation
- Test before submitting

---

## 📋 Scripts Reference

### Backend

```bash
npm start       # Start server
npm run dev     # Development with nodemon
npm test        # Run tests
npm run lint    # ESLint
```

### Frontend

```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview build
npm run lint    # ESLint
```

### Extension

```bash
npm run dev     # Development mode
npm run build   # Production build
npm run lint    # ESLint
```

---

## ✅ Deployment Checklist

### Backend (Render)

- [ ] Code pushed to GitHub
- [ ] Render web service created
- [ ] All environment variables added
- [ ] MongoDB connection working
- [ ] Health endpoint responding
- [ ] CORS includes frontend URL

### Frontend (Vercel)

- [ ] Project imported to Vercel
- [ ] All environment variables added
- [ ] Build succeeds
- [ ] Backend API URL updated
- [ ] Firebase auth working
- [ ] Extension ID added

### Extension

- [ ] Built: `npm run build`
- [ ] Extension ID copied
- [ ] ID added to frontend .env
- [ ] ID added to Firebase domains
- [ ] Tested and working

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file

---

## 📞 Support

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/stash/issues)
- 📖 Docs: `/docs` folder
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/stash/discussions)

---

## 🙏 Acknowledgments

Built with: React, Node.js, Express, MongoDB, Firebase, Cloudinary, Tailwind CSS, Vite, JWT

Inspired by: Pocket, Notion, Chrome Extension best practices

---

**Built with ❤️ | Version 1.0.0 | Last Updated: January 2026**

⭐ **Star the repo if you find Stash helpful!**

[⬆ Back to Top](#-stash---smart-content-management-system)
