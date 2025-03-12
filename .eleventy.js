/**
 * The Main Event.
 *
 * @since 1.0.0
 * @since 2.0.0 Fully rewritten.
 */

module.exports = function ( eleventyConfig ) {
	return {
		dir: {
			input:    "src",
			includes: "_includes",
			output:   "public",
		},
		templateFormats: [ "md", "njk", "html", ],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: "njk",
	};	
}