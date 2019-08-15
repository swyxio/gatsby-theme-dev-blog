const path = require('path')

module.exports = (options) => {
  const contentpath = path.join(__dirname, 'content/assets')
  return {
    plugins: [
      // gatsby-theme-blog forces people to have an avatar and fails nastily on childImageSharp if you dont provide one.
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentpath,
          name: contentpath,
        },
      },
      {
        resolve: `gatsby-theme-blog`,
        // Take all options and pass them to gatsby-theme-blog
        options,
      },
    ],
  }
}
