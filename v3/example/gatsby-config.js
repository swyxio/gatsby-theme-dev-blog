const pathPrefix = '/' // Prefix for all links. If you deploy your site to example.com/blog your pathPrefix should be "blog"
const siteTitle = 'My dev blog title' // Navigation and Site Title
const siteUrl = 'https://your-site.io' // Domain of your site. No trailing slash!
const siteLogo = 'images/logo.png' // Used for SEO and manifest, path to your image you placed in the 'static' folder
const siteDescription = 'This is where they post things!'
module.exports = {
  pathPrefix,
  siteMetadata: {
    siteUrl: siteUrl + pathPrefix,
    title: siteTitle,
    description: siteDescription,
    keywords: ['Video Blogger'],
    canonicalUrl: siteUrl,
    twitterUrl: 'https://twitter.com/swyx/',
    twitterHandle: '@swyx',
    fbAppID: '12345',
    githubUrl: 'https://github.com/sw-yx',
    githubHandle: 'sw-yx',
    image: siteLogo,
    author: {
      name: 'swyx', // Author for schemaORGJSONLD
      minibio: `
        <strong>egghead</strong> is the premier place on the internet for 
        experienced developers to enhance their skills and stay current
        in the fast-faced field of web development.
      `,
    },
    organization: {
      name: 'swyx.io LLC',
      url: siteUrl,
      logo: siteLogo,
    },
  },
  plugins: [
    {
      resolve: `gatsby-theme-dev-blog`,
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteTitle,
        short_name: siteTitle, // or offer a shortname if you wish
        description: siteDescription,
        start_url: pathPrefix,
        background_color: '#2b2e3c', // Manifest and Progress color
        theme_color: '#5348FF', // Manifest and Progress color
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
  ],
}
