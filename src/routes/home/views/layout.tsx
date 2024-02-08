import { jsxRenderer } from 'hono/jsx-renderer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const layout = jsxRenderer(
  ({ children, title }) => {
    return (
      <html lang="en">
        <head>
          <link href="/static/_tailwind.css" rel="stylesheet" />
          <title>{title || 'Hyper Task'}</title>
        </head>
        <body class="flex flex-col h-screen">
          <Header />
          <main class="py-8 sm:py-12">{children}</main>
          <Footer />
        </body>
      </html>
    );
  },
  {
    docType: true,
  }
);
