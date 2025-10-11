import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rohit Kumar - Data Scientist | AI & Machine Learning Architect',
  description: 'I design and build intelligent systems that solve complex problems, turning data into actionable insights.',
  keywords: 'Data Scientist, AI, Machine Learning, Python, SQL, Deep Learning, NLP, Transformers',
  authors: [{ name: 'Rohit Kumar' }],
  creator: 'Rohit Kumar',
  openGraph: {
    title: 'Rohit Kumar - Data Scientist',
    description: 'Data Scientist | AI & Machine Learning Architect',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohit Kumar - Data Scientist',
    description: 'Data Scientist | AI & Machine Learning Architect',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}