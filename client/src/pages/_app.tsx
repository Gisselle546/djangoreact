import { GlobalStyle } from '..//styles/GlobalStyle'
import { lightTheme } from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

export default function App({ Component, pageProps }: AppProps) {
  return(
      <>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle/>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
}
