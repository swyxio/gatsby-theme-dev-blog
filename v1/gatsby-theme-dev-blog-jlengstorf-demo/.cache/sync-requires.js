const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---node-modules-gatsby-theme-dev-blog-src-templates-blog-index-js": hot(preferDefault(require("/Users/swyx/Work/gatsby-theme-dev-blog/gatsby-theme-dev-blog-jlengstorf-demo/node_modules/gatsby-theme-dev-blog/src/templates/blog-index.js"))),
  "component---node-modules-gatsby-theme-dev-blog-src-templates-blog-post-js": hot(preferDefault(require("/Users/swyx/Work/gatsby-theme-dev-blog/gatsby-theme-dev-blog-jlengstorf-demo/node_modules/gatsby-theme-dev-blog/src/templates/blog-post.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/swyx/Work/gatsby-theme-dev-blog/gatsby-theme-dev-blog-jlengstorf-demo/.cache/dev-404-page.js")))
}

