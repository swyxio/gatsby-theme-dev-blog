import React from 'react'

import { rhythm } from '../utils/typography'
import { StaticQuery, graphql } from 'gatsby'

const query = graphql`
  query footerSiteMetadata {
    site {
      siteMetadata {
        social {
          github
          twitter
        }
      }
    }
  }
`
class Footer extends React.Component {
  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { siteMetadata } = data.site
          return (
            <footer
              style={{
                marginTop: rhythm(2.5),
                paddingTop: rhythm(1),
              }}
            >
              <div style={{ float: 'right' }}>
                <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                  rss
                </a>
              </div>
              <a
                href={'https://twitter.com/' + siteMetadata.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                twitter
              </a>{' '}
              &bull;{' '}
              <a
                href={'https://github.com/' + siteMetadata.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
            </footer>
          )
        }}
      />
    )
  }
}

export default Footer
