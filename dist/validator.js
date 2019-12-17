(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SiriusValidation"] = factory();
	else
		root["SiriusValidation"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/build.js":
/*!**********************!*\
  !*** ./src/build.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lang_en__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang/en */ \"./src/lang/en.js\");\n/* harmony import */ var _error_compiler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error_compiler */ \"./src/error_compiler.js\");\n/* harmony import */ var _utils_compile_rules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/compile_rules */ \"./src/utils/compile_rules.js\");\n/* harmony import */ var _utils_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/get */ \"./src/utils/get.js\");\n/* harmony import */ var _utils_set__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/set */ \"./src/utils/set.js\");\n/* harmony import */ var _utils_get_matching_rules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/get_matching_rules */ \"./src/utils/get_matching_rules.js\");\n/* harmony import */ var _utils_is_nested__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/is_nested */ \"./src/utils/is_nested.js\");\n/* harmony import */ var _utils_ensure_selector_paths_are_present__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/ensure_selector_paths_are_present */ \"./src/utils/ensure_selector_paths_are_present.js\");\n/* harmony import */ var _utils_flatten_object__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/flatten_object */ \"./src/utils/flatten_object.js\");\n/* harmony import */ var _utils_compile_references__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/compile_references */ \"./src/utils/compile_references.js\");\n/* harmony import */ var _utils_get_ref_path__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/get_ref_path */ \"./src/utils/get_ref_path.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\n\n\n\n\n\n\n\n\n\n/**\n * Generates a validation object\n *\n * @param rules - validation rules\n * @param change_handler - function to be executed whenever the validation or pending state changes (optional)\n * @param error_handler - function to be executed whenever there's an error during validation\n * @param messages - special error messages that are added to the defaults (optional)\n * @param error_compiler - function to generate the error messages (optional)\n * @returns {validator object}\n */\n\nfunction build(rules, change_handler, error_handler, messages, error_compiler) {\n  var $touched = {}; // stores the paths that have been in `set()` calls\n\n  var $dirty = {}; // stores the paths that have been in `set()` calls AND changed the initial value\n\n  var $pending = {}; // stores the paths that are waiting for async validators to resolve\n\n  var $errors = {}; // stores the error messages for invalid paths\n\n  var $references = {}; // stores the list of compiled references between linked selectors\n\n  var $data = {}; // holds the data that is being validated\n\n  error_handler = error_handler || console.log;\n  error_compiler = error_compiler || _error_compiler__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n  messages = Object.assign({}, _lang_en__WEBPACK_IMPORTED_MODULE_0__[\"default\"], messages);\n\n  var notify_validation_changes = function notify_validation_changes(path) {\n    typeof change_handler === 'function' && change_handler.call(v, 'validation', path);\n  };\n\n  var notify_state_changes = function notify_state_changes(path) {\n    typeof change_handler === 'function' && change_handler.call(v, 'state', path);\n  };\n\n  var v = {\n    $rules: {},\n\n    /**\n     * Returns all the data that is being validated by the form\n     * @returns {{}}\n     */\n    getData: function getData() {\n      return $data;\n    },\n\n    /**\n     * @example\n     * v.setData({a: 'b'})\n     * v.setData({'a[b]': ['c', 'd']}, true, true) // clears previous data and skips validation\n     *\n     * @param new_data\n     * @param skip_validation | boolean - will not perform validation of data\n     * @param clean | boolean - will remove previously existing values\n     */\n    setData: function setData(new_data, skip_validation, reset) {\n      var _this = this;\n\n      if (reset) {\n        Object.keys(new_data).forEach(function (path) {\n          delete $data[path];\n        });\n      }\n\n      Object.keys(new_data).forEach(function (path) {\n        _this.set(path, new_data[path], skip_validation);\n      });\n    },\n    get: function get(path) {\n      return Object(_utils_get__WEBPACK_IMPORTED_MODULE_3__[\"default\"])($data, path);\n    },\n\n    /**\n     * Method to populate leaf items in the data object tree\n     * Use setData() to populate sub-trees\n     *\n     * @param path\n     * @param value\n     * @param skip_validation | boolean - will skip validation\n     */\n    set: function set(path, value, skip_validation) {\n      var _this2 = this;\n\n      var previous_value = this.get(path);\n\n      Object(_utils_set__WEBPACK_IMPORTED_MODULE_4__[\"default\"])($data, path, value);\n\n      this.setTouched(path);\n\n      if (previous_value !== value) {\n        this.setDirty(path);\n        skip_validation || this.validateItem(path);\n      }\n\n      if (!skip_validation && $references[path]) {\n        $references[path].forEach(function (ref) {\n          var ref_path = Object(_utils_get_ref_path__WEBPACK_IMPORTED_MODULE_10__[\"default\"])(path, ref);\n\n          if (_this2.isTouched(ref_path)) {\n            _this2.validateItem(ref_path);\n          }\n        });\n      }\n    },\n\n    /**\n     * @example\n     * v.addRules('username', 'required | min_length(6)');\n     * v.addRules({\n     *  username: 'required | min_length(6)',\n     *  password: 'required | min_length(6)'\n     * });\n     *\n     * @param selector\n     * @param rules\n     */\n    addRules: function addRules(selector, selector_rules) {\n      var _this3 = this;\n\n      if (_typeof(selector) === 'object') {\n        Object.keys(selector).forEach(function (key) {\n          _this3.$rules[key] = Object(_utils_compile_rules__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(selector[key]);\n        });\n      } else {\n        this.$rules[selector] = Object(_utils_compile_rules__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(selector_rules);\n      }\n\n      $references = Object(_utils_compile_references__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(this.$rules);\n    },\n\n    /**\n     * @example\n     * v.removeRules('username', 'required')\n     * v.removeRules('username', ['required', 'min_length']\n     *\n     * @param selector\n     * @param rules\n     */\n    removeRules: function removeRules(selector, rules) {\n      var _this4 = this;\n\n      if (!this.$rules[selector]) {\n        return;\n      }\n\n      if (!Array.isArray(rules)) {\n        rules = [rules];\n      }\n\n      rules.forEach(function (rule) {\n        if (_this4.$rules[selector][rule]) {\n          delete _this4.$rules[selector][rule];\n        }\n      });\n      $references = Object(_utils_compile_references__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(this.$rules);\n    },\n    setTouched: function setTouched(path) {\n      $touched[path] = true;\n    },\n    isTouched: function isTouched(path) {\n      return !!$touched[path];\n    },\n    resetTouched: function resetTouched() {\n      $touched = {};\n    },\n    setDirty: function setDirty(path) {\n      $dirty[path] = true;\n    },\n    isDirty: function isDirty(path) {\n      return !!$dirty[path];\n    },\n    resetDirty: function resetDirty() {\n      $dirty = {};\n    },\n    setError: function setError(path, message) {\n      $errors[path] = message;\n      notify_validation_changes(path);\n    },\n\n    /**\n     * If path is not provided it returns the valid state for the entire form\n     *\n     * @param path\n     * @returns {boolean}\n     */\n    hasError: function hasError(path) {\n      if (!path) {\n        return Object.values($errors).filter(function (value) {\n          return !!value;\n        }).length > 0;\n      }\n\n      return !!$errors[path];\n    },\n    getError: function getError(path) {\n      return $errors[path];\n    },\n    setPending: function setPending(path, status) {\n      $pending[path] = !!status;\n      notify_state_changes(path);\n    },\n\n    /**\n     * If path is not provided it returns the pending state for the entire form\n     *\n     * @param path\n     * @returns {*}\n     */\n    isPending: function isPending(path) {\n      if (!path) {\n        return !!Object.values($pending).find(function (value) {\n          return !!value;\n        });\n      }\n\n      return $pending[path];\n    },\n    isValid: function isValid() {\n      return !this.hasError();\n    },\n    validateItem: function validateItem(path) {\n      var _this5 = this;\n\n      var matching_rules = Object(_utils_get_matching_rules__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(path, this.$rules);\n      var value = this.get(path); // recursively validate children\n\n      if (Object(_utils_is_nested__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(value)) {\n        // remove previous error messages\n        Object.keys($errors).forEach(function (item) {\n          if (item !== path && item.substr(0, path.length) === path) {\n            delete $errors[item];\n          }\n        });\n        Object.keys(value).forEach(function (key) {\n          _this5.validateItem(path + '[' + key + ']');\n        });\n      } // no rules => field is valid\n\n\n      if (!matching_rules || matching_rules.length === 0) {\n        this.setError(path, null);\n        return;\n      }\n\n      try {\n        var error_message = null;\n\n        var _loop2 = function _loop2() {\n          var current_rule = matching_rules[i];\n\n          if (!current_rule.validator || !current_rule.validator.validate) {\n            return \"continue\";\n          }\n\n          var result = current_rule.validator.validate(value, path, $data);\n\n          if (result === false) {\n            error_message = error_compiler(_this5, path, current_rule.selector, current_rule.name, messages);\n            return \"break\";\n          } // allow ONLY one async validator\n          // @todo find solution to allow for multiple async validators?\n\n\n          if (result.then) {\n            _this5.setPending(path, true);\n\n            result.then(function (result) {\n              if (result === false) {\n                _this5.setError(path, error_compiler(_this5, path, current_rule.selector, current_rule.name, messages));\n              } else {\n                _this5.setError(path, null);\n              }\n\n              _this5.setPending(path, false);\n            })[\"catch\"](function (e) {\n              error_handler.call(this, 'field_validation', e);\n            }); // noinspection JSAnnotator\n\n            return \"break\";\n          }\n        };\n\n        _loop: for (var i = 0, len = matching_rules.length; i < len; i++) {\n          var _ret = _loop2();\n\n          switch (_ret) {\n            case \"continue\":\n              continue;\n\n            case \"break\":\n              break _loop;\n          }\n        }\n\n        this.setError(path, error_message);\n      } catch (e) {\n        error_handler.call(this, 'field_validation', e);\n      }\n    },\n    validate: function validate() {\n      var _this6 = this;\n\n      Object(_utils_ensure_selector_paths_are_present__WEBPACK_IMPORTED_MODULE_7__[\"default\"])($data, Object.keys(this.$rules));\n      var paths = Object.keys(Object(_utils_flatten_object__WEBPACK_IMPORTED_MODULE_8__[\"default\"])($data));\n      paths.forEach(function (path) {\n        // validate if not previously validated\n        if (!$errors.hasOwnProperty(path)) {\n          _this6.validateItem(path);\n\n          _this6.setTouched(path);\n\n          _this6.setDirty(path);\n        }\n      });\n\n      if (!this.isPending()) {\n        return Promise.resolve(this.isValid());\n      }\n\n      return new Promise(function (resolve) {\n        var start = new Date();\n        var interval = setInterval(function () {\n          var current = new Date();\n\n          if (current - start > 5000) {\n            clearInterval(interval);\n            error_handler.call(_this6, 'promise', new Error('Data validation has timed out'));\n          } else if (!_this6.isPending()) {\n            resolve(_this6.isValid());\n          }\n        }, 100);\n      });\n    },\n    reset: function reset() {\n      this.resetTouched();\n      this.resetDirty();\n      $pending = {};\n      $errors = {};\n    }\n  };\n  rules && v.addRules(rules);\n  return v;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (build);\n\n//# sourceURL=webpack://SiriusValidation/./src/build.js?");

/***/ }),

