import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'German Shikhi - জার্মান শিখি | Learn German with Bangla',
  description: 'Learn German easily with English explanations and Bangla translations. Vocabulary, sentences, and practice exercises from A1 to B2 levels.',
  keywords: ['German', 'learn German', 'Bangla', 'Bengali', 'A1', 'A2', 'B1', 'B2', 'vocabulary', 'জার্মান শিখি'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen pt-16 md:pt-20 pb-16 md:pb-0">{children}</main>
          <div className="hidden md:block">
            <Footer />
          </div>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
