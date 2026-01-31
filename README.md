# 📌 Stash - Smart Content Management System

A comprehensive full-stack application for saving, organizing, and managing web content including text snippets and images. Stash consists of a powerful backend API, a responsive React frontend, and a browser extension for seamless content capture.

## 🌟 Features

### 🔐 Core Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Content Management**: Save and organize text snippets and images
- **Browser Extension**: Capture content directly from any website
- **Theme Support**: Light and dark mode across all platforms
- **Search & Filter**: Quickly find saved content
- **Category Organization**: Organize content by custom categories
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🚀 Advanced Features

- **Real-time Synchronization**: Instant sync between extension and web app
- **User Account Management**: Manage profile and preferences
- **Content Export**: Export your collections
- **Health Check**: API monitoring and status checks
- **Error Handling**: Comprehensive error management and user feedback

## 📁 Project Structure

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
│   ├── .env
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
│   ├── .env
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

## 🔧 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Custom validators

### Frontend

- **Framework**: React 18+
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Context API
- **HTTP Client**: Axios/Fetch API
- **Authentication**: Firebase

### Browser Extension

- **Manifest Version**: 3
- **Build Tool**: Vite
- **Framework**: React
- **Styling**: Tailwind CSS
- **UI Components**: Custom React Components

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm
- MongoDB (local or cloud)
- Chrome/Chromium browser (for extension)

### 1️⃣ Backend Setup

```bash
# Navigate to backend directory
cd stash-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# DATABASE_URL=your_mongodb_connection_string
# PORT=5000
# JWT_SECRET=your_jwt_secret
# NODE_ENV=development

# Start the server
npm start
```

**Available Backend Scripts:**

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production

### 2️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd stash-frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# VITE_API_URL=http://localhost:5000
# VITE_FIREBASE_CONFIG=your_firebase_config

# Start development server
npm run dev
```

**Available Frontend Scripts:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### 3️⃣ Browser Extension Setup

```bash
# Navigate to extension directory
cd stash-extension

# Install dependencies
npm install
# or
pnpm install

# Build the extension
npm run build

# Start development server
npm run dev
```

**To Install Extension in Chrome:**

1. Open `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `dist` folder from `stash-extension/`

**Available Extension Scripts:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "username": "username"
}
```

#### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Stash Endpoints

#### Create Stash (Text/Image)

```
POST /api/stash
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My snippet",
  "content": "Content here",
  "category": "work",
  "type": "text" // or "image"
}
```

#### Get All Stashes

```
GET /api/stash
Authorization: Bearer <token>
```

#### Get Stash by ID

```
GET /api/stash/:id
Authorization: Bearer <token>
```

#### Update Stash

```
PUT /api/stash/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "category": "updated-category"
}
```

#### Delete Stash

```
DELETE /api/stash/:id
Authorization: Bearer <token>
```

### User Endpoints

#### Get User Profile

```
GET /api/user/profile
Authorization: Bearer <token>
```

#### Update User Profile

```
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

### Health Check

```
GET /api/health
```

Returns: `{ "status": "OK" }`

## 🎯 Core Components & Architecture

### Backend Architecture

**Controllers** - Handle business logic

- `healthcheck.controller.js` - API health monitoring
- `stash.controller.js` - Stash/snippet management
- `user.controller.js` - User account management

**Models** - Database schemas

- `user.model.js` - User data structure
- `stash.model.js` - Stash/snippet data structure

**Middlewares** - Request processing

- `auth.middleware.js` - JWT authentication
- `validator.middleware.js` - Input validation

**Routes** - API endpoints

- `auth.route.js` - Authentication routes
- `stash.route.js` - Stash management routes
- `healthcheck.route.js` - Health check routes

**Utilities** - Helper functions

- `api-error.js` - Centralized error handling
- `api-response.js` - Standardized response format
- `async-handler.js` - Async error wrapper

### Frontend Structure

**Pages** - Main application screens

- `Home.jsx` - Landing page
- `Dashboard/` - User dashboard with multiple sub-pages
- `Login/Register` - Authentication pages
- `About/Contact/Docs/Terms/Privacy` - Information pages

**Components** - Reusable UI elements

- Navigation & Sidebar components
- Dashboard sections (Hero, Features, How It Works)
- UI components (Input, Buttons, Loading states)

**Context** - State management

- `UserContext` - User authentication state
- `ThemeContext` - Dark/Light theme
- `ToastContext` - Toast notifications
- `UserSnippetsContext` - Snippet management
- Content-specific contexts for images and text

**Hooks** - Custom React hooks

- `useUserContext` - Access user state
- `useTheme` - Theme management
- `useDebounce` - Debounced search
- `useUserSnippetContext` - Snippet operations

### Extension Architecture

