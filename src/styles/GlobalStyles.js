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
    background-color: #ffffff;
    scroll-behavior: smooth !important;
  }
  .background_primary {
    background-color: ${theme.light_beige};
  }
  
  `;

export default GlobalStyle;