import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    
    /* font-family: Roboto Regular !important; */
    font-family: Montserrat;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100vh;
    margin: 0;
    background-color: ${theme.backgroundColor};
    scroll-behavior: smooth !important;
  }
  `;

export default GlobalStyle;