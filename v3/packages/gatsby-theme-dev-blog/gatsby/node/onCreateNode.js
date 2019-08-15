const path = require('path')

const _ = require('lodash')

module.exports = ({ node, getNode, actions }, themeOptions) => {
  const { createNodeField } = actions
  const {
    contentPath = 'content/writing',
    draftsPath = 'content/drafts',
    talksPath = 'content/talks',
  } = themeOptions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const titleSlugged = _.join(_.drop(parent.name.split('-'), 3), '-')

    let slug = node.frontmatter.slug || titleSlugged
    if (parent.sourceInstanceName === contentPath) slug = 'writing/' + slug
    else if (parent.sourceInstanceName === draftsPath)
      slug = 'writing/draft/' + slug
    else if (parent.sourceInstanceName === talksPath) slug = 'talks/' + slug

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
    })

    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    })

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: 'redirects',
      node,
      value: node.frontmatter.redirects,
    })
  }
}