/***/ "./src/error_compiler.js":
/*!*******************************!*\
  !*** ./src/error_compiler.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lang_en_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang/en.js */ \"./src/lang/en.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/get_target_value */ \"./src/utils/get_target_value.js\");\n\n\n/**\n * Default function that generates the error messages\n * From a list of messages it extracts the most specific one and\n * replaces the placeholders (eg: \"{min}\" with the actual values\n *\n * @param validator\n * @param path\n * @param failed_rule_selector\n * @param failed_rule_name\n * @param messages\n * @returns {*}\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (validator, path, failed_rule_selector, failed_rule_name, messages) {\n  messages = messages || _lang_en_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n  var params = validator.$rules[failed_rule_selector][failed_rule_name].params || {};\n  var computed_params = {};\n  /**\n   * Compute the values of the params since they will be replaced in the message templates\n   */\n\n  Object.keys(params).forEach(function (param) {\n    computed_params[params] = Object(_utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(validator.data, path, params[param]);\n  });\n  /**\n   * The potential messages contain keys from the `messages` variable that may be used to generate the error message\n   * The first one that is found is used\n   */\n\n  var potential_messages = [path + ':' + failed_rule_name, failed_rule_selector + ':' + failed_rule_name, failed_rule_name];\n  var matched_message = potential_messages.find(function (msg) {\n    return messages[msg];\n  });\n  var error = matched_message ? messages[matched_message] : false;\n\n  if (typeof error === \"function\") {\n    return error(validator, path, failed_rule_selector);\n  }\n\n  if (error) {\n    // replace placeholders with actual parameter values\n    Object.keys(params).forEach(function (p) {\n      error = error.replace(new RegExp('\\{' + p + '\\}', 'g'), Object(_utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(validator.getData(), path, params[p]));\n    });\n    return error;\n  }\n\n  return messages._default || 'Field is not valid';\n});\n\n//# sourceURL=webpack://SiriusValidation/./src/error_compiler.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _build__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build */ \"./src/build.js\");\n/* harmony import */ var _rule_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rule_registry */ \"./src/rule_registry.js\");\n/* harmony import */ var _utils_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/get */ \"./src/utils/get.js\");\n/* harmony import */ var _utils_set__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/set */ \"./src/utils/set.js\");\n/* harmony import */ var _utils_get_ref_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/get_ref_path */ \"./src/utils/get_ref_path.js\");\n/* harmony import */ var _utils_is_path_matching_selector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/is_path_matching_selector */ \"./src/utils/is_path_matching_selector.js\");\n/* harmony import */ var _lang_en__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lang/en */ \"./src/lang/en.js\");\n\n\n\n\n\n\n\n\nfunction add_rule(name, factory, message) {\n  _rule_registry__WEBPACK_IMPORTED_MODULE_1__[\"default\"][name] = factory;\n  _lang_en__WEBPACK_IMPORTED_MODULE_6__[\"default\"][name] = message;\n}\n\nvar SiriusValidation = {\n  messages: _lang_en__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  rules: _rule_registry__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  add_rule: add_rule,\n  utils: {\n    get: _utils_get__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    set: _utils_set__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    get_ref_path: _utils_get_ref_path__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n    is_path_matching_selector: _utils_is_path_matching_selector__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  },\n  build: _build__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (SiriusValidation);\n\n//# sourceURL=webpack://SiriusValidation/./src/index.js?");

