const path = require("path")
module.exports = {
  siteMetadata: {
    title: `Gatsby Theme Dev Blog Demo`,
    author: `@swyx`,
    description: `Write your dev blog with no graphql!`,
    siteUrl: "https://gatsby-theme-dev-blog.netlify.com", // no trailing slash!
    repoUrl: "https://github.com/sw-yx/gatsby-theme-dev-blog-demo",
    social: {
      twitter: "@swyx",
    },
  },
  __experimentalThemes: [
    {
      resolve: "gatsby-theme-dev-blog",
      options: {
        trackingId: "UA-YOURNUMBERHERE-1",
        RSSFeedTitle: `gatsby-theme-dev-blog RSS Feed`,
        BlogName: `gatsby-theme-dev-blog demo - a Demo of Gatsby Themes`,
        BlogShortName: `gatsby-theme-dev-blog Demo`,
        manifestIcon: path.resolve("./src/assets/sun.png"),
        newsletterSubscribeUrl: "https://www.netlify.com",
      },
    },
  ],
}
