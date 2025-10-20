import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import '@radix-ui/themes/styles.css';
import Navbar from './components/Navbar/Navbar';

import './app.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import Footer from './components/Footer';
import { Toaster } from 'sonner';
import { refreshToken } from './api/users';
import { useEffect } from 'react';
import useUserStore from './store/user';
import type { User } from 'type';
import axios from 'axios';

const queryClient = new QueryClient();

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Shop-Emirates' },
    {
      name: 'description',
      content:
        'Shop Emirates is your one-stop online destination for everything you love — from the latest tech and fashion to everyday essentials. Proudly based in the UAE, we combine local convenience with global quality, offering fast delivery across all Emirates and secure shopping you can trust.',
    },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <div className='flex flex-col min-h-screen'>
            <Theme>
              <Navbar />
              {children}
              <Footer />
            </Theme>
          </div>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}

export default function App() {
  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  useEffect(() => {
    const refreshInvalidToken = async () => {
      try {
        const data = await refreshToken();
        setUser(data.user);
        setAccessToken(data.accessToken);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.log(error);
        }
      }
    };
    refreshInvalidToken();
  }, []);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
