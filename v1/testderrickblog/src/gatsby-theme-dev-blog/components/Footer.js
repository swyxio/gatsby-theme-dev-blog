import React from "react"

import { rhythm } from "gatsby-theme-dev-blog/src/utils/typography"
import { StaticQuery, graphql } from "gatsby"

const query = graphql`
  query footerSiteMetadata2 {
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
        render={(data) => {
          const { siteMetadata } = data.site
          return (
            <>
              <h2 class="pb-3 text-2xl text-gray-200 font-headline font-normal">Get in touch</h2>
              <p class="markdown pb-6">
                Follow me on <a href="https://twitter.com/derrickreimer">Twitter</a> or email me at derrick [at]
                derrickreimer.com.
              </p>
              <p class="pt-12 pb-6 text-sm text-gray-600">
                Subscribe{" "}
                <a class="text-teal-400 font-bold border-b-2 border-teal-700" href="/feed.xml">
                  via RSS
                </a>
              </p>
              {/* <footer
                style={{
                  marginTop: rhythm(2.5),
                  paddingTop: rhythm(1)
                }}
              >
                <div style={{ float: "right" }}>
                  <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                    rss
                  </a>
                </div>
                <a
                  href={"https://twitter.com/" + siteMetadata.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  twitter
                </a>{" "}
                &bull;{" "}
                <a href={"https://github.com/" + siteMetadata.social.github} target="_blank" rel="noopener noreferrer">
                  github
                </a>
              </footer> */}
            </>
          )
        }}
      />
    )
  }
}

export default Footer
