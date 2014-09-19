
var katex = require("katex");
var debug = require("debug")("metalsmith-katex");

module.exports = plugin;

function plugin(options) {
    options = options || {};
    options.startDelimiter = options.startDelimiter || "<tex>";
    options.endDelimiter = options.endDelimiter || "</tex>";
	
	debug("loaded");
    
    return function (files, metalsmith, done) {
        Object.keys(files).forEach(function (file) {
			debug('converting file: %s', file);
			var data = files[file];
            data.contents = new Buffer(convert(data.contents.toString(), options));
        });
		done();
    };
}

function convert(str, options) {
    // Split the string at the start delimiters
    var substrings = str.split(options.startDelimiter);
    
    for (var i = 1; i < substrings.length; i += 2) {
        // If the start and end delimiters are different,
        // split each substring at the end delimiter.
        if (options.startDelimiter !== options.endDelimiter) {
            var splitEnd = substrings[i].split(options.endDelimiter);
            if (splitEnd.length === 2) {
                substrings[i] = splitEnd[0];
                substrings.splice(i + 1, 0, splitEnd[1]);
            }
            else {
                substrings.splice(i, 0, "");
            }
        }
        
        var tex = substrings[i].trim();
        if (tex.length) {
            substrings[i] = katex.renderToString(tex);
        }
    }
    
    return substrings.join("");
}
