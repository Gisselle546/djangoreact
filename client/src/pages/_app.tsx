import { GlobalStyle } from '..//styles/GlobalStyle'
import { lightTheme } from '@/styles/theme'
import { Provider } from 'react-redux';
import store from '../redux/store';
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { CartProvider } from '@/context/cart';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return(
      <>
        <ThemeProvider theme={lightTheme}>
          <CartProvider>
            <Provider store={store}>
              <GlobalStyle/>
              <ToastContainer />
              <Component {...pageProps} />
            </Provider>
          </CartProvider>
        </ThemeProvider>
      </>
    )
}
