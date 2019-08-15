import React from "react"
import { rhythm } from "gatsby-theme-dev-blog/src/utils/typography"

// try swapping betweeen these two profile pics
// import profilePic from "gatsby-theme-dev-blog/src/assets/profile-pic.jpg"
import profilePic from "../../assets/avatar.png"
import aop from "../../assets/aop-800.png"

class Bio extends React.Component {
  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            // marginBottom: rhythm(2),
            paddingBottom: "1rem"
          }}
        >
          <img
            src={profilePic}
            alt={`Dan Abramov`}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              // width: rhythm(2),
              height: rhythm(2)
            }}
          />
          <div>
            <p>
              Hey, I’m Derrick Reimer, a full-stack developer. I fell in love with{" "}
              <a className="text-teal-400 font-bold border-b-2 border-teal-700" href="https://overreacted.io">
                the 37signals ethos
              </a>{" "}
              back in 2009 and I’ve been bootstrapping ever since. I’ve started and sold two companies, but the truth is
              it’s still freaking hard!
            </p>
          </div>
        </div>

        <p
          style={{
            display: "flex",
            // marginBottom: rhythm(2),
            paddingBottom: "1rem"
          }}
        >
          My mission on the internet is to share what I’m learning to help other indie hackers achieve success doing
          what they love.
        </p>
        <div className="pb-3">
          <h2 className="pb-3 text-2xl text-gray-200 font-headline font-normal">Newsletter</h2>

          <p className="pb-3">Join 1,000+ people following along as I build my next company.</p>

          <form action="https://www.getdrip.com/forms/9552982/submissions" method="post">
            <div className="pb-6 flex">
              <div className="mr-2 flex-grow">
                <input
                  type="email"
                  name="fields[email]"
                  value=""
                  className="h-12 px-4 w-full bg-gray-700 text-teal-300 focus:bg-gray-400 focus:text-teal-800 focus:outline-none selection-teal-400"
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Join now"
                  className="h-12 px-8 bg-teal-500 hover:bg-teal-600 active:bg-teal-600 text-teal-100 font-bold cursor-pointer focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </form>
        </div>
        <h2 className="pb-3 text-2xl text-gray-200 font-headline font-normal">Podcast</h2>
        <div className="pb-3 sm:-mr-0 sm:flex">
          <div>
            <p className="pb-5">
              I co-host a weekly podcast called{" "}
              <a className="text-teal-400 font-bold border-b-2 border-teal-700" href="https://artofproductpodcast.com">
                The Art of Product
              </a>
              .
            </p>
            <p className="pb-5">
              Each week, my friend Ben Orenstein and I go deep on what's happening in our respective businesses. Our
              goal is to paint an accurate picture of what it's like starting a software business.
            </p>
          </div>
          <div className="flex-shrink-0 pb-5 sm:ml-4 sm:mt-0">
            <img
              className="border-gray-800 block w-24 h-24 sm:w-24 sm:h-24 shadow-lg"
              src={aop}
              alt="Podcast artwork"
            />
          </div>
        </div>
      </>
    )
  }
}

export default Bio
