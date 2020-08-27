import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { generateClassName } from 'theme/makeStyles'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {/* PWA primary color */}
          {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}

          <link rel="icon" href="/yar2048/favicon.ico" />
          <link
            rel="apple-touch-icon"
            href="/yar2048/yar2048logo-apple-152.png"
          />
          <link rel="manifest" href="/yar2048/manifest.json" />
        </Head>
        <body>
          <noscript>
            <h2>Javascript is disabled</h2>
            <p>
              You need to enable JavaScript to run this app. Here are the{' '}
              <a
                href="https://www.enable-javascript.com/"
                target="_blank"
                rel="noopener noreferrer">
                instructions how to enable JavaScript in your web browser
              </a>
              .
            </p>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  console.log(generateClassName)
  const sheets = new ServerStyleSheets({
    serverGenerateClassName: generateClassName,
  })
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  }
}
