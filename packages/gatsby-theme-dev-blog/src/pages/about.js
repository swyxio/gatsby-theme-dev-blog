import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'

export default ({ data: { site } }) => {
  const {
    siteMetadata: { author },
  } = site
  return (
    <Layout site={site} noFooter>
      <Container>
        <h1>About {author.name}</h1>
        <p dangerouslySetInnerHTML={{ __html: author.minibio }}></p>
        <hr />
        <p>
          Note to developer: This page is meant to be ejected with `gatsby-theme
          eject`
        </p>
      </Container>
    </Layout>
  )
}
export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        author {
          minibio
        }
      }
    }
  }
`
