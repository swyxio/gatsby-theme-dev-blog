import React from 'react'
import { css } from '@emotion/core'
import { bpMaxSM } from '../lib/breakpoints'
import SubscribeForm from './Forms/Subscribe'
import Social from './Social'
import Container from './Container'

const Footer = ({ author, noSubscribeForm, twitterUrl, githubUrl }) => (
  <footer>
    <Container
      css={css`
        padding-top: 0;
        ${bpMaxSM} {
          padding-top: 0;
        }
      `}
    >
      {!noSubscribeForm && (
        <div>
          <SubscribeForm />
          <br />
          <br />
        </div>
      )}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            font-size: 90%;
            opacity: 0.7;
          `}
        >
          {author && `${author} \u00A9 ${new Date().getFullYear()}`}
        </div>
        <div>
          {twitterUrl && <Social twitterUrl={twitterUrl} />}
          {githubUrl && <Social githubUrl={githubUrl} />}
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer
