import { GlobalStyle } from '..//styles/GlobalStyle'
import { lightTheme } from '@/styles/theme'
import { Provider } from 'react-redux';
import store from '../redux/store';
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

export default function App({ Component, pageProps }: AppProps) {
  return(
      <>
        <ThemeProvider theme={lightTheme}>
          <Provider store={store}>
            <GlobalStyle/>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </>
    )
}
