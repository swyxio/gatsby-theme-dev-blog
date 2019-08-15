import React from "react"
import { rhythm } from "gatsby-theme-dev-blog/src/utils/typography"

// try swapping betweeen these two profile pics
// import profilePic from "gatsby-theme-dev-blog/src/assets/profile-pic.jpg"
import profilePic from "../../assets/swyx.jpg"

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          marginBottom: rhythm(2),
          border: "2px solid pink",
          padding: "1rem",
        }}
      >
        <img
          src={profilePic}
          alt={`Dan Abramov`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: "50%",
          }}
        />
        <div>
          <p style={{ maxWidth: 310 }}>
            This is a gatsby theme dev blog inspired by{" "}
            <a href="https://overreacted.io">Dan Abramov's Overreacted.io</a>.
          </p>
          <p>
            <a href="https://github.com/sw-yx/gatsby-theme-dev-blog-demo">
              <strong>Source Code Here</strong>
            </a>{" "}
          </p>
          <p>
            This Bio component overrides the default that ships with the theme
            thanks to{" "}
            <a href="https://www.christopherbiscardi.com/post/component-shadowing-in-gatsby-child-themes">
              Component Shadowing
            </a>
            .
          </p>
        </div>
      </div>
    )
  }
}

export default Bio
