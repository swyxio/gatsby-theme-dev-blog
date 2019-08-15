---
title: Hello World!
date: "2019-05-17"
spoiler: Trying out gatsby-theme-dev-blog for the first time
---

I made `gatsby-theme-dev-blog` out of Dan Abramov's Overreacted.io.

It supports syntax highlighting:

```js
function test() {
  return <div>post pls ignore</div>
}
```

And using `gatsby-image` with Markdown images:

![React homepage screenshot](./react.png)

Once I was happy with the MVP of the theme, I just recorded a video to show how much simpler the blog looks with the theme: https://www.youtube.com/watch?time_continue=81&v=ipb9U0YEcZQ

I have documented some remaining todos on the README, mainly:

```
Known untested/probable problems:

- anything to do with i18n
- safely handling cases if no pages are detected
- options for customization being passed into the theme vs siteConfig
- including components/shorttags in mdx
- component shadowing custom layouts

Want to do:

- option to include netlify cms
```
