import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'AgileBuddhi - AI-Powered Enterprise SaaS',
  description: 'Next-generation enterprise management platform with AI at every layer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface-void text-white antialiased">
        {children}
      </body>
    </html>
  );
}
