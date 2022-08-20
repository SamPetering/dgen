import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Header from '../src/components/Header';
type CustomAppProps = AppProps & {
  session: Session;
};
function MyApp({ Component, pageProps, session }: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <div className="max-w-screen-lg m-auto">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
