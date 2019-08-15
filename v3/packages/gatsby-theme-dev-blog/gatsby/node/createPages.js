const _ = require('lodash')
// const paginate = require('gatsby-awesome-pagination')
const path = require('path')

const { createPosts, createPaginatedPosts } = require('./createPosts')
const { createTalks, createPaginatedTalks } = require('./createTalks')

module.exports = ({ actions, graphql }, themeOptions) =>
  graphql(`
    query {
      allMdx(
        filter: { frontmatter: { published: { ne: false } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
            excerpt(pruneLength: 250)
            fields {
              title
              slug
              date
            }
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              slug
              keywords
              venues
              topic
              url
              video
              description
              desc
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    const {
      contentPath = 'content/writing',
      draftsPath = 'content/drafts',
      talksPath = 'content/talks',
    } = themeOptions
    if (errors) {
      return Promise.reject(errors)
    }

    if (_.isEmpty(data.allMdx)) {
      return Promise.reject('There are no posts!')
    }

    const { edges } = data.allMdx

    /** writing */
    const postEdges = edges.filter(
      // edge => edge.node.parent.sourceInstanceName === contentPath,
      edge => {
        // console.log('sin', talksPath, edge.node.parent.sourceInstanceName)
        return edge.node.parent.sourceInstanceName !== talksPath
      },
    )
    console.log('Number of posts: ', postEdges.length)
    createPosts(actions, postEdges)
    createPaginatedPosts(actions, postEdges, '/writing', {
      categories: [],
    })

    /** talks */
    const talkEdges = edges.filter(edge => {
      return edge.node.parent.sourceInstanceName === talksPath
    })
    console.log('Number of talks: ', talkEdges.length)
    createTalks(actions, talkEdges)
    createPaginatedTalks(actions, talkEdges, '/talks', {
      categories: [],
    })
  })
