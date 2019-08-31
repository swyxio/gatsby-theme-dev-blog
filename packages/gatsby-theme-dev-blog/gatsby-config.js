const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const dateCutoff = new Date().toISOString() // "2019-08-27T11:06:38.221Z", recognized by the graphql filter

module.exports = ({
  contentPath = 'content/writing',
  draftsPath = 'content/drafts',
  talksPath = 'content/talks',
}) => ({
  plugins: [
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.join(__dirname, 'src', 'pages'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: contentPath,
        name: 'gatsby-theme-dev-blog:contentPath', // added to hopefully increase greppability
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: talksPath,
        name: 'gatsby-theme-dev-blog:talksPath', // added to hopefully increase greppability
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: draftsPath,
        name: 'gatsby-theme-dev-blog:draftsPath', // added to hopefully increase greppability
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md', '.markdown'],
        plugins: [`gatsby-remark-images`], // bug: https://github.com/gatsbyjs/gatsby/issues/15486
        remarkPlugins: [require(`remark-slug`)],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: '#fafafa',
              maxWidth: 1035,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-social-cards`,
            // https://github.com/syntra/gatsby-remark-social-cards
            options: {
              title: {
                font: 'DejaVuSansCondensed',
                color: 'white', // black|white
                size: 48, // 16|24|32|48|64
              },
              background: '#203141', // Background color for the card
              meta: {
                parts: [
                  'swyx.io', // todo: figure out how to pull this from sitemetadata
                  ' » ',
                  { field: 'categories' },
                  ' » ',
                  { field: 'date', format: 'mmm dS yyyy' },
                ],
                color: 'white', // black|white
              },
            },
          },
          { resolve: `gatsby-remark-code-titles` },
          { resolve: `gatsby-remark-prismjs` }, // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=gatsby-remark-prismjs
          // { resolve: `gatsby-remark-numbered-footnotes` }, // Bug: definition.identifier.toUpperCase is not a function
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer',
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.date,
                  url: site.siteMetadata.siteUrl + '/' + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + '/' + edge.node.fields.slug,
                })
              })
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  filter: {
                    frontmatter: {
                      published: {ne: false}, 
                      title: {glob: "*"}  # non empty titles
                      date: {lte: "${dateCutoff}"}
                    }
                  }
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      fields { 
                        slug
                        date
                      }
                      frontmatter {
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Blog RSS Feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: require.resolve(`./src/lib/typography`),
      },
    },
    'gatsby-plugin-offline',
  ],
})