/***/ }),

/***/ "./src/lang/en.js":
/*!************************!*\
  !*** ./src/lang/en.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  _default: 'Field is not valid',\n  required: 'This field is required',\n  required_with: 'This field is required',\n  required_without: 'This field is required',\n  email: 'This field is not a valid email',\n  url: 'This field is not a valid web address (must start with http:// or https://)',\n  contains: 'This field should contain \"{target}\"',\n  starts_with: 'This field should start with \"{target}\"',\n  ends_with: 'This field should end with \"{target}\"',\n  equal: 'This field should be equal to {target}',\n  min: 'This field should be greater or equal to {min}',\n  max: 'This field should be smaller or equal to {max}',\n  alpha: 'This field should contain only letters',\n  alpha_num: 'This field should contain only letters and numbers',\n  slug: 'This field should contain only letters, numbers, \"-\" or \"_\"',\n  regex: 'This field does not match the pattern',\n  greater_than: 'This field should be greater or equal to {min}',\n  less_than: 'This field should be smaller or equal to {max}',\n  array_min_length: 'This list should contain at least {min} items',\n  array_max_length: 'This list should contain less than {max} items',\n  min_length: 'This field should have at least {min} characters',\n  max_length: 'This field should have less than {max} characters',\n  in_list: 'This field should be selected from the list of accepted values',\n  not_in_list: 'This field has a value that is blacklisted'\n});\n\n//# sourceURL=webpack://SiriusValidation/./src/lang/en.js?");

/***/ }),

