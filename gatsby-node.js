const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const storyblokEntry = path.resolve('src/templates/blog-entry.js')

    resolve(
      graphql(
        `{
          stories: allStoryblokEntry {
            edges {
              node {
                id
                name
                created_at
                uuid
                slug
                field_component
                full_slug
                content
              }
            }
          }
        }`
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const entries = result.data.stories.edges

        entries.forEach((entry, index) => {
          let slug = `${entry.node.full_slug}`
          slug = slug.replace(/^\/|\/$/g, '')
          let pagePath = entry.node.full_slug == 'home' ? '' : slug + '/'

          // Wire up the 404 page by setting the path to just 404 as Gatsby expects it.
          if (pagePath.match(/^404/)) {
            pagePath = "404"
          }

          // Wire up the 403 page by setting the path to just 403 as Gatsby expects it.
          if (pagePath.match(/^403/)) {
            pagePath = "403"
          }

          createPage({
            path: '/' + pagePath,
            component: storyblokEntry,
            context: {
              story: entry.node
            }
          })
        })
      })
    )
  })
}
