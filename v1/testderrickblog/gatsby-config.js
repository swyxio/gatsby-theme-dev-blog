// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `The behind-the-scenes journey of an indie hacker`,
    description: `a clone of derrickreimer.com with gatsby-theme-dev-blog`,
    author: `@swyx`,
    siteUrl: "https://derrickreimer.com",
    social: {
      twitter: "@swyx"
    }
  },
  __experimentalThemes: [
    {
      resolve: "gatsby-theme-dev-blog",
      options: {
        devBlogPath: require("path").resolve("./src/content"),
        trackingId: "UA-YOURNUMBERHERE-1",
        RSSFeedTitle: `gatsby-theme-dev-blog RSS Feed`,
        BlogName: `gatsby-theme-dev-blog demo - a Demo of Gatsby Themes`,
        BlogShortName: `gatsby-theme-dev-blog Demo`,
        // manifestIcon: require("path").resolve("./src/assets/sun.png"),
        newsletterSubscribeUrl: "https://www.netlify.com"
      }
    }
  ]
}
