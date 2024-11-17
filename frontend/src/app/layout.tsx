import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import theme from './theme';
import StyledJsxRegistry from './registry';
import './layout.css';
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
              <AppRouterCacheProvider>
                {children}
              </AppRouterCacheProvider>
          </ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
