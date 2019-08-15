const path = require('path')

function validate(
  config,
  fieldName,
  defaultValue,
  missingMessage = `No ${fieldName} provided!`
) {
  if (!config[fieldName]) {
    console.warn('gatsby-theme-dev-blog: ', missingMessage)
    config[fieldName] = defaultValue
  }
}

module.exports = config => {
  validate(
    config,
    'devBlogPath',
    path.resolve('./src/pages'), // consumer
    // `${__dirname}/src/pages`, // theme
    `No  \`devBlogPath\` provided. Using ./src/pages`
  )
  // console.log('devblogpath', config.devBlogPath)
  // console.log('devblogpath', `${__dirname}/src/pages`)
  validate(
    config,
    'newsletterSubscribeUrl',
    `https://app.convertkit.com/forms/812047/subscriptions`,
    `No  \`newsletterSubscribeUrl\` provided. Try using ConvertKit!`
  )
  validate(
    config,
    'trackingId',
    `UA-YOURNUMBERHERE-1`,
    `No Google Analytics \`trackingId\` provided. Set one up!`
  )
  validate(
    config,
    'RSSFeedTitle',
    `Dev Abramov's gatsby-theme-dev-blog RSS Feed`,
    `No RSSFeedTitle provided. You may wish to customize this!`
  )
  validate(
    config,
    'BlogName',
    `gatsby-theme-dev-blog default blog name`,
    `No BlogName provided. You should customize this!`
  )
  validate(
    config,
    'BlogShortName',
    config.BlogName,
    `No BlogShortName provided. You should customize this!`
  )
  validate(
    config,
    require.resolve(`./src/assets/icon.png`),
    config.manifestIcon,
    `No manifestIcon provided. We will use the default icon but you should supply one.`
  )
  return {
    siteMetadata: {
      title: 'gatsby-theme-dev-blog',
      author: 'Dev Abramov',
      description: 'TODO: Override description in siteMetadata',
      siteUrl: 'https://gatsby-theme-dev-blog.netlify.com', // no trailing slash!
      repoUrl: 'https://github.com/sw-yx/gatsby-theme-dev-blog',
      newsletterSubscribeUrl: config.newsletterSubscribeUrl,
      social: {
        twitter: '@gatsbyjs',
        github: 'gatsbyjs',
      },
    },
    pathPrefix: '/',
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: config['devBlogPath'],
          name: 'pages',
        },
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 590,
              },
            },
            {
              resolve: `gatsby-remark-responsive-iframe`,
              options: {
                wrapperStyle: `margin-bottom: 1.0725rem`,
              },
            },
            'gatsby-remark-autolink-headers',
            {
              resolve: 'gatsby-remark-prismjs',
              options: {
                inlineCodeMarker: '÷',
              },
            },
            'gatsby-remark-copy-linked-files',
            'gatsby-remark-smartypants',
            {
              resolve: 'gatsby-remark-external-links',
              options: {
                target: '_blank',
              },
            },
          ],
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: config.trackingId,
        },
      },
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
              serialize: ({ query: { site, allMarkdownRemark } }) => {
                return allMarkdownRemark.edges.map(edge => {
                  const siteUrl = site.siteMetadata.siteUrl
                  const postText = `
                <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog. You can read it online by <a href="${siteUrl +
                  edge.node.fields.slug}">clicking here</a>.)</div>
              `

                  let html = edge.node.html
                  // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
                  html = html
                    .replace(/href="\//g, `href="${siteUrl}/`)
                    .replace(/src="\//g, `src="${siteUrl}/`)
                    .replace(/"\/static\//g, `"${siteUrl}/static/`)
                    .replace(/,\s*\/static\//g, `,${siteUrl}/static/`)

                  return Object.assign({}, edge.node.frontmatter, {
                    description: edge.node.frontmatter.spoiler,
                    date: edge.node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    custom_elements: [{ 'content:encoded': html + postText }],
                  })
                })
              },
              query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                  # filter: {fields: { langKey: {eq: "en"}}}
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      html
                      fields { 
                        slug   
                      }
                      frontmatter {
                        title
                        date
                        spoiler
                      }
                    }
                  }
                }
              }
            `,
              output: '/rss.xml',
              title: config.RSSFeedTitle,
            },
          ],
        },
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: config.BlogName,
          short_name: config.BlogShortName,
          start_url: `/`,
          background_color: `#ffffff`,
          theme_color: `#ffa7c4`,
          display: `minimal-ui`,
          icon: config.manifestIcon,
          theme_color_in_head: false,
        },
      },
      `gatsby-plugin-react-helmet`,
      {
        resolve: 'gatsby-plugin-typography',
        options: {
          pathToConfigModule: require.resolve('./src/utils/typography'),
        },
      },
      // {
      //   resolve: 'gatsby-plugin-i18n',
      //   options: {
      //     langKeyDefault: 'en',
      //     useLangKeyLayout: false,
      //   },
      // },
      `gatsby-plugin-catch-links`,
      {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: config['devBlogPath'],
        },
      },
    ],
  }
}
