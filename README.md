
# GetItWebbed Agency Starter - Deployment & Setup Guide

This is a premium Next.js starter for **GetItWebbed**, a technical service agency specializing in Brand Establishment, Web/App Development, and IoT solutions.

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18.x or later
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your keys:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# AI (Genkit) - Get this from Google AI Studio
GOOGLE_GENAI_API_KEY=your_google_ai_studio_key

# Email (Resend) - Get this from Resend.com
RESEND_API_KEY=your_resend_api_key
```

---

## 🛠️ Step-by-Step Setup

### Phase 1: Firebase Configuration (Database & Auth)
1.  **Create a Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Authentication**:
    *   Navigate to **Authentication** > **Sign-in method**.
    *   Enable **Email/Password**.
    *   Go to the **Users** tab and click **Add user** to create your admin account.
3.  **Firestore Database**:
    *   Go to **Firestore Database** and click **Create database**.
    *   Start in **Production mode**.
4.  **Get Config Keys**:
    *   Go to **Project Settings** (gear icon) > **General**.
    *   Under "Your apps", register a Web App.
    *   Copy the `firebaseConfig` values into your `.env.local`.

### Phase 2: AI & Email Features
1.  **AI Scoping**: Get a `GOOGLE_GENAI_API_KEY` from [Google AI Studio](https://aistudio.google.com/).
2.  **Email Notifications**:
    *   Sign up at [Resend](https://resend.com/).
    *   Generate an API key and add it to `RESEND_API_KEY`.

---

## ☁️ Deployment

### ⚠️ Important: Use "App Hosting", not "Hosting"
Standard **Firebase Hosting** is for static sites. Since this app uses Next.js Server Features (like Server Actions for emails), you **MUST** use **Firebase App Hosting**.

1.  **Upgrade to Blaze Plan**: Firebase App Hosting requires your project to be on the **Pay-as-you-go (Blaze) plan**. This allows Firebase to provision the server resources needed for Next.js. Most small sites stay within the free tier.
2.  **Push to GitHub**: Push your local code to a private or public GitHub repository.
3.  **Connect to Firebase**:
    *   In the Firebase Console sidebar, click **Build** > **App Hosting**.
    *   Click **Get Started** and connect your GitHub account.
    *   Select your repository and branch.
4.  **Configure Environment Variables**:
    *   During setup (or after in the App Hosting settings), add your environment variables (`GOOGLE_GENAI_API_KEY`, `RESEND_API_KEY`, etc.) so they work in production.
5.  **Finish**: Firebase will automatically detect Next.js, build your site, and deploy it. Every time you push to GitHub, it will update automatically.

---

## 🔐 Admin Panel Guide
Visit your website URL and add `/login` (e.g., `yoursite.com/login`). Use the credentials you created in Phase 1, Step 2.

---
Made with ❤️ by GetItWebbed.
