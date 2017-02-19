import React from 'react'
import { TypographyStyle } from 'react-typography'
import Helmet from 'react-helmet'

import typography from './utils/typography'

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!./public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

module.exports = React.createClass({
  render () {
    const head = Helmet.rewind()
    let css
    if (process.env.NODE_ENV === `production`) {
      css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }} />
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {this.props.headComponents}
          <meta name="theme-color" content="#48a896" />
          <link rel="manifest" href="/manifest.json" />
          <TypographyStyle typography={typography} />
          {css}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
        </head>
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
          <script
            dangerouslySetInnerHTML={{ __html: `
              if ('serviceWorker' in navigator) {
                // Delay registration until after the page has loaded, to ensure that
                // our precaching requests don't degrade the first visit experience.
                // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                })
              }
            `,
            }}
          />
        </body>
      </html>
    )
  },
})
