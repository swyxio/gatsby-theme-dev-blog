## notes to self on why i abndoned GTDB v2

i tried to make GTDB a child theme of GTB but it was such a bad eject experience that i felt i should go back to the straight fork of GTB.

\https://github.com/sw-yx/gatsby-theme-dev-blog-abandoned

---

<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Starter for creating child themes for gatsby-theme-blog
</h1>

## Getting started

1. Create the repo locally

`gatsby new gatsby-theme-NAME KyleAMathews/gatsby-starter-blog-child-theme`

2. Run yarn to setup workspace

`yarn`

3. Run the starter and start developing on the theme!

`yarn workspace starter gatsby develop`

Try changing colors at `gatsby-theme-*/src/gatsby-plugin-theme-ui/colors.js` and typography options at `gatsby-theme-*/src/gatsby-plugin-theme-ui/typography.js`

## Publishing theme

1. If you haven't already done so, rename folders and strings from gatsby-theme-RENAME_ME to the name of your theme
2. In your terminal, navigate to the directory for the theme
3. `yarn publish`
