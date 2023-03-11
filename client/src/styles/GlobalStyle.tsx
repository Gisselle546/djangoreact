import { createGlobalStyle, css } from 'styled-components'
import { breakpoints } from './breakpoints'
import { resetCSS } from './CSSReset'

export const GlobalStyle = createGlobalStyle(
    ({ theme: { color } }) => css`
    ${resetCSS}
    * {
    transition: all 250ms ease-in;
    transition-property: background, color, border;
    }
    body {
        margin: 0;
        background: ${color.screenBackground};
        font-family: 'Montserrat', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
  
      * {
        box-sizing: border-box;
        color: #2c2c2c;
      }
  
    
    `
    )