/***/ "./src/rule/alpha.js":
/*!***************************!*\
  !*** ./src/rule/alpha.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value) || /^[a-zA-Z]*$/.test(value);\n}));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/alpha.js?");

/***/ }),

/***/ "./src/rule/alpha_num.js":
/*!*******************************!*\
  !*** ./src/rule/alpha_num.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value) || /^[a-zA-Z0-9]*$/.test(value);\n}));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/alpha_num.js?");

/***/ }),

/***/ "./src/rule/contains.js":
/*!******************************!*\
  !*** ./src/rule/contains.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value) || value.indexOf(this.params.target) !== -1;\n}, ['target']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/contains.js?");

/***/ }),

/***/ "./src/rule/email.js":
/*!***************************!*\
  !*** ./src/rule/email.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  var regex = /^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value) || regex.test(value.toLowerCase());\n}));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/email.js?");

/***/ }),

/***/ "./src/rule/ends_with.js":
/*!*******************************!*\
  !*** ./src/rule/ends_with.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value) || value.substr(-this.params.target.length) === this.params.target;\n}, ['target']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/ends_with.js?");

/***/ }),

/***/ "./src/rule/equal.js":
/*!***************************!*\
  !*** ./src/rule/equal.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n\n\n/**\n * @example\n * equal(10) // validation will pass if the item being validated is 10 or '10'\n * equal('@email_confirmation') // validation will pass if the item has the same value as the field 'email_confirmation'\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value, path, context) {\n  return value == Object(_utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(context, path, this.params.target);\n}, ['target']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/equal.js?");

/***/ }),

/***/ "./src/rule/greater_than.js":
/*!**********************************!*\
  !*** ./src/rule/greater_than.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value, path, context) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value) || +value >= +Object(_utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(context, path, this.params.min);\n}, ['min']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/greater_than.js?");

/***/ }),

/***/ "./src/rule/in_list.js":
/*!*****************************!*\
  !*** ./src/rule/in_list.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value) || this.params.target.indexOf(value) !== -1;\n}, ['target']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/in_list.js?");

/***/ }),

/***/ "./src/rule/integer.js":
/*!*****************************!*\
  !*** ./src/rule/integer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value) || value == parseInt(value);\n}));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/integer.js?");

/***/ }),

/***/ "./src/rule/lower_than.js":
/*!********************************!*\
  !*** ./src/rule/lower_than.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value, path, context) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value) || +value <= Object(_utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(context, path, this.params.max);\n}, ['max']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/lower_than.js?");

/***/ }),

/***/ "./src/rule/max_length.js":
/*!********************************!*\
  !*** ./src/rule/max_length.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value, path, context) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value) || value.length && value.length <= Object(_utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(context, path, this.params.max);\n}, ['max']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/max_length.js?");

/***/ }),

/***/ "./src/rule/min_length.js":
/*!********************************!*\
  !*** ./src/rule/min_length.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value, path, context) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value) || value.length && value.length >= Object(_utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(context, path, this.params.min);\n}, ['min']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/min_length.js?");

/***/ }),

/***/ "./src/rule/not_in_list.js":
/*!*********************************!*\
  !*** ./src/rule/not_in_list.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value) || this.params.target.indexOf(value) === -1;\n}, ['target']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/not_in_list.js?");

/***/ }),

/***/ "./src/rule/number.js":
/*!****************************!*\
  !*** ./src/rule/number.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value) || value == parseFloat(value);\n}));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/number.js?");

/***/ }),

/***/ "./src/rule/regex.js":
/*!***************************!*\
  !*** ./src/rule/regex.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value) || new RegExp(this.params.pattern, this.params.modifiers || '').test(value);\n}, ['pattern', 'modifiers']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/regex.js?");

/***/ }),

/***/ "./src/rule/required.js":
/*!******************************!*\
  !*** ./src/rule/required.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value);\n}));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/required.js?");

/***/ }),

/***/ "./src/rule/required_with.js":
/*!***********************************!*\
  !*** ./src/rule/required_with.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value, path, context) {\n  return !!Object(_utils_get_target_value__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(context, path, this.params.target) ? Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value) : true;\n}, ['target']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/required_with.js?");

/***/ }),

