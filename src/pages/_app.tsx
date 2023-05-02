import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../../themes'
import { SWRConfig } from 'swr';
import { UiProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        //lo pongo aca para que sea global y no tener que ponerlo en cada pagina
        fetcher: (url: string) => fetch(url).then((res) => res.json())
      }}
    >
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>

    </SWRConfig>


  )
}
