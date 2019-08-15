import React from "react"
import { Link } from "gatsby"

import Helmet from "react-helmet"

import { rhythm, scale } from "gatsby-theme-dev-blog/src/utils/typography"
// import sun from "../assets/sun.png"
// import moon from "../assets/moon.png"
import signature from "../../assets/signature-white.png"

class Layout extends React.Component {
  renderHeader() {
    const { location, title } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    if (location.pathname === rootPath) {
      return (
        <h1
          style={{
            ...scale(0.75),
            marginBottom: 0,
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "var(--textTitle)"
            }}
            to={"/"}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      return (
        <h3
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginTop: 0,
            marginBottom: 0,
            height: 42, // because
            lineHeight: "2.625rem"
          }}
        >
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "rgb(255, 167, 196)"
            }}
            to={"/"}
          >
            {title}
          </Link>
        </h3>
      )
    }
  }
  render() {
    const { children } = this.props

    return (
      <div
        className="bg-gray-900 bg-center bg-cover bg-fixed bg-no-repeat selection-teal-200 vsc-initialized"

        // style={{
        //   // color: "var(--textNormal)",
        //   color: "#a0aec0",
        //   // background: "var(--bg)",
        //   background: "#1a202c",
        //   transition: "color 0.2s ease-out, background 0.2s ease-out",
        //   minHeight: "100vh"
        // }}
      >
        <Helmet
          meta={[
            {
              name: "theme-color",
              content: "#282c35"
            }
          ]}
        />
        <div
          className="bg-gray-900 min-h-screen text-gray-500 leading-relaxed max-w-3xl px-8 sm:pr-40 sm:pl-20 py-8"
          // style={{
          //   marginLeft: "auto",
          //   marginRight: "auto",
          //   maxWidth: rhythm(24),
          //   padding: `2.625rem ${rhythm(3 / 4)}`
          // }}
        >
          <img
            src={signature}
            alt="lskdlkj"
            style={{
              width: 140,
              height: 51.33
            }}
          />
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2.625rem"
            }}
          >
            {this.renderHeader()}

            <div style={{ height: "24px" }} />
          </header>
          {children}
        </div>
      </div>
    )
  }
}

export default Layout