/***/ "./src/rule/required_without.js":
/*!**************************************!*\
  !*** ./src/rule/required_without.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value, path, context) {\n  return !Object(_utils_get_target_value__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(context, path, this.params.target) ? Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value) : true;\n}, ['target']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/required_without.js?");

/***/ }),

/***/ "./src/rule/rule_factory.js":
/*!**********************************!*\
  !*** ./src/rule/rule_factory.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar rule_factory = function rule_factory(validationFn, params_names) {\n  return function () {\n    var options = Array.prototype.slice.call(arguments);\n    var params = {};\n    var refs = [];\n\n    if (params_names) {\n      params = params_names.reduce(function (acc, name, idx) {\n        acc[name] = options[idx];\n        return acc;\n      }, {});\n      refs = params_names.reduce(function (acc, name, idx) {\n        var param = options[idx];\n\n        if ((typeof param === 'string' || param instanceof String) && param.substr(0, 1) === '@') {\n          acc.push(param.substr(1));\n        }\n\n        return acc;\n      }, []);\n    } else {\n      params = options;\n    }\n\n    return {\n      refs: refs,\n      params: params,\n      validate: validationFn\n    };\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (rule_factory);\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/rule_factory.js?");

/***/ }),

/***/ "./src/rule/slug.js":
/*!**************************!*\
  !*** ./src/rule/slug.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_get_target_value__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_target_value */ \"./src/utils/get_target_value.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(value) || /^[a-zA-Z0-9_-]*$/.test(value);\n}));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/slug.js?");

/***/ }),

/***/ "./src/rule/starts_with.js":
/*!*********************************!*\
  !*** ./src/rule/starts_with.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value) || value.substr(0, this.params.target.length) === this.params.target;\n}, ['target']));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/starts_with.js?");

/***/ }),

/***/ "./src/rule/url.js":
/*!*************************!*\
  !*** ./src/rule/url.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule_factory */ \"./src/rule/rule_factory.js\");\n/* harmony import */ var _utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/value_is_present */ \"./src/utils/value_is_present.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_rule_factory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (value) {\n  var regex = /https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;\n  return !Object(_utils_value_is_present__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value) || regex.test(value.toLowerCase());\n}));\n\n//# sourceURL=webpack://SiriusValidation/./src/rule/url.js?");

/***/ }),

/***/ "./src/rule_registry.js":
/*!******************************!*\
  !*** ./src/rule_registry.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_required__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule/required */ \"./src/rule/required.js\");\n/* harmony import */ var _rule_required_with__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rule/required_with */ \"./src/rule/required_with.js\");\n/* harmony import */ var _rule_required_without__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rule/required_without */ \"./src/rule/required_without.js\");\n/* harmony import */ var _rule_equal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rule/equal */ \"./src/rule/equal.js\");\n/* harmony import */ var _rule_greater_than__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rule/greater_than */ \"./src/rule/greater_than.js\");\n/* harmony import */ var _rule_lower_than__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rule/lower_than */ \"./src/rule/lower_than.js\");\n/* harmony import */ var _rule_min_length__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rule/min_length */ \"./src/rule/min_length.js\");\n/* harmony import */ var _rule_max_length__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rule/max_length */ \"./src/rule/max_length.js\");\n/* harmony import */ var _rule_email__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rule/email */ \"./src/rule/email.js\");\n/* harmony import */ var _rule_url__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rule/url */ \"./src/rule/url.js\");\n/* harmony import */ var _rule_contains__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./rule/contains */ \"./src/rule/contains.js\");\n/* harmony import */ var _rule_starts_with__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./rule/starts_with */ \"./src/rule/starts_with.js\");\n/* harmony import */ var _rule_ends_with__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./rule/ends_with */ \"./src/rule/ends_with.js\");\n/* harmony import */ var _rule_in_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./rule/in_list */ \"./src/rule/in_list.js\");\n/* harmony import */ var _rule_not_in_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./rule/not_in_list */ \"./src/rule/not_in_list.js\");\n/* harmony import */ var _rule_alpha__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./rule/alpha */ \"./src/rule/alpha.js\");\n/* harmony import */ var _rule_alpha_num__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./rule/alpha_num */ \"./src/rule/alpha_num.js\");\n/* harmony import */ var _rule_slug__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./rule/slug */ \"./src/rule/slug.js\");\n/* harmony import */ var _rule_regex__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./rule/regex */ \"./src/rule/regex.js\");\n/* harmony import */ var _rule_integer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./rule/integer */ \"./src/rule/integer.js\");\n/* harmony import */ var _rule_number__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./rule/number */ \"./src/rule/number.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/**\n * Holds the built-in validation rules and here we add the custom rules\n *\n * @type {{required: *, required_with: *, required_without: *, equal: *, greater_than: *, lower_than: *, min: *, max: *, min_length: *, max_length: *, contains: *, starts_with: *, ends_with: *, email: *, url: *, in_list: *, not_in_list: *, alpha: *, alpha_num: *, slug: *, regex: *, integer: *, number: *, array_min_length: *, array_max_length: *}}\n */\n\nvar registry = {\n  required: _rule_required__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  required_with: _rule_required_with__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  required_without: _rule_required_without__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  equal: _rule_equal__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  greater_than: _rule_greater_than__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  lower_than: _rule_lower_than__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  min: _rule_greater_than__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  max: _rule_lower_than__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  min_length: _rule_min_length__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  max_length: _rule_max_length__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  contains: _rule_contains__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  starts_with: _rule_starts_with__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  ends_with: _rule_ends_with__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n  email: _rule_email__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  url: _rule_url__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  in_list: _rule_in_list__WEBPACK_IMPORTED_MODULE_13__[\"default\"],\n  not_in_list: _rule_not_in_list__WEBPACK_IMPORTED_MODULE_14__[\"default\"],\n  alpha: _rule_alpha__WEBPACK_IMPORTED_MODULE_15__[\"default\"],\n  alpha_num: _rule_alpha_num__WEBPACK_IMPORTED_MODULE_16__[\"default\"],\n  slug: _rule_slug__WEBPACK_IMPORTED_MODULE_17__[\"default\"],\n  regex: _rule_regex__WEBPACK_IMPORTED_MODULE_18__[\"default\"],\n  integer: _rule_integer__WEBPACK_IMPORTED_MODULE_19__[\"default\"],\n  number: _rule_number__WEBPACK_IMPORTED_MODULE_20__[\"default\"],\n  array_min_length: _rule_min_length__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  array_max_length: _rule_max_length__WEBPACK_IMPORTED_MODULE_7__[\"default\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (registry);\n\n//# sourceURL=webpack://SiriusValidation/./src/rule_registry.js?");

