import path from 'path'
import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import SchemaOrg from './SchemaOrg'

const SEO = ({ postData, frontmatter = {}, url, isBlogPost }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            canonicalUrl
            image
            twitterUrl
            fbAppID
            author {
              name
            }
            organization {
              name
              url
              logo
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata } }) => {
      const postMeta =
        frontmatter || postData.childMarkdownRemark.frontmatter || {}
      const title = isBlogPost ? postMeta.title : siteMetadata.siteTitle
      const description = postMeta.description || siteMetadata.description
      const image = url ? url + '/twitter-card.jpg' : siteMetadata.image
      // const url = postMeta.slug
      //   ? `${siteMetadata.canonicalUrl}${path.sep}${postMeta.slug}`
      //   : siteMetadata.canonicalUrl
      const datePublished = isBlogPost ? postMeta.datePublished : false

      return (
        <React.Fragment>
          <Helmet>
            {/* General tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="image" content={image} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {/* https://ogp.me/#types TODO: implement more types */}
            {isBlogPost ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="fb:app_id" content={siteMetadata.fbAppID} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={siteMetadata.twitterUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
          </Helmet>
          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={title}
            image={image}
            description={description}
            datePublished={datePublished}
            canonicalUrl={siteMetadata.canonicalUrl}
            author={siteMetadata.author}
            organization={siteMetadata.organization}
            defaultTitle={siteMetadata.title}
          />
        </React.Fragment>
      )
    }}
  />
)

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any,
    }),
  }),
  postImage: PropTypes.string,
}

SEO.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  postImage: null,
}

export default SEO
