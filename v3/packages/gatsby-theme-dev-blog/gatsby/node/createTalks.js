const PAGINATION_OFFSET = 7
exports.createTalks = (actions, edges) => {
  const { createRedirect, createPage } = actions
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug

    if (node.fields.redirects) {
      node.fields.redirects.forEach(fromPath => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }
    createPage({
      path: pagePath,
      component: require.resolve(`../../src/templates/talk.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

exports.createPaginatedTalks = (actions, edges, pathPrefix, context) => {
  const { createRedirect, createPage } = actions
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET)

    if (!acc[pageIndex]) {
      acc[pageIndex] = []
    }

    // acc[pageIndex].push(value.node.id)
    acc[pageIndex].push(value.node)

    return acc
  }, [])

  pages.forEach((page, index) => {
    const previousPagePath = `${pathPrefix}/${index + 1}`
    const nextPagePath = index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: require.resolve(`../../src/templates/talkList.js`),
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath:
            index === pages.length - 1 ? null : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    })
  })
}
