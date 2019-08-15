import { Link, graphql } from "gatsby"
import { formatPostDate, formatReadingTime } from "gatsby-theme-dev-blog/src/utils/helpers"

import Bio from "gatsby-theme-dev-blog/src/components/Bio"
import Footer from "gatsby-theme-dev-blog/src/components/Footer"
import Layout from "gatsby-theme-dev-blog/src/components/Layout"
// import Panel from 'gatsby-theme-dev-blog/src/components/Panel'
import React from "react"
import SEO from "gatsby-theme-dev-blog/src/components/SEO"
import get from "lodash/get"
import { rhythm } from "gatsby-theme-dev-blog/src/utils/typography"
import "../utils/override"
class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const langKey = this.props.pageContext.langKey || "en"

    const posts = get(this, "props.data.allMarkdownRemark.edges")

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <aside>
          <Bio />
        </aside>
        <main>
          <h2 class="pb-6 text-2xl text-gray-200 font-headline font-normal">Writing</h2>
          <ul class="pb-3">
            {posts.map(({ node }) => {
              const title = get(node, "frontmatter.title") || node.fields.slug
              return (
                <li class="pb-2" key={node.fields.slug}>
                  <h3 class="pb-px">
                    <Link
                      class="text-teal-400 font-bold border-b-2 border-teal-700"
                      to={node.fields.slug}
                      rel="bookmark"
                    >
                      {title}
                    </Link>
                  </h3>
                  <p class="pb-3">
                    <div dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }} />
                  </p>
                </li>
              )
            })}
          </ul>
        </main>
        <Footer />
      </Layout>
    )
  }
}

export default BlogIndexTemplate

export const pageQuery = graphql`
  # query($langKey: String!) {
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      # filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            # langKey
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
          }
        }
      }
    }
  }
`
