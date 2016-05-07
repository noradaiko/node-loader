/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
	Author Takuya Matsuyama @noradaiko
*/
var loaderUtils = require("loader-utils");

module.exports = function(content) {
	this.cacheable && this.cacheable();
	if(!this.emitFile) throw new Error("emitFile is required from module system");
	var query = loaderUtils.parseQuery(this.query);
	var url = loaderUtils.interpolateName(this, query.name || "[hash].[ext]", {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});
	this.emitFile(url, content);
	return "try {process.dlopen(module, __dirname + '/' + " + JSON.stringify(url) + "); } catch(e) {" +
		"throw new Error('Cannot open ' + " + JSON.stringify(url) + " + ': ' + e);}";
}

module.exports.raw = true;
