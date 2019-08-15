import React from "react";
import { graphql } from "gatsby";
import Layout from "gatsby-theme-blog/src/components/layout";

export default ({ data, location }) => (
  <Layout location={location} title={data.site.siteMetadata.title}>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
