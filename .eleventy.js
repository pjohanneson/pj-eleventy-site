/**
 * The beating heart of this whole thing.
 *
 * @since 1.0.0
 */

// const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");


const { DateTime } = require('luxon');
const Image        = require("@11ty/eleventy-img");
const baseURL      = 'https://patrickjohanneson.com';
const { execSync } = require('child_process');

async function getImage( src, alt = '', ret = 'imgTag' ) {
	// @todo Throw an error if the alt text is empty.
	if ( '' === alt ) {
		alt = 'Alt text should be here';
	}
  let metadata = await Image(src, {
    widths: [960, 600, 150, "auto"],
    formats: ["webp", "jpeg"]
  });
  let data = metadata.webp[metadata.webp.length - 1];
  if ( 'og' === ret ) {
  	return `<meta name="og:image" content="${baseURL}${data.url}">`;
  }
  return `<img class="the-small-page-image" src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}"  loading="lazy" decoding="async" />`;
}

module.exports = function(eleventyConfig) {
	// Set some template aliases.
	eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
	eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
	eleventyConfig.addLayoutAlias('pj_story', 'layouts/story.njk');
	eleventyConfig.addLayoutAlias('story', 'layouts/story.njk');
	eleventyConfig.addLayoutAlias('judo-events', 'layout.njk');
	eleventyConfig.addLayoutAlias('pj-posts', 'layout.njk');

	// Some passthrough directories.
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy("img");

	// Sets up the plugins.
	// eleventyConfig.addPlugin(directoryOutputPlugin);

	// Sets up some shortcodes.
	eleventyConfig.addAsyncShortcode( "image", getImage );

	// Run the PageFind search index.
	eleventyConfig.on('eleventy.after', () => {
		execSync(`npx pagefind --source public --glob \"**/*.html\"`, { encoding: 'utf-8' })
	});

	// Set custom directories for input, output, includes, and data
	return {
		dir: {
			input:    "src",
			includes: "_includes",
			data:     "_data",
			output:   "public"
		}
	};
}