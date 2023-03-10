const EleventyFetch = require( "@11ty/eleventy-fetch" );

// module.exports = async function() {

// 	try {
// 		let json = await EleventyFetch(
// 			'http://judomanitoba.mb.ca/wp-json/tribe/events/v1/events/',
// 			{
// 				duration: "1w",
// 				type:     "json"
// 			}
// 		);
// 		console.log( 'Got some events!' );
// 		return json.events;

// 	} catch( e ) {
// 		console.log( 'Failed getting events from Judo MB' );
// 		console.log( e );
// 		return [];
// 	}
// };