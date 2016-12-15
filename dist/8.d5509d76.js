webpackJsonp([8],{

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

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(109)
	__vue_template__ = __webpack_require__(111)
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
	  var id = "_v-34e03738/example2.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(110);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(98)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./example2.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./example2.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(40)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.example1{\n    display:flex;\n    display:-webkit-flex;\n    display:box;\n    display:-webkit-box; /*有*/\n    display:-moz-flex;\n    display:-ms-flexbox;\n    width:100%;\n    border:1px solid black;\n}\n.example2{\n     display:-webkit-box;\n     display:flex;\n    display:-webkit-flex;\n    display:box;\n    /*display:-webkit-box; 没有*/\n    display:-moz-flex;\n    display:-ms-flexbox;\n    width:100%;\n    border:1px solid black;\n}\n\n\n\n#p1\n{\n   -webkit-box-flex:1;\n   -ms-flex:1;\n   flex: 1;\n    border:1px solid red;\n}\n\n#p2\n{\n    -webkit-box-flex:2;\n    -ms-flex:2;\n    flex: 2;\n    border:1px solid blue;\n}\n.inline #p1\n{\n   -webkit-box-flex:1;\n   -ms-flex:1;\n   flex: 1;\n    border:1px solid red;\n    display: inline;\n}\n\n\n\n\n", "", {"version":3,"sources":["/./dev/js/views/example/example2.vue?0cf9561c"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA2JA;IACA,aAAA;IACA,qBAAA;IACA,YAAA;IACA,oBAAA,CAAA,KAAA;IACA,kBAAA;IACA,oBAAA;IACA,WAAA;IACA,uBAAA;CACA;AACA;KACA,oBAAA;KAAA,aAAA;IACA,qBAAA;IACA,YAAA;IACA,2BAAA;IACA,kBAAA;IACA,oBAAA;IACA,WAAA;IACA,uBAAA;CACA;;;;AAIA;;GAGA,mBAAA;GAEA,WAAA;GACA,QAAA;IACA,qBAAA;CACA;;AAEA;;IAGA,mBAAA;IAEA,WAAA;IACA,QAAA;IACA,sBAAA;CACA;AACA;;GAGA,mBAAA;GAEA,WAAA;GACA,QAAA;IACA,qBAAA;IACA,gBAAA;CACA","file":"example2.vue","sourcesContent":["<template>\n<div>\n   <div class=\"parameterl\">\n   \t\t\t\t<div class=\"explaininfo\">\n                    <p>1.display:-webkit-box属性加的情况下，IOS8以上和以下显示一样</p>\n                </div>\n                <div class=\"p400\">\n\t\t\t\t\t<p class=\"explaininfo\">====有display:-webkit-box属性IOS8以上</p>\n\t\t\t\t\t<!-- 有 -->\n                    <p class=\"explaininfoitem\">1.1---如果是一个div里包含2个块状元素的话，对应比例正常显示</p>\n\t\t\t\t\t<div class=\"example1\">\n\t\t\t\t\t\t<p id=\"p1\">Hello</p>\n\t\t\t\t\t\t<p id=\"p2\">W3School</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<p class=\"explaininfoitem\">1.2---如果是一个div里包含2个内联元素的话，内联元素对应显示自己本身</p>\n                    <div class=\"example1\">\n\t\t\t\t\t\t<span id=\"p1\">Hello</span>\n\t\t\t\t\t\t<span id=\"p2\">W3School</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<br/>\n                    <p class=\"explaininfoitem\">1.3---如果是一个div里包含内联元素和块状元素的话，内联元素对应显示自己本身，块级元素沾满剩余空间</p>\n\t\t\t\t\t<div class=\"example1\">\n                        <span id=\"p2\">W3School</span>\n\t\t\t\t\t\t<p id=\"p1\">Hello</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<br/>\n                    <p class=\"explaininfoitem\">1.4---如果是一个div里包含块状元素和内联元素的话，内联元素对应显示自己本身，块级元素沾满剩余空间</p>\n\t\t\t\t\t<div class=\"example1\">\n                        <p id=\"p2\">W3School</p>\n\t\t\t\t\t\t<span id=\"p1\">Hello</span>\n\t\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t</div>\n                <hr>\n                 <div class=\"p400\">\n                    <p class=\"explaininfo\">====有display:-webkit-box属性IOS8以下</p>\n                    <!-- 有 -->\n                    <p class=\"explaininfoitem\">1.1---如果是一个div里包含2个块状元素的话，对应比例正常显示</p>\n                    <div class=\"example1\">\n                        <p id=\"p1\">Hello</p>\n                        <p id=\"p2\">W3School</p>\n                    </div>\n                    <br/>\n                    <p class=\"explaininfoitem\">1.2---如果是一个div里包含2个内联元素的话，内联元素对应显示自己本身</p>\n                    <div class=\"example1\">\n                        <span id=\"p1\">Hello</span>\n                        <span id=\"p2\">W3School</span>\n                    </div>\n                    <br/>\n                    \n                    <p class=\"explaininfoitem\">1.3---如果是一个div里包含内联元素和块状元素的话，内联元素对应显示自己本身，块级元素沾满剩余空间</p>\n                    <div class=\"example1\">\n                        <span id=\"p2\">W3School</span>\n                        <p id=\"p1\">Hello</p>\n                    </div>\n                    <br/>\n\n                    <p class=\"explaininfoitem\">1.4---如果是一个div里包含块状元素和内联元素的话，内联元素对应显示自己本身，块级元素沾满剩余空间</p>\n                    <div class=\"example1\">\n                        <p id=\"p2\">W3School</p>\n                        <span id=\"p1\">Hello</span>\n                    </div>\n                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\n                </div>\n                <div class=\"explaininfo\">\n                    <p>2.display:-webkit-box属性不加的情况下，IOS8以上和以下显示不一样</p>\n                </div>\n                <div class=\"p400\">\n                    <p class=\"explaininfo\">====没有display:-webkit-box属性IOS8以上</p>\n                    <p class=\"explaininfo\">2.1---IOS8以上所有内联都会转化成块状并且正常显示</p>\n                    <!-- 有 -->\n                    <p class=\"explaininfoitem\">2.1.1---如果是一个div里包含2个块状元素的话，对应比例正常显示</p>\n                    <div class=\"example2\">\n                        <p id=\"p1\">Hello</p>\n                        <p id=\"p2\">W3School</p>\n                    </div>\n                    <br/>\n                    <p class=\"explaininfoitem\">2.1.2---如果是一个div里包含2个内联元素的话，内联都会转化成块状并且正常显示</p>\n                    <div class=\"example2\">\n                        <span id=\"p1\">Hello</span>\n                        <span id=\"p2\">W3School</span>\n                    </div>\n                    <br/>\n                    <!-- 有 -->\n                    <p class=\"explaininfoitem\">2.1.3---如果是一个div里包含内联元素和块状元素的话，内联都会转化成块状并且正常显示</p>\n                    <div class=\"example2\">\n                        <span id=\"p1\">Hello</span>\n                        <p id=\"p2\">W3School</p>\n                    </div>\n                    \n                    <br/>\n                    <p class=\"explaininfoitem\">2.1.4---如果是一个div里包含块状元素和内联元素的话，内联都会转化成块状并且正常显示</p>\n                    <div class=\"example2\">\n                        <p id=\"p2\">W3School</p>\n                        <span id=\"p1\">Hello</span>\n                    </div>\n                        <br/><br/>\n                </div>\n\n                 <div class=\"p400\">\n                    <p class=\"explaininfo\">====没有display:-webkit-box属性IOS8以下</p>\n                    <!-- 有 -->\n                    <p class=\"explaininfo\">2.2---IOS8以下所有块状都会转化成内联显示自己本身</p>\n                    <img src=\"../../../img/ios8.png\"/>\n                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\n                </div>\n\n\n\t\t\t<div>\n\t\t\t\t\n\t\t\t</div>\n   </div>\n\n</div>\n\n\n\n\n\n   <div class=\"param\">\n        <div class=\"questioninfo f15  mb-10\">\n            <p class=\"hlh40\">问题2:display:flex和display:box有什么区别？</p>\n\n        </div>\n\n        <div class=\"bor-top\">\n            <p class=\"lh30 mt-10\"> 前者是flex 2012年的语法，也将是以后标准的语法，大部分浏览器已经实现了无前缀版本。</p>\n            <p class=\"lh30 mt-10\">   后者是2009年的语法，已经过时，是需要加上对应前缀的。</p>\n\n            <p class=\"lh30 mt-20\">所以兼容性的代码，大致如下:</p>\n             <div class=\"highlight\">\n                <pre>\n    <code class=\"language-css\">\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">-webkit-box</span> <span class=\"o\">;</span><span class=\"c\">/* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */</span>\n\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">-moz-box</span><span class=\"o\">;</span><span class=\"c\">/* Firefox 17- */</span>\n\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">-webkit-flex</span><span class=\"o\">;</span><span class=\"c\">/* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */</span>\n\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">-moz-flex</span><span class=\"o\">;</span><span class=\"c\">/* Firefox 18+ */</span>\n\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">-ms-flexbox</span><span class=\"o\">;</span><span class=\"c\">/* IE 10 */</span>\n\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">flex</span><span class=\"o\">;</span><span class=\"c\">/* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */</span>\n    </code>\n                </pre>\n            </div>\n        </div>\n   </div>\n\n\n\n</template>\n<style>\n.example1{\n    display:flex;\n    display:-webkit-flex;\n    display:box;\n    display:-webkit-box; /*有*/\n    display:-moz-flex;\n    display:-ms-flexbox;\n    width:100%;\n    border:1px solid black;\n}\n.example2{\n     display:flex;\n    display:-webkit-flex;\n    display:box;\n    /*display:-webkit-box; 没有*/\n    display:-moz-flex;\n    display:-ms-flexbox;\n    width:100%;\n    border:1px solid black;\n}\n\n\n\n#p1\n{\n   -webkit-flex:1;\n    -webkit-box-flex:1;\n    -moz-box-flex:1;\n    -ms-flex:1;\n    flex: 1;\n    border:1px solid red;\n}\n\n#p2\n{\n    -webkit-flex:2;\n    -webkit-box-flex:2;\n    -moz-box-flex:2;\n    -ms-flex:2;\n    flex: 2;\n    border:1px solid blue;\n}\n.inline #p1\n{\n   -webkit-flex:1;\n    -webkit-box-flex:1;\n    -moz-box-flex:1;\n    -ms-flex:1;\n    flex: 1;\n    border:1px solid red;\n    display: inline;\n}\n\n\n\n\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div>\n   <div class=\"parameterl\">\n   \t\t\t\t<div class=\"explaininfo\">\n                    <p>1.display:-webkit-box属性加的情况下，IOS8以上和以下显示一样</p>\n                </div>\n                <div class=\"p400\">\n\t\t\t\t\t<p class=\"explaininfo\">====有display:-webkit-box属性IOS8以上</p>\n\t\t\t\t\t<!-- 有 -->\n                    <p class=\"explaininfoitem\">1.1---如果是一个div里包含2个块状元素的话，对应比例正常显示</p>\n\t\t\t\t\t<div class=\"example1\">\n\t\t\t\t\t\t<p id=\"p1\">Hello</p>\n\t\t\t\t\t\t<p id=\"p2\">W3School</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<p class=\"explaininfoitem\">1.2---如果是一个div里包含2个内联元素的话，内联元素对应显示自己本身</p>\n                    <div class=\"example1\">\n\t\t\t\t\t\t<span id=\"p1\">Hello</span>\n\t\t\t\t\t\t<span id=\"p2\">W3School</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<br/>\n                    <p class=\"explaininfoitem\">1.3---如果是一个div里包含内联元素和块状元素的话，内联元素对应显示自己本身，块级元素沾满剩余空间</p>\n\t\t\t\t\t<div class=\"example1\">\n                        <span id=\"p2\">W3School</span>\n\t\t\t\t\t\t<p id=\"p1\">Hello</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<br/>\n                    <p class=\"explaininfoitem\">1.4---如果是一个div里包含块状元素和内联元素的话，内联元素对应显示自己本身，块级元素沾满剩余空间</p>\n\t\t\t\t\t<div class=\"example1\">\n                        <p id=\"p2\">W3School</p>\n\t\t\t\t\t\t<span id=\"p1\">Hello</span>\n\t\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t</div>\n                <hr>\n                 <div class=\"p400\">\n                    <p class=\"explaininfo\">====有display:-webkit-box属性IOS8以下</p>\n                    <!-- 有 -->\n                    <p class=\"explaininfoitem\">1.1---如果是一个div里包含2个块状元素的话，对应比例正常显示</p>\n                    <div class=\"example1\">\n                        <p id=\"p1\">Hello</p>\n                        <p id=\"p2\">W3School</p>\n                    </div>\n                    <br/>\n                    <p class=\"explaininfoitem\">1.2---如果是一个div里包含2个内联元素的话，内联元素对应显示自己本身</p>\n                    <div class=\"example1\">\n                        <span id=\"p1\">Hello</span>\n                        <span id=\"p2\">W3School</span>\n                    </div>\n                    <br/>\n                    \n                    <p class=\"explaininfoitem\">1.3---如果是一个div里包含内联元素和块状元素的话，内联元素对应显示自己本身，块级元素沾满剩余空间</p>\n                    <div class=\"example1\">\n                        <span id=\"p2\">W3School</span>\n                        <p id=\"p1\">Hello</p>\n                    </div>\n                    <br/>\n\n                    <p class=\"explaininfoitem\">1.4---如果是一个div里包含块状元素和内联元素的话，内联元素对应显示自己本身，块级元素沾满剩余空间</p>\n                    <div class=\"example1\">\n                        <p id=\"p2\">W3School</p>\n                        <span id=\"p1\">Hello</span>\n                    </div>\n                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\n                </div>\n                <div class=\"explaininfo\">\n                    <p>2.display:-webkit-box属性不加的情况下，IOS8以上和以下显示不一样</p>\n                </div>\n                <div class=\"p400\">\n                    <p class=\"explaininfo\">====没有display:-webkit-box属性IOS8以上</p>\n                    <p class=\"explaininfo\">2.1---IOS8以上所有内联都会转化成块状并且正常显示</p>\n                    <!-- 有 -->\n                    <p class=\"explaininfoitem\">2.1.1---如果是一个div里包含2个块状元素的话，对应比例正常显示</p>\n                    <div class=\"example2\">\n                        <p id=\"p1\">Hello</p>\n                        <p id=\"p2\">W3School</p>\n                    </div>\n                    <br/>\n                    <p class=\"explaininfoitem\">2.1.2---如果是一个div里包含2个内联元素的话，内联都会转化成块状并且正常显示</p>\n                    <div class=\"example2\">\n                        <span id=\"p1\">Hello</span>\n                        <span id=\"p2\">W3School</span>\n                    </div>\n                    <br/>\n                    <!-- 有 -->\n                    <p class=\"explaininfoitem\">2.1.3---如果是一个div里包含内联元素和块状元素的话，内联都会转化成块状并且正常显示</p>\n                    <div class=\"example2\">\n                        <span id=\"p1\">Hello</span>\n                        <p id=\"p2\">W3School</p>\n                    </div>\n                    \n                    <br/>\n                    <p class=\"explaininfoitem\">2.1.4---如果是一个div里包含块状元素和内联元素的话，内联都会转化成块状并且正常显示</p>\n                    <div class=\"example2\">\n                        <p id=\"p2\">W3School</p>\n                        <span id=\"p1\">Hello</span>\n                    </div>\n                        <br/><br/>\n                </div>\n\n                 <div class=\"p400\">\n                    <p class=\"explaininfo\">====没有display:-webkit-box属性IOS8以下</p>\n                    <!-- 有 -->\n                    <p class=\"explaininfo\">2.2---IOS8以下所有块状都会转化成内联显示自己本身</p>\n                    <img src=\"" + __webpack_require__(112) + "\"/>\n                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>\n                </div>\n\n\n\t\t\t<div>\n\t\t\t\t\n\t\t\t</div>\n   </div>\n\n</div>\n\n\n\n\n\n   <div class=\"param\">\n        <div class=\"questioninfo f15  mb-10\">\n            <p class=\"hlh40\">问题2:display:flex和display:box有什么区别？</p>\n\n        </div>\n\n        <div class=\"bor-top\">\n            <p class=\"lh30 mt-10\"> 前者是flex 2012年的语法，也将是以后标准的语法，大部分浏览器已经实现了无前缀版本。</p>\n            <p class=\"lh30 mt-10\">   后者是2009年的语法，已经过时，是需要加上对应前缀的。</p>\n\n            <p class=\"lh30 mt-20\">所以兼容性的代码，大致如下:</p>\n             <div class=\"highlight\">\n                <pre>\n    <code class=\"language-css\">\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">-webkit-box</span> <span class=\"o\">;</span><span class=\"c\">/* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */</span>\n\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">-moz-box</span><span class=\"o\">;</span><span class=\"c\">/* Firefox 17- */</span>\n\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">-webkit-flex</span><span class=\"o\">;</span><span class=\"c\">/* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */</span>\n\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">-moz-flex</span><span class=\"o\">;</span><span class=\"c\">/* Firefox 18+ */</span>\n\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">-ms-flexbox</span><span class=\"o\">;</span><span class=\"c\">/* IE 10 */</span>\n\n    <span class=\"nt\">display</span><span class=\"o\">:</span><span class=\"nt\">flex</span><span class=\"o\">;</span><span class=\"c\">/* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */</span>\n    </code>\n                </pre>\n            </div>\n        </div>\n   </div>\n\n\n\n";

/***/ },

/***/ 112:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "284fdb1aba40a867b66a83762b30f3ab.png";

/***/ }

});
//# sourceMappingURL=8.d5509d76.js.map