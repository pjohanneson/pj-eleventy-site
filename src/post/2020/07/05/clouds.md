---
title: "Clouds"
layout: post
excerpt: "2½ hours of my life: 40 seconds of video."
date: 2020-07-05 03:38:48
modified: 2020-07-05 03:38:48
permalink: 2020/07/04/clouds/index.html
tags: ["Clouds", "Timelapse", "Movies", "Photos"]
featured_img: 
wpid: 4057
---

# Clouds

About 40 minutes of the clouds to the east of town. Enjoy!

<figure class="wp-block-embed-vimeo wp-block-embed is-type-video is-provider-vimeo wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper"><iframe allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="" frameborder="0" height="281" loading="lazy" src="https://player.vimeo.com/video/435407100?h=e4b8994452&dnt=1&app_id=122963" title="Clouds" width="500"></iframe></div></figure>Nerdy details
-------------

*aka notes to self, for later*

Photos taken at various exposures (1/1600s to 1/3200s), 11mm *f*/2.8, 24mm *f*/2.8, and 50mm *f*/1.8. The lenses all had circular polarizers over them, to add drama to the clouds, at least in theory.

Once I got home, I shrank the images to 3000×2000 pixels using [Imagick](https://imagemagick.org/), darkened the 11mm ones (the exposure was a bit too bright) also using Imagick, and then used `mencoder` on the command line to build the initial timelapses.

Turns out [OpenShot](https://www.openshot.org/), the program I wanted to use to concatenate the three timelapses into one can’t import the AVI files that `mencoder` made, so I converted them to MP4 files using `ffmpeg` (the command was `ffmpeg -i infile.avi ouput.mp4`, which seems too simple to be true, but is in fact correct). I imported the resulting `.mp4` files to OpenShot, added the fade in/out transition, and exported the movie.

*Et hop*, a 40-second video that took, like, two and a half hours of my life. (And I couldn’t be bothered to add a soundtrack.)