/***/ }),

/***/ "./src/utils/compile_references.js":
/*!*****************************************!*\
  !*** ./src/utils/compile_references.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _foreach_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foreach_object */ \"./src/utils/foreach_object.js\");\n\n/**\n * Creates a list of references between various paths in the data\n * that will be used to trigger the validation of other fields\n *\n * Scenario: user fills out the password field and then the password_confirm field which\n * must be the same as the password `equal(\"@password\")`. Everything looks fine.\n * Now, the user changes the password so you want to revalidate the password_confirm field\n *\n * A validation rule may contain a `refs` property to hold the references to other fields\n *\n * In this function we compute the revereted relations\n *\n * from selector => rule => [refs] to\n * ref => [selectors]\n *\n * @param rules\n * @returns {{}}\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (rules) {\n  var references = {};\n  Object(_foreach_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(rules, function (sel, sel_rules) {\n    Object(_foreach_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(sel_rules, function (name, validator) {\n      if (!validator.refs || !validator.refs.length) {\n        return;\n      }\n\n      validator.refs.forEach(function (item) {\n        references[item] = references[item] || [];\n        references[item].push(sel);\n      });\n    });\n  });\n  return references;\n});\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/compile_references.js?");

/***/ }),

/***/ "./src/utils/compile_rules.js":
/*!************************************!*\
  !*** ./src/utils/compile_rules.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rule_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule_registry */ \"./src/rule_registry.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n/**\n * Extract the name and parameters of a rule\n *\n * @param rule\n * @returns {*}\n */\n\nfunction extract_rule_details(rule) {\n  if (rule.indexOf('(') === -1) {\n    return {\n      name: rule,\n      params: []\n    };\n  }\n\n  if (rule.substr(-1, 1) !== ')') {\n    throw 'Rule expression is not correct. Good expression: \"between(3,5)\"';\n  }\n\n  var first_para = rule.indexOf('(');\n  var matches = [rule.substr(0, first_para), rule.substr(first_para + 1, rule.length - first_para - 2)];\n  return {\n    name: matches[0],\n    params: matches[1] ? JSON.parse('[' + matches[1] + ']') : ''\n  };\n}\n/**\n * Generates the rules object from a rule definition\n * @param definition - ex: `required | min_length(6) | equal(\"@some_path\"`\n * @returns {*}\n */\n\n\nfunction compile_rules(definition) {\n  // the rules should already be in the proper format\n  if (_typeof(definition) === 'object') {\n    return definition;\n  } // the rules should be a string\n\n\n  if (typeof definition !== 'string') {\n    throw 'Validation rules definition should be a string';\n  }\n\n  var rules = definition.split(' | ');\n  var compiled_rules = {};\n  rules.forEach(function (rule) {\n    var details = extract_rule_details(rule);\n\n    if (!_rule_registry__WEBPACK_IMPORTED_MODULE_0__[\"default\"][details.name]) {\n      throw 'Rule named ' + details.name + ' is not registered';\n    }\n\n    compiled_rules[details.name] = _rule_registry__WEBPACK_IMPORTED_MODULE_0__[\"default\"][details.name].apply(null, details.params);\n  });\n  return compiled_rules;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (compile_rules);\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/compile_rules.js?");

/***/ }),

