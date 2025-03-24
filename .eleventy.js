/**
 * The Main Event.
 *
 * @since 1.0.0
 * @since 2.0.0 Fully rewritten.
 */

module.exports = async function ( eleventyConfig ) {

	// ECMA imports.
	const { generatePassword, encryptHTML } = await import( 'pagecrypt' );

	// Encrypt the `/secure/` pages.
	eleventyConfig.addTransform( "securePages", async function( content, outputPath ) {
		const theContent      = content;

		// @todo Put the default password in the .env file.
		// Default decryption password.
		var password        = 'djpj1234!!';

		if ( this.page.inputPath.includes( "/secure/" ) ) {

			// Find the password, if one is set.
			var regex = new RegExp( '<p>%%password:\\s*([^%]+)%%</p>' );
			var myMatch = content.match( regex );
			if ( myMatch ) {
				password = myMatch[1];
			}

			// Remove the %%password: {password}%% text from the page content.
			content = content.replace( regex, '' );

		    // Write it to a file or send as an HTTPS response.
		    const encryptedHTML = await encryptHTML( content, password );
		    return encryptedHTML;
		}

		return theContent;
	});

	/** Custom filters. */
	eleventyConfig.addFilter( 'mdY', function( date ) {
		const initialDate = date;
		if ( ! ( date instanceof Date ) ) {
			date = new Date( date );
			//  If it's still not a valid date, give up.
			if ( ! ( date instanceof Date ) ) {
				return initialDate;
			}
		}
		return date.toLocaleDateString( 'en-ca', {
			month: 'long',
			day:   'numeric',
			year:  'numeric',
		});
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