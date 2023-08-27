import { ReactNode } from 'react';
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
      <body>
        <StyledJsxRegistry>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