**Content Scripts**

- `content-sync.js` - Synchronize data between extension and web app
- `getSelection.js` - Get selected text from webpage
- `background.js` - Background service worker

**Components**

- `App.jsx` - Main extension interface
- `StashToast/` - Toast notification system

## 🔐 Security Features

- JWT-based authentication
- Password hashing
- Environment variable protection
- Input validation and sanitization
- CORS configuration
- Protected API routes
- Secure user session management

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Theme Support**: Dark and light modes
- **Toast Notifications**: User feedback system
- **Loading States**: Skeleton loaders
- **Error Handling**: User-friendly error messages
- **Accessibility**: Semantic HTML and ARIA labels

## 🚀 Deployment

### Backend Deployment

```bash
# Build for production
npm run build

# Set production environment variables
NODE_ENV=production

# Deploy to hosting (Heroku, Vercel, AWS, etc.)
```

### Frontend Deployment

```bash
# Build for production
npm run build

# Deploy dist folder to hosting (Vercel, Netlify, GitHub Pages, etc.)
```

### Extension Deployment

```bash
# Build for production
npm run build

# Submit to Chrome Web Store with dist folder
```

## 📝 Environment Variables

### Backend (.env)

```env
# PORT
PORT=8000

# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stashDB

# CORS
CORS_ORIGIN=https://trystash.vercel.app,http://localhost:5173

# JWT
ACCESS_TOKEN_SECRET=your_access_token_secret_key
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)

```env
# Backend API Port
VITE_BACKEND_API_PORT=8000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=stash-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=stash-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=stash-xxxxx.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXX

# Chrome Extension ID
VITE_CHROME_EXTENSION_ID=your_extension_id
```

### Browser Extension

The extension uses the same Firebase configuration as the frontend. No separate .env needed if communicating with frontend
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Authentication

VITE_JWT_STORAGE_KEY=stash_auth_token
VITE_USER_STORAGE_KEY=stash_user_data

# Feature Flags

VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_PUSH_NOTIFICATIONS=true

# Debug Configuration

VITE_DEBUG_MODE=false
VITE_DEBUG_API_CALLS=false

# Cloudinary Configuration

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=

# Analytics

VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=

````

#### Browser Extension - .env.example

```env
# Copy this file to .env and fill in your values

# Extension Configuration
VITE_EXTENSION_NAME=Stash
VITE_EXTENSION_VERSION=1.0.0
VITE_EXTENSION_DESCRIPTION=Save and organize web content effortlessly

# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_PREFIX=/api/v1

# Firebase Configuration
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Storage Configuration
VITE_STORAGE_KEY_PREFIX=stash_ext_
VITE_SYNC_INTERVAL=5000

# Content Capture Configuration
VITE_MAX_CONTENT_SIZE=5242880
VITE_SUPPORTED_CONTENT_TYPES=text/plain,text/html,image/jpeg,image/png

# Messaging
VITE_ENABLE_NOTIFICATIONS=true
VITE_NOTIFICATION_TIMEOUT=5000

# Debug
VITE_DEBUG_MODE=false
````

### Environment Setup Instructions

#### For Backend:

```bash
cd stash-backend
cp .env.example .env
# Edit .env with your actual values
```

#### For Frontend:

```bash
cd stash-frontend
cp .env.example .env
# Edit .env with your actual values
```

#### For Extension:

```bash
cd stash-extension
cp .env.example .env
# Edit .env with your actual values
```

### Important Notes on Environment Variables

- ⚠️ **Never commit .env files to version control**
- 🔐 **Use strong JWT secrets in production** (min 32 characters)
- 🗄️ **Use MongoDB Atlas for production databases** (not localhost)
- 📧 **Set up email credentials** for password reset functionality
- 🔑 **Keep Firebase credentials secure** and limit by domain
- 💾 **Use cloud storage** (Cloudinary/AWS S3) for file uploads in production
- 🌐 **Update CORS_ORIGIN** to match your frontend domain in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Code Quality

- **Linting**: ESLint configured for code style consistency
- **Formatting**: Prettier for code formatting
- **Validation**: Input validators for API requests

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support & Troubleshooting

### Common Issues

**Backend Connection Failed**

- Ensure MongoDB is running
- Check DATABASE_URL in .env
- Verify network connectivity

**Frontend API Errors**

- Verify backend is running on correct port
- Check VITE_API_URL in .env
- Review browser console for CORS errors

**Extension Not Loading**

- Clear extension cache
- Rebuild extension: `npm run build`
- Check manifest.json validity
- Enable developer mode in Chrome

## 📞 Contact & Support

For issues, feature requests, or questions:

- Open an issue on GitHub
- Check documentation at `/docs`
- Contact through the application's contact page

---

**Last Updated**: January 2026
