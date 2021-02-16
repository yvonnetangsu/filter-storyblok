const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `Filter Storyblok`,
    description: `Testing`,
  },
  plugins: [
    `gatsby-plugin-anchor-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: '*', disallow: '/editor/' }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [
          `/editor/*`,
          `/editor/`,
          `/editor`,
          `/global-components/*`,
          `/global-components`,
        ],
      }
    },
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: process.env.GATSBY_STORYBLOK_ACCESS_TOKEN,
        homeSlug: 'home',
        resolveRelations: [],
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft'  // show only published on the front end site
        // version: 'draft'  // would show any including drafts
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Make a Gift`,
        start_url: `/`,
        include_favicon: false,
        crossOrigin: `use-credentials`,
        icons: [],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
