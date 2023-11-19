import defaultMessages from './lang/en'
import defaultErrorMessageCompiler from './errorMessageCompiler'
import compileRules from './utils/compileRules'
import get from './utils/get'
import set from './utils/set'
import getMatchingRules from './utils/getMatchingRules'
import isNested from './utils/isNested'
import ensurePaths from './utils/ensurePaths'
import flattenObject from "./utils/flattenObject";
import compileReferences from "./utils/compileReferences";
import getReferencePath from "./utils/getReferencePath";
import foreachInObject from "./utils/foreachInObject";

/**
 * Generates a validation object
 *
 * @param rules - validation rules
 * @param {function} onChange - function to be executed whenever the validation or pending state changes (optional)
 * @param {function} onError - function to be executed whenever there's an error during validation
 * @param {Object.<string,string>} messages - special error messages that are added to the defaults (optional)
 * @param {function} errorMessageCompiler - function to generate the error messages (optional)
 * @returns {Object}
 */
function make(rules, onChange, onError, messages, errorMessageCompiler) {

  let $touched = {};    // stores the paths that have been in `set()` calls
  let $dirty = {};      // stores the paths that have been in `set()` calls AND changed the initial value
  let $pending = {};    // stores the paths that are waiting for async validators to resolve
  let $errors = {};     // stores the error messages for invalid paths
  let $references = {}; // stores the list of compiled references between linked selectors
  let $data = {};       // holds the data that is being validated

  onError = onError || console.log;
  errorMessageCompiler = defaultErrorMessageCompiler || errorMessageCompiler;
  messages = Object.assign({}, defaultMessages, messages);

  const notifyValidationChanges = function (path) {
    typeof onChange === 'function' && onChange.call(v, 'validation', path);
  };


  const notifyStateChanges = function (path) {
    typeof onChange === 'function' && onChange.call(v, 'state', path);
  };

  let v = {
    $rules: {},

    /**
     * Returns all the data that is being validated by the form
     * @returns {{}}
     */
    getData() {
      return $data;
    },

    /**
     * @example
     * v.setData({a: 'b'})
     * v.setData({'a[b]': ['c', 'd']}, true, true) // clears previous data and skips validation
     *
     * @param {Object} data
     * @param {boolean} skipValidation - will not perform validation of data
     * @param {boolean} reset - will remove previously existing values
     */
    setData(data, skipValidation, reset) {
      if (reset) {
        foreachInObject(data, function(path) {
          delete $data[path];
        });
      }

      foreachInObject(data, (path, value) => {
        this.set(path, value, skipValidation);
      });
    },

    get(path) {
      return get($data, path);
    },

    /**
     * Method to populate leaf items in the data object tree
     * Use setData() to populate sub-trees
     *
     * @param {string} path
     * @param {*} value
     * @param {boolean} skipValidation - will skip validation
     */
    set(path, value, skipValidation) {
      let previous_value = this.get(path);
      set($data, path, value);
      this.setTouched(path);
      if (previous_value !== value) {
        this.setDirty(path);
        skipValidation || this.validateItem(path);
      }
      if (!skipValidation && $references[path]) {
        $references[path].forEach((ref) => {
          let ref_path = getReferencePath(path, ref);
          if (this.isTouched(ref_path)) {
            this.validateItem(ref_path);
          }
        });
      }
    },

    /**
     * @example
     * v.addRules('username', 'required | min_length(6)');
     * v.addRules({
     *  username: 'required | min_length(6)',
     *  password: 'required | min_length(6)'
     * });
     *
     * @param {string|Object} selector
     * @param {string|Object|null} rules
     */
    addRules(selector, rules) {
      if (typeof selector === 'object') {
        foreachInObject(selector, (key, rules) => {
          this.$rules[key] = compileRules(rules);
        });
      } else {
        this.$rules[selector] = compileRules(rules);
      }
      $references = compileReferences(this.$rules);
    },

    /**
     * @example
     * v.removeRules('username', 'required')
     * v.removeRules('username', ['required', 'min_length']
     *
     * @param {string} selector
     * @param {array} rules
     */
    removeRules(selector, rules) {
      if (!this.$rules[selector]) {
        return;
      }
      if (!Array.isArray(rules)) {
        rules = [rules];
      }
      rules.forEach((rule) => {
        if (this.$rules[selector][rule]) {
          delete this.$rules[selector][rule]
        }
      });
      $references = compileReferences(this.$rules);
    },

    setTouched(path) {
      $touched[path] = true;
    },

    isTouched(path) {
      return !!$touched[path];
    },

    resetTouched() {
      $touched = {};
    },

    setDirty(path) {
      $dirty[path] = true;
    },

    isDirty(path) {
      return !!$dirty[path];
    },

    resetDirty() {
      $dirty = {};
    },

    setError(path, message) {
      $errors[path] = message;
      notifyValidationChanges(path);
    },

    /**
     * If path is not provided it returns the valid state for the entire form
     *
     * @param path
     * @returns {boolean}
     */
    hasError(path) {
      if (!path) {
        return Object.values($errors).filter((value) => {
          return !!value
        }).length > 0;
      }
      return !!$errors[path];
    },

    getError(path) {
      return $errors[path];
    },

    setPending(path, status) {
      $pending[path] = !!status;
      notifyStateChanges(path);
    },

    /**
     * If path is not provided it returns the pending state for the entire form
     *
     * @param path
     * @returns {*}
     */
    isPending(path) {
      if (!path) {
        return !!Object.values($pending).find((value) => {
          return !!value
        });
      }
      return $pending[path];
    },

    isValid() {
      return !this.hasError();
    },

    validateItem(path) {
      let matching_rules = getMatchingRules(path, this.$rules);
      let value = this.get(path);

      // recursively validate children
      if (isNested(value)) {
        // remove previous error messages
        foreachInObject($errors, (item) => {
          if (item !== path && item.substring(0, path.length) === path) {
            delete $errors[item];
          }
        });
        foreachInObject(value, (key) => {
          this.validateItem(path + '[' + key + ']');
        });
      }

      // no rules => field is valid
      if (!matching_rules || matching_rules.length === 0) {
        this.setError(path, null);
        return;
      }


      try {
        let error_message = null;
        for (var i = 0, len = matching_rules.length; i < len; i++) {
          let current_rule = matching_rules[i];
          if (!current_rule.validator || !current_rule.validator.validate) {
            continue;
          }
          let result = current_rule.validator.validate(value, path, $data);

          if (result === false) {
            error_message = errorMessageCompiler(this, path, current_rule.selector, current_rule.name, messages);
            break;
          }

          // allow ONLY one async validator
          // @todo find solution to allow for multiple async validators?
          if (result.then) {
            this.setPending(path, true);
            result.then((result) => {
              if (result === false) {
                this.setError(path, errorMessageCompiler(this, path, current_rule.selector, current_rule.name, messages));
              } else {
                this.setError(path, null);
              }
              this.setPending(path, false);
            }).catch(function (e) {
              onError.call(this, 'field_validation', e);
            });
            // noinspection JSAnnotator
            break;
          }
        }
        this.setError(path, error_message);
      } catch (e) {
        onError.call(this, 'field_validation', e);
      }
    },

    validate() {
      ensurePaths($data, Object.keys(this.$rules));
      let paths = Object.keys(flattenObject($data));
      paths.forEach((path) => {
        // validate if not previously validated
        if (!$errors.hasOwnProperty(path)) {
          this.validateItem(path);
          this.setTouched(path);
          this.setDirty(path);
        }
      });

      if (!this.isPending()) {
        return Promise.resolve(this.isValid());
      }

      return new Promise((resolve) => {
        let start = new Date();
        let interval = setInterval(() => {
          let current = new Date();
          if (current - start > 5000) {
            clearInterval(interval);
            onError.call(this, 'promise', new Error('Data validation has timed out'));
          } else if (!this.isPending()) {
            resolve(this.isValid());
          }
        }, 100);

      });
    },

    reset() {
      this.resetTouched();
      this.resetDirty();
      $pending = {};
      $errors = {};
    }
  };

  rules && v.addRules(rules);

  return v;
}

export default make
