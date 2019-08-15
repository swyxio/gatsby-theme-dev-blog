---
title: Cloning Lengstorf.com
date: "2019-07-01"
spoiler: what if the blog index is not the main page?
---

https://lengstorf.com is a very impressive gatsby blog with its own theme: https://github.com/jlengstorf/gatsby-theme-jason-blog

my task here is to make _this_ theme focus on just being a very good drop in blog theme. the rest can come separately.

this means i need to be able to configure the blog index sits.

i would also like to steal the remark plugins he has since they are all very handy.

## Setting up from an empty folder

```bash
yarn init -y
yarn add gatsby gatsby-theme-dev-blog react react-dom
touch gatsby-config.js
mkdir -p src/content src/components src/gatsby-theme-dev-blog
for i in {1..3}; do echo ---\\ntitle: test post ${i}\\ndate: "2019-02-0${i}"\\nspoiler: short spoiler ${i}\\n---\\n\\n lorem ipsum ${i} > src/content/post${i}.md; done
```

and file:

```js:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `The behind-the-scenes journey of an indie hacker`,
    description: `a clone of derrickreimer.com with gatsby-theme-dev-blog`,
    author: `@swyx`,
    siteUrl: "https://derrickreimer.com",
    social: {
      twitter: "@swyx",
    },
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
        newsletterSubscribeUrl: "https://www.netlify.com",
      },
    },
  ],
}
```

and add a new script to `package.json`: `"scripts": { "start": "gatsby develop" }`
