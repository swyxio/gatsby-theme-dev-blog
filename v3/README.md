# egghead.io creator MDX Blog Theme Project

This is based on Robin Wieruch's https://github.com/rwieruch/gatsby-mdx-blog-starter-project

Lots of nice pieces are also borrowed from Jason Lengstorf https://github.com/jlengstorf/lengstorf.com

A project in [Gatsby.js](https://www.gatsbyjs.org/) themes with [MDX](https://github.com/mdx-js/mdx).

## Features

- MDX: JavaScript/React in Markdown
- Prism.js: Syntax Highlighting
- Pagination
- Emotion
- Typography.js
- Self-hosted fonts ([Inter UI](https://rsms.me/inter/))
- Social media share buttons
- Site & Theme config files
- ConvertKit subscribe form (Formik and Yup)
- Placeholder illustrations by [Katerina Limpitsouni](https://twitter.com/ninalimpi) from [undraw.co](https://undraw.co/)

## Getting Started

This guide will take you through how to set up a blog with this theme.

### Step 1: Installation

```bash
# make your site folder
mkdir your-site && cd your-site

# init a new package.json
yarn init

# add dependencies
yarn add -D react react-dom gatsby @eggheadio/gatsby-theme-egghead-blog

touch gatsby-config.js
```

```js
// add the theme to your gatsby config
module.exports = {
  plugins: [`@eggheadio/gatsby-theme-egghead-blog`],
}
```

We will walk through the `siteMetadata` this theme expects and how to change the default path to your blog posts.

### Step 2: Folder Structure

This is the default folder structure that we recommend:

```
your-site/
├── README.md
├── config
│   └── website.js
├── content
│   └── posts
│       ├── demo01
│       │   ├── HelloWorld.js
│       │   ├── banner.png
│       │   └── index.mdx
│       ├── demo02
│       └── frontmatter-placeholder
│           ├── images
│           │   └── banner.jpg
│           └── index.md
├── gatsby-config.js
├── node_modules
├── package.json
```

### Step 3: Adding Frontmatter Placeholder

Frontmatter is the block in a markdown file denoted by surrounding hyphens: `---`.

We need to supply MDX placeholder frontmatter so that our queries wont break. Inside of your `content/blog` folder, you can add a folder called `frontmatter-placeholder`.

```bash
# navigate to where you blog posts live
cd content/blog
# make a placeholder folder
mkdir frontmatter-placeholder && cd frontmatter-placeholder
# add an index file and an images directory.
touch index.md
mkdir images
```

Add this content to the `index.md` file:

```markdown
---
slug: invisible-post
date: 2019-01-01
title: 'this post is a ghost'
description: 'this post has all of the right fields'
categories: ['test']
keywords: ['test']
banner: './images/banner.jpg'
published: false
redirects:
  - '/invisible-post-423123'
---

This exists to populate GraphQL fields and avoid null errors. It should contain all of the available frontmatter.
```

Then add [this image](./example/content/posts/frontmatter-placeholder/images/banner.jpg) (or any other image) to the images folder inside of `content/blog/frontmatter-placeholder/images`.

### Step 4: Configuring siteMetadata

In order for this theme to function properly, these fields need to be inside of `siteMetadata` in you `gatsby-config.js`.

```js
const config = require('./config/website')
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    title: config.siteTitle,
    description: config.siteDescription,
    keywords: ['Video Blogger'],
    canonicalUrl: config.siteUrl,
    twitterUrl: config.twitterUrl,
    twitterHandle: config.twitterHandle,
    fbAppID: config.fbAppID,
    githubUrl: config.githubUrl,
    githubHandle: config.githubHandle,
    image: config.siteLogo,
    author: {
      name: config.author,
      minibio: `
        <strong>egghead</strong> is the premier place on the internet for 
        experienced developers to enhance their skills and stay current
        in the fast-faced field of web development.
      `,
    },
    organization: {
      name: config.organization,
      url: config.siteUrl,
      logo: config.siteLogo,
    },
  },
  plugins: [
    {
      resolve: `gatsby-theme-egghead-blog`,
      options: {},
    },
  ],
}
```

## Override theme components (Component Shadowing)

To override a theme component you will need to add `starter/src/gatsby-theme-egghead-blog`. You may override anything in the `gatsby-theme-egghead-blog/src` directory.

For example, if you would like to override the default `Header` component. You would a file like this.

```js
// starter/src/gatsby-theme-egghead-blog/Header.js
import React from 'react'

class Header extends React.Component {
  render() {
    return <div>hello egghead</div>
  }
}

export default Header
```

Now "hello egghead" will be rendered anywhere the old Header component was render.
