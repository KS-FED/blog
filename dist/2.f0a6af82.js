webpackJsonp([2],{

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(88)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] dev/js/views/app.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(89)
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
	  var id = "_v-60fdbd74/app.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 88:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	// <!--         <h2>技术分享 👌</h2> -->
	//         <router-view ></router-view>
	//     </div>
	// </template>
	// <script type="text/javascript">
	exports.default = {
	    data: function data() {
	        return {};
	    },
	    ready: function ready() {
	        function isanzuo_weixin_browser() {
	            var ua = navigator.userAgent.toLowerCase();
	            return (/micromessenger/.test(ua) && ~ua.indexOf('android')
	            );
	        }
	        if (isanzuo_weixin_browser()) {
	            alert(true);
	        }
	    }
	};
	// </script>
	/* generated by vue-loader */

/***/ },

/***/ 89:
/***/ function(module, exports) {

	module.exports = "\n    <div>\n<!--         <h2>技术分享 👌</h2> -->\n        <router-view ></router-view>\n    </div>\n";

/***/ }

});
//# sourceMappingURL=2.f0a6af82.js.map