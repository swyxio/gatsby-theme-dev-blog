import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SEO from '../components/SEO'
import { css } from '@emotion/core'
import Container from '../components/Container'
import Layout from '../components/Layout'
import { fonts } from '../lib/typography'
import Share from '../components/Share'
import { bpMaxSM } from '../lib/breakpoints'

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  let {
    date,
    title,
    banner,
    author,
    url,
    video,
    venues,
    topic,
    desc,
    description,
    ...misc
  } = mdx.frontmatter
  if (!author) author = site.siteMetadata.author.name

  console.log(misc)
  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <article
        css={css`
          width: 100%;
          display: flex;
        `}
      >
        <Container>
          <h1
            css={css`
              text-align: center;
              margin-bottom: 20px;
            `}
          >
            {title}
          </h1>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-bottom: 20px;
              h3,
              span {
                text-align: center;
                font-size: 15px;
                opacity: 0.6;
                font-family: ${fonts.regular}, sans-serif;
                font-weight: normal;
                margin: 0 5px;
              }
            `}
          >
            {author && (
              <>
                <h3>{author}</h3> <span>—</span>{' '}
              </>
            )}
            {date && <h3>{date}</h3>}
          </div>
          <div
            css={css`
              display: flex;
              justify-content: center;
              span {
                /* font-size: 0.3rem; */
                background-color: rgba(0, 0, 0, 0.1);
                padding: 3px;
                border-radius: 3px;
              }
            `}
          >
            {topic && <span>{topic}</span>}
            {/* {topic && venues && <i> — </i>} */}
            {venues && <div> @ {venues}</div>}
          </div>

          {banner && (
            <div
              css={css`
                padding: 30px;
                ${bpMaxSM} {
                  padding: 0;
                }
              `}
            >
              <Img
                sizes={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
            </div>
          )}
          {desc && <p>{desc}</p>}
          <Video video={video} title={title} />
          {url && (
            <aside
              style={{
                textAlign: 'center',
                fontStyle: 'italic',
                marginBottom: 10,
              }}
            >
              External URL: <a href={url}>{url}</a>
            </aside>
          )}
          {Object.keys(misc).length > 1 && (
            <>
              <br />
              <pre>{JSON.stringify(misc, null, 2)}</pre>
            </>
          )}
          {description && <p>{description}</p>}
          <hr />
          <br />
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
      <Container noVerticalPadding>
        <Share
          url={`${site.siteMetadata.siteUrl}/${mdx.frontmatter.slug}/`}
          title={title}
          twitterHandle={site.siteMetadata.twitterHandle}
        />
        <br />
      </Container>
    </Layout>
  )
}

function Video({ video, title }) {
  if (!video) return null
  let videoId
  if (video.startsWith('https://www.youtube.com/watch')) {
    videoId = new URL(video).searchParams.get('v')
  } else if (video.startsWith('https://youtu.be/')) {
    videoId = video.slice(17)
  } else {
    return null
  }
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '56.25%',
        paddingBottom: '-56.25%',
        marginBottom: '2rem',
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          border: '0',
        }}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        name={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        width="600"
        height="400"
        allowFullScreen
        aria-hidden="true"
      />
    </div>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        banner {
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        # slug
        venues
        topic
        url
        video
        description
        desc
      }
      body
    }
  }
`
