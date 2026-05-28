
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

### 4. Running the Project
```bash
npm run dev
```
Open [http://localhost:9002](http://localhost:9002) to see your site.

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
    *   Start in **Production mode** (Security Rules are handled automatically by Firebase Studio deployment).
4.  **Get Config Keys**:
    *   Go to **Project Settings** (gear icon) > **General**.
    *   Under "Your apps", click the `</>` icon to register a Web App.
    *   Copy the `firebaseConfig` values into your `.env.local`.

### Phase 2: AI & Email Features
1.  **AI Scoping**: Get a `GOOGLE_GENAI_API_KEY` from [Google AI Studio](https://aistudio.google.com/). This powers the AI recommendation feature in the enquiry form.
2.  **Email Notifications**:
    *   Sign up at [Resend](https://resend.com/).
    *   Generate an API key and add it to `RESEND_API_KEY`.
    *   *Note*: On the free tier, emails are sent to the address you signed up with.

---

## ☁️ Deployment

### Deploying to Firebase App Hosting (Recommended)
This project is optimized for Firebase App Hosting, which provides seamless Next.js 15 support.

1.  **Push to GitHub**: Push your code to a GitHub repository.
2.  **Connect to Firebase**:
    *   In the Firebase Console, go to **App Hosting**.
    *   Click **Get Started** and connect your GitHub account.
    *   Select your repository and branch.
3.  **Configure Environment Variables**:
    *   In the App Hosting setup, you can add your environment variables (`GOOGLE_GENAI_API_KEY`, etc.) so they are available in production.
4.  **Finish**: Firebase will automatically build and deploy your site on every push to your branch.

---

## 🔐 Admin Panel Guide

### How to access?
Visit your website URL and add `/login` (e.g., `yoursite.com/login`). There is also a link in the website footer.

### Managing Content
Once logged in, use the tabs to manage:
- **Enquiries**: View all client submissions and project details.
- **Projects**: Add/Delete items from your featured portfolio.
- **About Team**: Update the team section images, roles, and social links.
- **Brands**: Manage the "Trusted By" scrolling marquee.

---
Made with ❤️ by GetItWebbed.
