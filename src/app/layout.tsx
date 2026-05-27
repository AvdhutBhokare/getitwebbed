import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export const metadata: Metadata = {
  title: 'GetItWebbed | Premium Tech Service Agency',
  description: 'Building Digital. Delivering Impact. Specialized in Web Development, App Development, and IoT Projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden bg-grain">
        <LoadingScreen />
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
