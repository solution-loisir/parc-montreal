const sass = require('./config/sass-process');
const htmlmin = require('html-minifier');

module.exports = config => {
    //Watching for modificaions in style directory
    sass('./style/index.scss', './_site/style/index.css');
    //Passing assets as is to _src directory
    config.addPassthroughCopy('js/index.js')
    //Set libraries
    config.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: '---excerpt---'
    });
    //html-minifier
    config.addTransform('htmlmin', (content, output) => {
        if(process.env.ELEVENTY_ENV === 'prod' && output.endsWith('.html')) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
            });
        }
        return content
    });
    //Layout alias
    config.addLayoutAlias('base-layout', 'layouts/base-layout.njk');
    //Return config object
    return {
        dir: {
            input: '_src',
            output: '_site'
        },
        pathPrefix: '/',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        templateFormats: ['njk', 'html', 'md', 'liquid']
    }
}