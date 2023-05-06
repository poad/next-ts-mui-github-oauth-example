import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NoSsr from 'react-no-ssr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* ThemeProvider makes the theme available down the React
              tree thanks to React context. */}

        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </NoSsr>
  );
}
