
# GetItWebbed Agency Starter

This is a premium Next.js starter for **GetItWebbed**, a technical service agency specializing in Brand Establishment, Web/App Development, and IoT solutions.

## Getting Started

To run this project on your local system after downloading:

### 1. Prerequisites
- Node.js 18.x or later
- npm or yarn

### 2. Installation
Install the project dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Firebase, Google AI, and Resend API keys.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

GOOGLE_GENAI_API_KEY=your_google_ai_key

RESEND_API_KEY=your_resend_api_key
```

### 4. Admin Setup (Authentication)
Before you can log in to the `/adminpanel`, you must configure your Firebase project:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Authentication** > **Sign-in method**.
3. **CRITICAL**: Click "Add new provider" and enable **Email/Password**.
4. Go to the **Users** tab and click **Add user** to create your admin login credentials.

### 5. Email Notifications (Resend)
To receive email notifications for new enquiries:
1. Sign up at [Resend](https://resend.com/).
2. Get your API key and add it to `RESEND_API_KEY` in `.env.local`.
3. In the free tier, you can only send emails to the email address you signed up with.

### 6. Troubleshooting Login Issues
If you see "Invalid API Key" or "Configuration Not Found":
- Double check that you enabled **Email/Password** provider.
- Ensure your `.env.local` has `NEXT_PUBLIC_FIREBASE_API_KEY` correctly set.
- Make sure you are using the credentials of the user you created in the **Users** tab.

### 7. Running the Project
Start the development server:
```bash
npm run dev
```
Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Project Structure
- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components and section layouts.
- `src/ai`: Genkit flows and AI prompt definitions.
- `src/lib`: Utility functions and placeholder data.

## Deployment
This project is configured for **Firebase App Hosting**. You can deploy it by connecting your GitHub repository to the Firebase Console.

---
Made with ❤️ by GetItWebbed.
