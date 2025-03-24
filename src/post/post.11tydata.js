module.exports = function() { 
	return {
		"layout": "layouts/post.njk",
		"author": {
			"name": "Patrick Johanneson",
			"site": "https://patrickjohanneson.com/"
		},
		"title": "{Default Title}",
		"coverImage": "/img/default-image.jpg",
		permalink: function( { page } ) {
			// @see https://henry.codes/writing/human-readable-date-formatting-with-vanilla-javascript/
			const year  = page.date.toLocaleDateString( 'en-ca', { 'year':  'numeric' } );
			const month = page.date.toLocaleDateString( 'en-ca', { 'month': '2-digit' } );
			const permalink = `/${year}/${month}/${page.fileSlug}/`;
			return permalink;
		},
	};
}