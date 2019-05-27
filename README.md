# Gatsby Theme Dev Blog

this is a Gatsby Theme made from https://github.com/gaearon/overreacted.io. You can see a demo at https://github.com/sw-yx/gatsby-theme-dev-blog

## Install instructions

```bash
yarn add gatsby react react-dom gatsby-theme-dev-blog
```

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Gatsby Theme Dev Blog`,
    description: `Write your dev blog with no graphql!`,
    author: `@swyx`,
    siteUrl: 'https://overreacted.io',
    social: {
      twitter: '@swyx',
    },
  },
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-dev-blog',
      // // example options below
      // options: {
      //   gatsbyPluginPageCreatorPath: require('path').join(__dirname, 'src/content'),
      //   trackingId: "UA-YOURNUMBERHERE-1",
      //   RSSFeedTitle: `gatsby-theme-dev-blog RSS Feed`,
      //   BlogName: `gatsby-theme-dev-blog demo - a Demo of Gatsby Themes`,
      //   BlogShortName: `gatsby-theme-dev-blog Demo`,
      //   manifestIcon: require('path').resolve("./src/assets/sun.png"),
      //   newsletterSubscribeUrl: "https://www.netlify.com",
      // },
    },
  ],
}
```

To blog, make a new folder in `src/pages` with your blog title, and blog under `index.md` with photos colocated. The front matter should look like:

```md
---
title: Hello world
date: '2019-02-02'
spoiler: hello this is a dev blog
---

foo bar
```

## WARNINGS

> ⚠️This is a very rough alpha just to test out gatsby themes

Known untested/probable problems:

- anything to do with i18n
- safely handling cases if no pages are detected
- options for customization being passed into the theme vs siteConfig
- including components/shorttags in mdx
- component shadowing custom layouts

Want to do:

- option to include netlify cms
