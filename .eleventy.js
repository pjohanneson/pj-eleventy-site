/**
 * The Main Event.
 *
 * @since 1.0.0
 * @since 2.0.0 Fully rewritten.
 */

module.exports = async function ( eleventyConfig ) {

	// ECMA imports.
	const { encryptHTML } = await import( 'pagecrypt' );

	// Encrypt the `/secure/` pages.
	eleventyConfig.addTransform("secure", async function(content, outputPath) {
		const theContent = content;

		if(this.page.inputPath.includes("/secure/")) {
		    // Write it to a file or send as an HTTPS response.
		    const encryptedHTML = await encryptHTML(content, 'password')
		    return encryptedHTML;
		}

		return theContent;
	});

	// The return.
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