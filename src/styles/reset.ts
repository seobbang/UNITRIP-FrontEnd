import { css } from '@emotion/react';

export const reset = css`
  * {
    padding: 0;
    margin: 0;

    font: inherit;
    color: inherit;
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  :root {
    line-height: 1.5;

    cursor: default;
    -webkit-tap-highlight-color: transparent;
    text-size-adjust: 100%;
    overflow-wrap: break-word;
    tab-size: 4;
  }

  html {
    font-size: 62.5%;
  }

  html,
  body {
    min-width: 100vw;
    min-height: 100%;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  button {
    border: 0;

    background: none;

    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
