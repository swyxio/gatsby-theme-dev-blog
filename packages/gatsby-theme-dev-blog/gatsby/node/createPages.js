const _ = require('lodash')
// const paginate = require('gatsby-awesome-pagination')
const path = require('path')

const { createPosts, createPaginatedPosts } = require('./createPosts')
const { createTalks, createPaginatedTalks } = require('./createTalks')

module.exports = (
  { actions, graphql },
  themeOptions, // dont need for now but its there if you want it
) =>
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
    if (errors) {
      return Promise.reject(errors)
    }

    if (_.isEmpty(data.allMdx)) {
      return Promise.reject('There are no posts!')
    }

    const { edges } = data.allMdx

    /** writing */
    const postEdges = edges.filter(edge => {
      return [
        'gatsby-theme-dev-blog:contentPath',
        'gatsby-theme-dev-blog:draftsPath',
      ].includes(edge.node.parent.sourceInstanceName)
    })
    console.log('Number of posts: ', postEdges.length)
    createPosts(actions, postEdges)
    createPaginatedPosts(actions, postEdges, '/writing', {
      categories: [],
    })

    /** talks */
    const talkEdges = edges.filter(edge => {
      return (
        edge.node.parent.sourceInstanceName ===
        'gatsby-theme-dev-blog:talksPath'
      )
    })
    console.log('Number of talks: ', talkEdges.length)
    createTalks(actions, talkEdges)
    createPaginatedTalks(actions, talkEdges, '/talks', {
      categories: [],
    })
  })
