import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="100x100"
            href="https://user-images.githubusercontent.com/79133602/184347140-49f7d858-89a9-41de-aa39-c78f26332b97.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="맛이 어때" />
          <meta
            property="og:image"
            content="https://user-images.githubusercontent.com/79133602/184341912-1625fb09-1af2-41a0-b16e-6a2f76db30ef.svg"
          />
          <meta
            property="og:description"
            content="커스텀메뉴 정보를 공유하는 SNS"
          />
          <meta property="og:site_name" content="맛이 어때" />
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
