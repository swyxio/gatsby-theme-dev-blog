---
title: Cloning DerrickReimer.com
date: "2019-05-27"
spoiler: experimenting with the component shadowing and finding pain points
---

![derrickdone](https://user-images.githubusercontent.com/6764957/58396810-2df54880-801c-11e9-960d-ff6d94617310.gif)

i spent some time first ripping out the i18n in `gatsby-theme-dev-blog`. its not something most people will want.

i also wanted to make sure that the page location was customizable. it used to depend on `src/pages`, now you can pass in an option to use some other folder. this makes the theme more reusable.

after about 3 hours of work, i was done.

- Tweet: https://twitter.com/swyx/status/1132822485869711361
- Github: https://github.com/sw-yx/gatsby-theme-dev-blog-derrick-demo
