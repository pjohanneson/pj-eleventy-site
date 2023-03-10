---
title: "WordCamp Winnipeg Presentation Outline"
layout: post
excerpt: ""
date: 2013-05-24 16:41:53
modified: 2013-05-24 16:41:53
permalink: false
tags: ["WordPress"]
featured_img: 
wpid: 1245
---

# WordCamp Winnipeg Presentation Outline

All\* About WordPress Multisite
===============================

( \* Not all )

WHAT?
-----

### What is WordPress Multisite?

WHY?
----

### Why might you need Multisite?

HOW?
----

### Installing Multisite

WHAT? (Redux)
-------------

### What can you do with Multisite?

#### news &amp; events collection

#### site parents &amp; breadcrumbs

#### users

- each site can have its own set of users, and each one has its own `wp-admin` section
- users in one site can be assigned to other sites, too
- users can have different permission levels in different sites

### What can Multisite do to you?

#### Gotchas

- moving a WordPress Multisite install is somewhat more involved than moving a regular WP install, since the “site name” appears in several places in the DB, not just in the config files
- themes *must* be network enabled before being available for use on any site — this applies to the *parents* of child themes

Questions?
----------

- q&amp;a

Notes — to be included ^^^ somewhere
------------------------------------

- to get content from one site and display it on another, use `switch_to_blog()` (and maybe `restore_current_blog()`, though it seems that it’s now kosher to simply `switch_to_blog()` back to the original site)