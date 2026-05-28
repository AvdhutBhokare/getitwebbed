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
Create a `.env.local` file in the root directory and add your Firebase and Google AI API keys. 

### 4. Admin Setup (Authentication)
Before you can log in to the `/adminpanel`, you must create an admin user:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Authentication** > **Sign-in method**.
3. Enable **Email/Password**.
4. Go to the **Users** tab and click **Add user** to create your login credentials.

### 5. Running the Project
Start the development server:
```bash
npm run dev
```
Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deployment to GitHub

To push this project to your repository at `https://github.com/ManasGarge22/getitwebbed/`, follow these steps in your terminal:

1. **Initialize Git** (if not already initialized):
   ```bash
   git init
   ```

2. **Add the remote origin**:
   ```bash
   git remote add origin https://github.com/ManasGarge22/getitwebbed.git
   ```

3. **Stage and commit your files**:
   ```bash
   git add .
   git commit -m "Initial commit from GetItWebbed Starter"
   ```

4. **Push to the main branch**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Project Structure
- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components and section layouts.
- `src/ai`: Genkit flows and AI prompt definitions.
- `src/lib`: Utility functions and placeholder data.

## Deployment
This project is configured for **Firebase App Hosting**. You can deploy it by connecting your GitHub repository to the Firebase Console.

---
Made with ❤️ by GetItWebbed.