/***/ "./src/utils/ensure_selector_paths_are_present.js":
/*!********************************************************!*\
  !*** ./src/utils/ensure_selector_paths_are_present.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ensure_selector_paths_are_present; });\n/**\n * Sometimes a form may have fields that have never been changed (ie: set() was not called)\n * So the data that is validated might have missing paths (eg: 'username')\n *\n * When the validation is performed it checks each item in the data object and since some might be\n * missing it won't trigger the validation error\n *\n * This function ensures that the first level (\"username\" but not \"addresses[*][email\" are present\n * so when the validation is performed those fields are going to be processed\n *\n * @param data\n * @param selectors\n */\nfunction ensure_selector_paths_are_present(data, selectors) {\n  selectors.forEach(function (sel) {\n    var first_bracket = sel.indexOf('[');\n\n    if (first_bracket !== -1) {\n      sel = sel.substr(0, first_bracket);\n    }\n\n    if (!data.hasOwnProperty(sel)) {\n      data[sel] = null;\n    }\n  });\n}\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/ensure_selector_paths_are_present.js?");

/***/ }),

/***/ "./src/utils/flatten_object.js":
/*!*************************************!*\
  !*** ./src/utils/flatten_object.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _is_nested__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is_nested */ \"./src/utils/is_nested.js\");\n\n/**\n * Recursive function to convert an deeply nested object into a 1-level object\n * [\n *    address: {\n *        'city': 'New York'\n *    }\n * }\n *\n * After flattenting will look like this\n * [\n *    address: {\n *        'city': 'New York'\n *    }\n *    'address[city]': 'New York'\n * }\n *\n * This way we will have all possible paths available in an object to compare with the selectors in the validator\n *\n * @param obj\n * @param branch\n * @returns {{}}\n */\n\nfunction flatten_object(obj, branch) {\n  var result = {};\n\n  if (Object(_is_nested__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(obj)) {\n    Object.keys(obj).forEach(function (key) {\n      var path = branch ? branch + '[' + key + ']' : key;\n      var value = obj[key];\n      result[path] = value;\n\n      if (Object(_is_nested__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value)) {\n        Object.assign(result, flatten_object(value, path));\n      }\n    });\n  }\n\n  return result;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (flatten_object);\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/flatten_object.js?");

/***/ }),

/***/ "./src/utils/foreach_object.js":
/*!*************************************!*\
  !*** ./src/utils/foreach_object.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (obj, callback) {\n  return Object.keys(obj).forEach(function (key) {\n    return callback(key, obj[key]);\n  });\n});\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/foreach_object.js?");

/***/ }),

/***/ "./src/utils/get.js":
/*!**************************!*\
  !*** ./src/utils/get.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Returns a value from an object based on a path\n *\n * @param obj\n * @param path - ex: \"username\", \"address[city]\", \"invoice_lines[2][product_id]\"\n * @param default_value\n * @returns {*}\n */\nfunction get(obj, path, default_value) {\n  var first_open_braket = path.indexOf('[');\n  var first_close_braket = path.indexOf(']');\n\n  if (first_open_braket === -1) {\n    return !obj ? default_value : obj[path] || default_value;\n  }\n\n  var container = path.substr(0, first_open_braket);\n  var remaining_path = path.substr(first_open_braket + 1, first_close_braket - first_open_braket - 1) + path.substr(first_close_braket + 1);\n  return get(obj[container], remaining_path, default_value);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (get);\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/get.js?");

/***/ }),

/***/ "./src/utils/get_matching_rules.js":
/*!*****************************************!*\
  !*** ./src/utils/get_matching_rules.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _is_path_matching_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is_path_matching_selector */ \"./src/utils/is_path_matching_selector.js\");\n\n/**\n * Returns the rules that match a particular path ordered by specificity\n * A validator may contain more than 1 selector that matches a path and this function\n * finds all the selectors that match a path and orders them by priority so that,\n * when the validation is performed, the validators are executed in a proper order\n * \n * @param path\n * @param rules\n * @returns {*}\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (path, rules) {\n  var matching_selectors = Object.keys(rules).filter(function (selector) {\n    return Object(_is_path_matching_selector__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(path, selector);\n  });\n\n  if (matching_selectors.length == 0) {\n    return false;\n  } // sort selectors by specificity (ie: how general they are)\n  // more specific selectors are those that have less * in the path\n\n\n  matching_selectors.sort(function (a, b) {\n    var a_specificity = -(a.match(/\\*/ig) || []).length;\n    var b_specificity = -(b.match(/\\*/ig) || []).length;\n\n    if (a_specificity < b_specificity) {\n      return -1;\n    }\n\n    if (a_specificity > b_specificity) {\n      return 1;\n    }\n\n    return 0;\n  });\n  var matching_rules = [];\n  matching_selectors.forEach(function (selector) {\n    Object.keys(rules[selector]).forEach(function (rule) {\n      // we only set it once so rules from less specific selectors\n      // don't overwrite the rules from more specific selectors\n      if (!matching_rules.find(function (item) {\n        return item.name == rule;\n      })) {\n        matching_rules.push({\n          selector: selector,\n          name: rule,\n          validator: rules[selector][rule]\n        });\n      }\n    });\n  });\n  return matching_rules;\n});\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/get_matching_rules.js?");

/***/ }),

