import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="favicon.png" type="image/png" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <header>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/matheus-sunderhus/"
            >
              Matheus Sunderhus{' '}
              <img src="/icons/linkedin.svg" alt="linkedin logo" />
            </a>
          </header>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
