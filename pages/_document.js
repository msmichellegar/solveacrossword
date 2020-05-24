import Document, { Head, Main, NextScript } from 'next/document';

const GA_TRACKING_ID = 'UA-64172720-4';

export default class MyDocument extends Document {
  render() {
    const title = 'Solve a Crossword';
    const description =
      'Find answers to crosswords and word puzzles. This crossword solver will suggest words based on letters and length.';

    const url = 'www.solveacrossword.com';

    const image = 'www.solveacrossword.com/public/meta-image.jpg';
    const imageAlt = 'An open dictionary with answers to crossword puzzles.';

    const twitterHandle = 'msmichellegar';

    const metaTags = (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={imageAlt} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image:alt" content={imageAlt} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content={twitterHandle} />
        <meta name="twitter:site" content={twitterHandle} />
        <meta name="twitter:card" content="summary_large_image" />
      </>
    );

    return (
      <html>
        <Head>
          {metaTags}
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            data-ad-client="ca-pub-6695394066787974"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
