'use client';
import { ReactNode } from 'react';
import NoSsr from 'react-no-ssr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import StyledJsxRegistry from './registry';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        {/* PWA primary color */}
        <meta name='theme-color' content={theme.palette.primary.main} />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </head>
      <body>
        <NoSsr>
          <StyledJsxRegistry>
            <ThemeProvider theme={theme}>
              {/* ThemeProvider makes the theme available down the React
                  tree thanks to React context. */}

              <CssBaseline />
              {children}
            </ThemeProvider>
          </StyledJsxRegistry>
        </NoSsr>
      </body>
    </html>
  );
}
