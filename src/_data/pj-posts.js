// const EleventyFetch = require( "@11ty/eleventy-fetch" );

// module.exports = async function() {

// 	try {
// 		let json = await EleventyFetch(
// 			'http://pj.wp/wp-json/wp/v2/posts?_embed=wp:featuredmedia',
// 			{
// 				duration: "4h",
// 				type:     "json"
// 			}
// 		);
// 		console.log( 'Got some posts!' );
// 		console.log( json[0] );
// 		return json;

// 	} catch( e ) {
// 		console.log( 'Failed getting posts from PJ.wp' );
// 		console.log( e );
// 		return [];
// 	}
// };

const { AssetCache } = require("@11ty/eleventy-fetch");
const axios = require("axios");
const jsdom = require("jsdom");
const loadLanguages = require("prismjs/components/");
const Prism = require("prismjs");

const { JSDOM } = jsdom;
loadLanguages(["php"]);

// Config
const ITEMS_PER_REQUEST = 10;
const API_BASE = "http://pj.wp/wp-json/wp/v2/posts";

/**
 * Blog post API call by page
 *
 * @param {Int} page - Page number to fetch, defaults to 1
 * @return {Object} - Total, Pages, and full API data
 */
async function requestPosts(page = 1) {
  try {
    // https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
    const url = API_BASE;
    const params = {
      params: {
        page: page,
        per_page: ITEMS_PER_REQUEST,
        _embed: "wp:featuredmedia",
        order: "desc",
      },
    };
    const response = await axios.get(url, params);

    return {
      total: parseInt(response.headers["x-wp-total"], 10),
      pages: parseInt(response.headers["x-wp-totalpages"], 10),
      data: response.data,
    };
  } catch (err) {
    console.error("API not responding, no data returned", err);
    return {
      total: 0,
      pages: 0,
      data: [],
    };
  }
}

/**
 * Get all blog posts from the API
 * Use cached values if available, pull from API if not.
 *
 * @return {Array} - array of blog posts
 */
async function getAllPosts() {
  const cache = new AssetCache("blogposts");
  let requests = [];
  let apiData = [];

  if (cache.isCacheValid("2h")) {
    console.log("Using cached blogposts");
    return cache.getCachedValue();
  }

  // make first request and marge results with array
  const request = await requestPosts();
  console.log(
    "Using API blogposts, retrieving " +
      request.pages +
      " pages, " +
      request.total +
      " total posts."
  );
  apiData.push(...request.data);

  if (request.pages > 1) {
    // create additional requests
    for (let page = 2; page <= request.pages; page++) {
      const request = requestPosts(page);
      requests.push(request);
    }

    // resolve all additional requests in parallel
    const allResponses = await Promise.all(requests);
    allResponses.map((response) => {
      apiData.push(...response.data);
    });
  }

  // return data
  await cache.save(apiData, "json");
  return apiData;
}

/**
 * Clean up and convert the API response for our needs
 */
async function processPosts(blogposts) {
  return Promise.all(
    blogposts.map(async (post) => {
      // remove HTML-Tags from the excerpt for meta description
      let metaDescription = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");
      metaDescription = metaDescription.replace("\n", "");

      // Code highlighting with Eleventy Syntax Highlighting
      // https://www.11ty.dev/docs/plugins/syntaxhighlight/
      let content = highlightCode(post.content.rendered);

      // Return only the data that is needed for the actual output
      let postYear  = new Date( post.date ).getFullYear();
      let postMonth = new Date( post.date ).getMonth() + 1;
      let postDay   = new Date( post.date ).getDate();
      postMonth = '' + postMonth;
      postMonth = postMonth.padStart( 2, '0' );
      postDay   = '' + postDay;
      postDay   = postDay.padStart( 2, '0' );
      // let heroImageFull  = null;
      // let heroImageThumb = null;
      // Handle the hero images outside of the `await` bit.
      // if ( post._embedded && post._embedded['wp:featuredmedia'].length > 0 ) {
      // 	console.log( post._embedded );
      // 	heroImageFull = {
      // 		url: post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url,
      // 		alt: post._embedded['wp:featuredmedia'][0].alt_text
      // 	};
      // 	heroImageThumb = {
      // 		url: post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
      // 		alt: post._embedded['wp:featuredmedia'][0].alt_text
      // 	};
      // }
      // Featured media.
      let featuredImage = '';
      if ( post._embedded && post._embedded['wp:featuredmedia'].length > 0 ) {
      	featuredImage = {
      		url: post._embedded['wp:featuredmedia'][0].source_url,
      		alt: post._embedded['wp:featuredmedia'][0].alt_text,
      	}
      }
      return await {
      	id: post.id,
        content: content,
        excerpt: post.excerpt.rendered,
        date: post.date,
        modifiedDate: post.modified,
        formattedDate: new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        postYear:  postYear,
        postMonth: postMonth,
        postDay:   postDay,
        // heroImageFull: heroImageFull,
      	// heroImageFull:
      	// 	post._embedded && post._embedded['wp:featuredmedia'].length > 0 ?
	    //   	{
	    //   		url: post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url,
	    //   		alt: post._embedded['wp:featuredmedia'][0].alt_text
	    //   	} : null,
        // heroImageThumb: heroImageThumb,
      	// heroImageThumb:
      	// 	post._embedded && post._embedded['wp:featuredmedia'].length > 0 ?
	    //   	{
	    //   		url: post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
	    //   		alt: post._embedded['wp:featuredmedia'][0].alt_text
	    //   	} : null,
	    featuredImage: featuredImage,
        metaDescription: metaDescription,
        slug: post.slug,
        title: post.title.rendered,
      };
    })
  );
}

/**
 * Use Prism.js to highlight embedded code
 */
function highlightCode(content) {
  // since Prism.js works on the DOM,
  // we need an instance of JSDOM in the build
  const dom = new JSDOM(content);

  let preElements = dom.window.document.querySelectorAll("pre");

  // WordPress delivers a `code`-tag that is wrapped in a `pre`
  // the used language is specified by a CSS class
  if (preElements.length) {
    preElements.forEach((pre) => {
      let code = pre.querySelector("code");

      if (code) {
        // get specified language from css-classname
        let codeLanguage = "html";
        const preClass = pre.className;

        var matches = preClass.match(/language-(.*)/);
        if (matches != null) {
          codeLanguage = matches[1];
        }

        // save the language for later use in CSS
        pre.dataset.language = codeLanguage;

        // set grammar that prism should use for highlighting
        let prismGrammar = Prism.languages.html;

        if (
          codeLanguage === "javascript" ||
          codeLanguage === "js" ||
          codeLanguage === "json"
        ) {
          prismGrammar = Prism.languages.javascript;
        }

        if (codeLanguage === "css") {
          prismGrammar = Prism.languages.css;
        }

        if (codeLanguage === "php") {
          prismGrammar = Prism.languages.php;
        }
        // highlight code
        code.innerHTML = Prism.highlight(
          code.textContent,
          prismGrammar,
          codeLanguage
        );

        code.classList.add(`language-${codeLanguage}`);
      }
    });

    content = dom.window.document.body.innerHTML;
  }

  return content;
}

// export for 11ty
module.exports = async () => {
  const blogposts = await getAllPosts();
  const processedPosts = await processPosts(blogposts);
  return processedPosts;
};