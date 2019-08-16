import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { useTheme } from '../components/Theming'
import { Hero } from '../components/Hero'
import Container from '../components/Container'
import { rhythm } from '../lib/typography'

const Description = styled.p`
  margin-bottom: 10px;
  display: inline-block;
`

export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme()
  return (
    <Layout site={site}>
      <Hero />
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        {allMdx.edges
          .filter(({ node }) =>
            [
              'gatsby-theme-dev-blog:contentPath',
              'gatsby-theme-dev-blog:talksPath',
              'gatsby-theme-dev-blog:draftsPath',
            ].includes(node.parent.sourceInstanceName),
          )
          .map(({ node }) => {
            if (
              node.parent.sourceInstanceName ===
              'gatsby-theme-dev-blog:talksPath'
            ) {
              return <Talk post={node} key={node.id} theme={theme} />
            } else {
              return <Article post={node} key={node.id} theme={theme} />
            }
          })}

        <hr />
        <div
          style={{
            // borderTop: '1px solid gray',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/writing" aria-label="Visit blog page">
            View all articles
          </Link>
          <Link to="/talks" aria-label="Visit talk page">
            View all talks
          </Link>
        </div>
        <hr />
      </Container>
    </Layout>
  )
}

function Talk({ post, theme }) {
  const talklink = 'talks/' + post.frontmatter.slug
  return (
    <div
      css={css`
        margin-bottom: 40px;
      `}
    >
      <h2
        css={css({
          marginBottom: rhythm(0.3),
          transition: 'all 150ms ease',
          color: theme.colors.primary,
          // ':hover': {
          //   color: theme.colors.text,
          // },
        })}
      >
        📺{' '}
        <Link to={talklink} aria-label={`View ${post.frontmatter.title}`}>
          {post.frontmatter.title}
        </Link>
      </h2>
      <Description>
        {post.excerpt}{' '}
        <Link to={talklink} aria-label={`View ${post.frontmatter.title}`}>
          Watch Talk →
        </Link>
      </Description>
    </div>
  )
}
function Article({ post, theme }) {
  return (
    <div
      css={css`
        margin-bottom: 40px;
      `}
    >
      <h2
        css={css({
          marginBottom: rhythm(0.3),
          transition: 'all 150ms ease',
          ':hover': {
            color: theme.colors.primary,
          },
        })}
      >
        ✍️{' '}
        <Link
          to={post.frontmatter.slug}
          aria-label={`View ${post.frontmatter.title}`}
        >
          {post.frontmatter.title}
        </Link>
      </h2>
      <Description>
        {post.excerpt}{' '}
        <Link
          to={post.frontmatter.slug}
          aria-label={`View ${post.frontmatter.title}`}
        >
          Read Article →
        </Link>
      </Description>
    </div>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 8
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
