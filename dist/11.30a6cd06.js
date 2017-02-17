webpackJsonp([11],{

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(122)
	__vue_template__ = __webpack_require__(124)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-afc2b698/position.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(123);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(98)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./position.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./position.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(40)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.pos{\n\tposition:absolute;\n\tcolor:green;\n\n}\n\n.pos_abs\n{\n\tposition:absolute;\n\tleft:10px;\n\ttop:10px\n}\n.f40{\n\tfont-size: 40px;\n}\n\n", "", {"version":3,"sources":["/./dev/js/views/position/position.vue?38c99dca"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAmGA;CACA,kBAAA;CACA,YAAA;;CAEA;;AAEA;;CAEA,kBAAA;CACA,UAAA;CACA,QAAA;CACA;AACA;CACA,gBAAA;CACA","file":"position.vue","sourcesContent":["<template>\n <div class=\"parameterl\">\n   \t\t\t\t<div class=\"explaininfo\">\n                    <p>1.position==absolute本身不加top,left,right,bottom,父级不加relative</p>\n                    <p>1.1---脱离文档留,在元素里</p>\n                </div>\n                <div class=\"\">\n\t\t\t\t\t<div >\n\t\t\t\t\t  <h2 class=\"pos\">这是带有绝对定位的标题1</h2>\n\t\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n\t\t\t\t\n\t\t\t\t<div class=\"explaininfo\">\n                    <p>2.position==absolute本身加top,left,right,bottom,父级不加relative</p>\n                    <p>2.1---脱离文档留,相对于body去定位</p>\n                </div>\n\t\t\t\t<div >\n\t\t\t\t  <h2 class=\"pos_abs\">这是带有绝对定位的标题2</h2>\n\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n\n\t\t\t\t<div class=\"explaininfo\">\n                    <p>3.position==absolute本身不加top,left,right,bottom,父级加relative</p>\n                    <p>3.1---脱离文档留,在元素里</p>\n                </div>\n                <div class=\"pr\">\n\t\t\t\t\t<div >\n\t\t\t\t\t  <h2 class=\"pos\">这是带有绝对定位的标题3</h2>\n\t\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n\t\t\t\t\n\t\t\t\t<div class=\"explaininfo\">\n                    <p>4.position==absolute本身加top,left,right,bottom,父级加relative</p>\n                    <p>4.1---脱离文档留,相对于父元素进行定位</p>\n                </div>\n\t\t\t\t<div class=\"pr\">\n\t\t\t\t  <h2 class=\"pos_abs\">这是带有绝对定位的标题4</h2>\n\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n\n\t\t\t\t<div class=\"explaininfo\">\n                    <p>5.position==absolute本身加top,left,right,bottom,父级加relative</p>\n                    <p>5.1---脱离文档留,相对于父元素进行定位</p>\n                    <p>5.2---相对于最近的非 static 定位祖先元素的偏移,所以第二个随着第一个absolute偏移</p>\n                </div>\n\t\t\t\t<div class=\"pr\">\n\t\t\t\t  <div class=\"pos_abs f40\">这是带有绝对定位的标题5\n\t\t\t\t   \t<div class=\"pos_abs f40\">这是带有绝对定位的标题5</div>\n\t\t\t\t  </div>\n\t\t\t\t  <h2 class=\"pos_abs f40\">这是带有绝对定位的标题5\n\t\t\t\t   \t<h2 class=\"pos_abs f40\">这是带有绝对定位的标题5</h2>\n\t\t\t\t  </h2>\n\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n\n\t\t\t\t<div class=\"explaininfo\">\n                    <p>6.position==absolute本身加top,left,right,bottom,父级加relative</p>\n                    <p>6.1---脱离文档留,相对于父元素进行定位</p>\n                    <p>6.2---相对于最近的非 static 定位祖先元素的偏移,但是没有加top,left,right,bottom,所以脱离文档留,在元素里</p>\n                </div>\n\t\t\t\t<div class=\"pr\">\n\t\t\t\t  <div class=\"pos_abs f40\">这是带有绝对定位的标题6\n\t\t\t\t   \t<div class=\"pos f40\">这是带有绝对定位的标题6</div>\n\t\t\t\t  </div>\n\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n<pre>\n <code class=\"scss\">\n     .pos{\n\t\tposition:absolute;\n\t\tcolor:green;\n\n\t}\n\n\t.pos_abs\n\t{\n\t\tposition:absolute;\n\t\tleft:10px;\n\t\ttop:10px\n\t}\n\n</code>\n</div>\n</template>\n<style>\n\t.pos{\n\t\tposition:absolute;\n\t\tcolor:green;\n\n\t}\n\n\t.pos_abs\n\t{\n\t\tposition:absolute;\n\t\tleft:10px;\n\t\ttop:10px\n\t}\n\t.f40{\n\t\tfont-size: 40px;\n\t}\n\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 124:
/***/ function(module, exports) {

	module.exports = "\n <div class=\"parameterl\">\n   \t\t\t\t<div class=\"explaininfo\">\n                    <p>1.position==absolute本身不加top,left,right,bottom,父级不加relative</p>\n                    <p>1.1---脱离文档留,在元素里</p>\n                </div>\n                <div class=\"\">\n\t\t\t\t\t<div >\n\t\t\t\t\t  <h2 class=\"pos\">这是带有绝对定位的标题1</h2>\n\t\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n\t\t\t\t\n\t\t\t\t<div class=\"explaininfo\">\n                    <p>2.position==absolute本身加top,left,right,bottom,父级不加relative</p>\n                    <p>2.1---脱离文档留,相对于body去定位</p>\n                </div>\n\t\t\t\t<div >\n\t\t\t\t  <h2 class=\"pos_abs\">这是带有绝对定位的标题2</h2>\n\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n\n\t\t\t\t<div class=\"explaininfo\">\n                    <p>3.position==absolute本身不加top,left,right,bottom,父级加relative</p>\n                    <p>3.1---脱离文档留,在元素里</p>\n                </div>\n                <div class=\"pr\">\n\t\t\t\t\t<div >\n\t\t\t\t\t  <h2 class=\"pos\">这是带有绝对定位的标题3</h2>\n\t\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n\t\t\t\t\n\t\t\t\t<div class=\"explaininfo\">\n                    <p>4.position==absolute本身加top,left,right,bottom,父级加relative</p>\n                    <p>4.1---脱离文档留,相对于父元素进行定位</p>\n                </div>\n\t\t\t\t<div class=\"pr\">\n\t\t\t\t  <h2 class=\"pos_abs\">这是带有绝对定位的标题4</h2>\n\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n\n\t\t\t\t<div class=\"explaininfo\">\n                    <p>5.position==absolute本身加top,left,right,bottom,父级加relative</p>\n                    <p>5.1---脱离文档留,相对于父元素进行定位</p>\n                    <p>5.2---相对于最近的非 static 定位祖先元素的偏移,所以第二个随着第一个absolute偏移</p>\n                </div>\n\t\t\t\t<div class=\"pr\">\n\t\t\t\t  <div class=\"pos_abs f40\">这是带有绝对定位的标题5\n\t\t\t\t   \t<div class=\"pos_abs f40\">这是带有绝对定位的标题5</div>\n\t\t\t\t  </div>\n\t\t\t\t  <h2 class=\"pos_abs f40\">这是带有绝对定位的标题5\n\t\t\t\t   \t<h2 class=\"pos_abs f40\">这是带有绝对定位的标题5</h2>\n\t\t\t\t  </h2>\n\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n\n\t\t\t\t<div class=\"explaininfo\">\n                    <p>6.position==absolute本身加top,left,right,bottom,父级加relative</p>\n                    <p>6.1---脱离文档留,相对于父元素进行定位</p>\n                    <p>6.2---相对于最近的非 static 定位祖先元素的偏移,但是没有加top,left,right,bottom,所以脱离文档留,在元素里</p>\n                </div>\n\t\t\t\t<div class=\"pr\">\n\t\t\t\t  <div class=\"pos_abs f40\">这是带有绝对定位的标题6\n\t\t\t\t   \t<div class=\"pos f40\">这是带有绝对定位的标题6</div>\n\t\t\t\t  </div>\n\t\t\t\t  <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 10px，距离页面顶部 10px。</p>\n\n\t\t\t\t</div>\n\t\t\t\t<br/><br/><br/><br/>\n<pre>\n <code class=\"scss\">\n     .pos{\n\t\tposition:absolute;\n\t\tcolor:green;\n\n\t}\n\n\t.pos_abs\n\t{\n\t\tposition:absolute;\n\t\tleft:10px;\n\t\ttop:10px\n\t}\n\n</code>\n</div>\n";

/***/ }

});
//# sourceMappingURL=11.30a6cd06.js.map