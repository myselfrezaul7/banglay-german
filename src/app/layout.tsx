import type { Metadata, Viewport } from 'next';
import { Inter, Poppins, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/animations/PageTransition';
import { AuthProvider } from '@/contexts/AuthContext';
import JsonLd from '@/components/seo/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});
const notoSansBengali = Noto_Sans_Bengali({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-bengali'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://banglay-german.vercel.app'),
  title: {
    default: 'Banglay German - Learn German in Bangla | A1-B2',
    template: '%s | Banglay German'
  },
  description: 'Master German (Deutsch) easily with Bangla translations. Free resources for A1, A2, B1, B2 levels including vocabulary, sentence building, and grammar.',
  keywords: ['German learning', 'Bangla to German', 'German vocabulary', 'German grammar', 'German alphabet', 'জার্মান ভাষা শিক্ষা', 'বাংলায় জার্মান'],
  authors: [{ name: 'Banglay German Team' }],
  creator: 'Banglay German',
  publisher: 'Banglay German',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://banglay-german.vercel.app',
    title: 'Banglay German - Your Gateway to Learning German',
    description: 'Learn German with Bangla explanations. Comprehensive lessons for A1-B2 levels.',
    siteName: 'Banglay German',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Banglay German Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banglay German - Learn German with Bangla',
    description: 'Master German terms and grammar with our easy-to-use platform.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    languages: {
      'en': 'https://banglay-german.vercel.app',
      'bn': 'https://banglay-german.vercel.app',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${notoSansBengali.variable} font-sans antialiased`}>
        <AuthProvider>
          <JsonLd type="Organization" />
          <JsonLd type="WebSite" />
          <Header />
          <main className="min-h-screen pt-16 md:pt-20 pb-28 md:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <div className="hidden md:block">
            <Footer />
          </div>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
