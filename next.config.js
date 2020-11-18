const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withSvgr = require('next-svgr');

// module.exports = withSass({
// 	cssModules: true,
// });

// module.exports = withSvgr({
// 	// your config for other plugins or the general next.js here...
// });

module.exports = withPlugins([
	[
		withSass,
		{
			cssModules: true
		},
	],
	withSvgr,
]);
