import React from 'react'
import { css } from '@emotion/core'
import { bpMaxSM } from '../lib/breakpoints'
import SubscribeForm from './Forms/Subscribe'
import Social from './Social'
import Container from './Container'
import { useTheme } from './Theming'

const Footer = ({ author, noSubscribeForm, twitterUrl, githubUrl }) => {
  return (
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
            <RSS />
          </div>
        </div>
      </Container>
    </footer>
  )
}

const RSS = () => {
  const theme = useTheme()

  return (
    <a
      css={css`
        color: ${theme.colors.text};
        margin-left: 10px;
        :hover {
          color: ${theme.colors.primary};
        }
      `}
      href="/rss.xml"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"
        />
      </svg>
    </a>
  )
}

export default Footer
