import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --primaryBlue: #172733;
    --secondaryBlue: #1f4253;
    --green: #37910c;
    --hazyWhite: #e8e6e6;
    --black: #000000;
    --red: #B61629;
    --purple: #372b43;
    --grey: #cdcbcb;

  }
  html {
    background: radial-gradient(var(--primaryBlue), var(--secondaryBlue));
    font-size: 10px;
  }

  body {
    font-size: 2rem;
  }
`;

export default GlobalStyles;
