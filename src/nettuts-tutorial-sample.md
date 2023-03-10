---
title: "NetTuts Tutorial Sample"
layout: page
excerpt: ""
date: 0000-00-00 00:00:00
modified: 0000-00-00 00:00:00
permalink: false
tags: []
featured_img: 
wpid: 1318
---

# NetTuts Tutorial Sample

The Events Calendar — a premium WordPress event system
======================================================

[The Events Calendar](http://tri.be/wordpress-events-calendar/) from [Modern Tribe](http://tri.be/) is a robust, powerful system to manage, edit, and display events. It is available as a free plugin, which has plenty of power for most websites. For those that require more features, such as recurring events, custom attributes, and venue pages — and more — there are several levels of [Pro version](http://tri.be/shop/wordpress-events-calendar-pro/) available.

Installing The Events Calendar
------------------------------

The Events Calendar is packaged as a WordPress plugin, so it’s installed like any other WordPress plugin:

1. Download the .zip file to your computer
2. Unzip the .zip file
3. Upload the entire contents of the unzipped the-events-calendar directory to your WordPress installation’s plugin directory (usually `wp-content/plugins/`)
4. Activate the plugin in your site’s administration pages (usually `/wp-admin`). (If you’re running WordPress Multisite, you can either activate The Events Calendar for specific sites in your network, or you can activate it network-wide from the Network Admin plugins page.)

### Events menu (backend)

Once you’ve installed The Events Calendar, you should make sure to set it up properly for your purposes. The Events Calendar sets up some defaults which should be reasonable for most situations, but it’s never a *bad* idea to review your settings. You can go to the `Events -> Settings` page to have a look at and/or modify the settings.

![How to get to the Events Settings page](nettuts-img/the-events-calendar-settings.png)

There are three tabs on the Settings page: **General**, **Template**, and **Help**.

#### General Settings

![General Settings screenshot](nettuts-img/the-event-calendar-settings-general-tab.png)

<table><thead><tr><th>Setting</th><th>Explanation / Options</th><th>Default</th></tr></thead><tbody><tr><td>Default view for the Events</td><td>You can select whether you want your users to see the events on the Events page as a **Calendar** or a simple **List**</td><td>**Calendar**</td></tr><tr><td>Events URL slug</td><td>What should be the URL for your site’s Events page? (ie, http://example.com/**events**/)</td><td>**events**</td></tr><tr><td>Single Event URL slug</td><td>What should be the base for single Event pages? (ie, http://example.com/**event**/2013/06/15/event-name/)</td><td>**event**</td></tr><tr><td>Show Comments</td><td>Should comments be allowed on your events?</td><td>**False**</td></tr><tr><td>Multiday Event Cutoff</td><td>If an event spans more than one day, the final day won’t appear in the calendar view if the event ends before this time</td><td>**12:00 AM**</td></tr><tr><td>Enable Google Maps</td><td>Turn on Google Maps integration</td><td>**True**</td></tr><tr><td>Google Maps Embed Height</td><td>Desired height (in pixels) of the map</td><td>**350**</td></tr><tr><td>Google Maps Embed Width</td><td>Desired width (in pixels or percent) of the map</td><td>**100%**</td></tr><tr><td>Google Maps Default Zoom Level</td><td>Starting zoom level of the map (0-21)</td><td>**10**</td></tr><tr><td>Send PressTrends Data</td><td>Allow the plugin to send usage information</td><td>**False**</td></tr><tr><td>Debug Mode</td><td>Allow the plugin to log debug information to your server’s PHP log (not recommended for production systems)</td><td>**False**</td></tr></tbody></table>

#### Template Settings tab

![Template Settings screenshot](nettuts-img/the-event-calendar-settings-template-tab.png)

<table><thead><tr><th>Setting</th><th>Explanation / Options</th><th>Default</th></tr></thead><tbody><tr><td>Events Template</td><td>Select a page template for your Events page</td><td>**Default Events Template** <sup id="fnref-1318:1">[1](#fn-1318:1)</sup></td></tr><tr><td>Add HTML before / after calendar</td><td>These two text boxes allow you to add HTML before and/or after the calendar on the Events page, which allows you some control over the calendar’s appearance</td><td>**\[None\]**</td></tr></tbody></table>

#### Help tab

![Help screenshot](nettuts-img/the-event-calendar-settings-help-tab.png)

Need help? The **Help** tab should be your first stop. As you might expect, the **Help** tab provides you with links and content to help you get running: a New User Primer, links to Tri.be’s documentation, FAQ, forums, and other resources, and a couple ways to get hold of the Tri.be people.

Adding Events
-------------

So you’ve got TEC set up and configured just the way you want it.  
!Screenshots

Displaying Events
-----------------

Customizing Template Files
--------------------------

Directory structure

Conclusion / Wrapping Up
------------------------

Next time: Extending TEC — Hooks and Filters
--------------------------------------------

<div class="footnotes">- - - - - -

1. Supplied by the plugin. [↩](#fnref-1318:1)

</div>