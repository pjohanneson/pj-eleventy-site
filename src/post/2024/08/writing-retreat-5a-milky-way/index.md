---
title: "Writing Retreat (5a - Milky Way)"
date: "2024-08-28"
categories: 
  - "photos"
tags: 
  - "astrophotography"
  - "milky-way"
coverImage: "23-layers-nr-2000.jpg"
---

There was quite the aurora show last night, and I'm going through my photos from that, but first I decided to process the 24 shots I took of the Milky Way. Two hours' processing gets you the above photo.

<figure>

![Milky Way photo -- straight out of the camera, no processing applied](https://i0.wp.com/patrickjohanneson.com/wp-content/uploads/2024/08/IMG_3851-2000-sooc.jpg?ssl=1)![Milky Way image -- stacked from 23 images](https://i1.wp.com/patrickjohanneson.com/wp-content/uploads/2024/08/23-layers-nr-2000.jpg?ssl=1)

<figcaption>

it takes a lot of work to look this good

</figcaption>



</figure>

## The Process

I took some notes as I processed the images, because I want to do more of this and get better at it. The image, as eye-catching as it is, is pretty noisy, and I'm pretty sure there are better ways to do some of the things I did. But, for the nerd crowd (I know you're out there, I can hear you breathing), here's how I made this particular image:

- snapped 24((One frame was wonky, so the final stack is 23 images deep.)) photos (aka "light frames"), 15 seconds, 24mm, _f_/2.8, ISO 3200

- snapped 3 dark frames, ie, left the settings the same and put the lens cap on

- did dark frame subtraction on _every_ frame (opened each light frame and a dark frame in [Gnu IMP](https://gimp.org/) as layers, dark frame on top, and set the Layer Mode to "Subtract")((This gets rid of the camera's "hot pixels"—the first time I tried stacking the images, I got smeary blue and red lines from the hot pixels.))

- align images with `[align_image_stack](https://hugin.sourceforge.io/docs/manual/Align_image_stack.html) -a aligned_ *.JPG` ((Part of [Hugin](https://hugin.sourceforge.io/).))

- convert aligned images to JPG using `mogrify -format jpg *.tif`((part of [Image Magick](https://imagemagick.org/).)) (mostly so I don't overload my poor laptop)

- open aligned images as layers in Gnu IMP

- set each layer mode as "Dodge"

- exported the whole shebang as a JPG

- re-opened the exported JPG

- Used Gnu IMP's Filter → Enhance → Noise Reduction and cranked that baby up to 11 ((16, actually.))

- profit

Things to try next time:

- shoot RAW

- try a lower ISO value
