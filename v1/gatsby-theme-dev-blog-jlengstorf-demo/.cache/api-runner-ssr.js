var plugins = [{
      plugin: require('/Users/swyx/Work/gatsby-theme-dev-blog/gatsby-theme-dev-blog-jlengstorf-demo/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/swyx/Work/gatsby-theme-dev-blog/gatsby-theme-dev-blog-jlengstorf-demo/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-YOURNUMBERHERE-1"},
    },{
      plugin: require('/Users/swyx/Work/gatsby-theme-dev-blog/gatsby-theme-dev-blog-jlengstorf-demo/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n          {\n            site {\n              siteMetadata {\n                title\n                description\n                siteUrl\n                site_url: siteUrl\n              }\n            }\n          }\n        ","feeds":[{"query":"\n              {\n                allMarkdownRemark(\n                  limit: 1000,\n                  sort: { order: DESC, fields: [frontmatter___date] }\n                  # filter: {fields: { langKey: {eq: \"en\"}}}\n                ) {\n                  edges {\n                    node {\n                      excerpt(pruneLength: 250)\n                      html\n                      fields { \n                        slug   \n                      }\n                      frontmatter {\n                        title\n                        date\n                        spoiler\n                      }\n                    }\n                  }\n                }\n              }\n            ","output":"/rss.xml","title":"gatsby-theme-dev-blog RSS Feed"}]},
    },{
      plugin: require('/Users/swyx/Work/gatsby-theme-dev-blog/gatsby-theme-dev-blog-jlengstorf-demo/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"gatsby-theme-dev-blog demo - a Demo of Gatsby Themes","short_name":"gatsby-theme-dev-blog Demo","start_url":"/","background_color":"#ffffff","theme_color":"#ffa7c4","display":"minimal-ui","theme_color_in_head":false},
    },{
      plugin: require('/Users/swyx/Work/gatsby-theme-dev-blog/gatsby-theme-dev-blog-jlengstorf-demo/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/swyx/Work/gatsby-theme-dev-blog/gatsby-theme-dev-blog-jlengstorf-demo/node_modules/gatsby-plugin-typography/gatsby-ssr'),
      options: {"plugins":[],"pathToConfigModule":"/Users/swyx/Work/gatsby-theme-dev-blog/gatsby-theme-dev-blog-jlengstorf-demo/node_modules/gatsby-theme-dev-blog/src/utils/typography.js"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