/***/ "./src/utils/get_ref_path.js":
/*!***********************************!*\
  !*** ./src/utils/get_ref_path.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Returns an path that matches the reference relative to the provided path\n *\n * This is used to find values for the validation rules that are contextual\n * For example an date range end date should be higher than the start date.\n * The validation rule would be {'end_date', date_after('@start_date')\n *\n * If you have a list of date ranges the validation rule would be\n * {'date_ranges[*][end_date]', date_after('@date_ranges[*][start_date')\n * So date_ranges[0][end_date] should be greater than date_ranges[0][start_date]\n *\n * This utility function will be used by validators to find the corresponding referenced paths\n *\n * @example\n * get_ref_path('a[b][c]', 'a[*][d]') = a[b][d]\n * get_ref_path('a[0][1][c]', 'a[*][2][*]') = a[0][2][c]\n * get_ref_path('a[0][1][c]', 'a[*][*][d]') = a[0][1][d]\n *\n * @param path\n * @param referenced_path\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (path, reference) {\n  // no star, means the reference is absolute, not dependend on the path\n  if (reference.indexOf('*') === -1) {\n    return reference;\n  }\n\n  var parts = path.replace(/\\]/g, '').split('[');\n  var reference_parts = reference.replace(/\\]/g, '').split('[');\n  var relative_parts = reference_parts.map(function (part, idx) {\n    return part === '*' ? parts[idx] : part;\n  });\n  return relative_parts.reduce(function (acc, part, idx) {\n    if (idx === 0) {\n      acc += part;\n    } else {\n      acc += '[' + part + ']';\n    }\n\n    return acc;\n  }, '');\n});\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/get_ref_path.js?");

/***/ }),

/***/ "./src/utils/get_target_value.js":
/*!***************************************!*\
  !*** ./src/utils/get_target_value.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _get_ref_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get_ref_path */ \"./src/utils/get_ref_path.js\");\n/* harmony import */ var _get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get */ \"./src/utils/get.js\");\n\n\n/**\n * Returns the value that should be used for comparison\n *\n * This is used to find values for the validation rules that are contextual\n * For example an date range end date should be higher than the start date.\n * The validation rule would be {'end_date', date_after('@start_date')\n *\n * This utility function will be used by validators to find the actual value to be used for comparison\n * and by the error message provider to generate the error message\n *\n * @example\n * let data = {'start_date': '2020-01-01', 'end_date': '2020-01-10'}\n * get_target_value(data, 'start_date', '@end_date') == '2020-01-10\n *\n * // this is where a value and not a reference is passed\n * get_target_value(data, 'start_date', '2020-10-01') == '2020-10-01\n *\n * @param data\n * @param path\n * @param referenced_or_value\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (data, path, reference_or_value) {\n  if (!data || !path) {\n    return reference_or_value;\n  }\n\n  if (reference_or_value.substr && reference_or_value.substr(0, 1) === '@') {\n    return Object(_get__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(data, Object(_get_ref_path__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(path, reference_or_value.substr(1)));\n  }\n\n  return reference_or_value;\n});\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/get_target_value.js?");

/***/ }),

/***/ "./src/utils/is_nested.js":
/*!********************************!*\
  !*** ./src/utils/is_nested.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (obj) {\n  return obj && (Array.isArray(obj) || _typeof(obj) === 'object' && Object.keys(obj).length > 0);\n});\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/is_nested.js?");

/***/ }),

/***/ "./src/utils/is_path_matching_selector.js":
/*!************************************************!*\
  !*** ./src/utils/is_path_matching_selector.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Used to determine if a particular path that is being validated matches a path defined in the validator\n *\n * items[0][quantity] matches items[*][quantity]\n *\n * @param path\n * @param selector\n * @returns {boolean}\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (path, selector) {\n  if (selector.indexOf('*') === -1) {\n    return path === selector;\n  }\n\n  var regex = new RegExp(selector.replace(/\\[/g, '\\\\[').replace(/\\]/g, '\\\\]').replace('*', '([^\\\\]]+)'));\n  return !!path.match(regex);\n});\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/is_path_matching_selector.js?");

/***/ }),

/***/ "./src/utils/set.js":
/*!**************************!*\
  !*** ./src/utils/set.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Set a value for a path into an object\n *\n * @param obj\n * @param path - ex: \"username\", \"address[city]\", \"invoice_lines[2][product_id]\"\n * @param value\n * @returns {*}\n */\nfunction set(obj, path, value) {\n  var parts = path.replace(/\\]/g, '').split('[');\n  var working_obj = obj;\n  parts.map(function (part, idx) {\n    if (idx === parts.length - 1) {\n      working_obj[part] = value;\n      return;\n    }\n\n    if (!working_obj[part]) {\n      var next_part = parts[idx + 1];\n      working_obj[part] = next_part == parseInt(next_part) ? [] : {};\n    }\n\n    working_obj = working_obj[part];\n  });\n  return obj;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (set);\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/set.js?");

/***/ }),

/***/ "./src/utils/value_is_present.js":
/*!***************************************!*\
  !*** ./src/utils/value_is_present.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Helper function that determines if a value is present\n * It is used by the `required` validators and\n * by other validators to stop the validation procedure if the field is not present\n *\n * @param value\n * @returns {boolean}\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (value) {\n  return Array.isArray(value) ? value.length > 0 : value === false || value === 0 ? true : !!value;\n});\n\n//# sourceURL=webpack://SiriusValidation/./src/utils/value_is_present.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack://SiriusValidation/multi_./src/index.js?");

/***/ })

/******/ })["default"];
});