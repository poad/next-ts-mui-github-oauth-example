import { ReactNode } from 'react';
import NoSsr from 'react-no-ssr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import StyledJsxRegistry from './registry';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content={theme.palette.primary.main} />
      </head>
      <body>
        <NoSsr>
          <StyledJsxRegistry>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </StyledJsxRegistry>
        </NoSsr>
      </body>
    </html>
  );
}
