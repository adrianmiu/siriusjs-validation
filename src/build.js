import default_messages from './lang/en'
import default_error_compiler from './error_compiler'
import compile_rules from './utils/compile_rules'
import get from './utils/get'
import set from './utils/set'
import get_matching_rules from './utils/get_matching_rules'
import is_nested from './utils/is_nested'
import ensure_selector_paths_are_present from './utils/ensure_selector_paths_are_present'
import flatten_object from "./utils/flatten_object";
import compile_references from "./utils/compile_references";
import get_ref_path from "./utils/get_ref_path";
import foreach_object from "./utils/foreach_object";

/**
 * Generates a validation object
 *
 * @param rules - validation rules
 * @param change_handler - function to be executed whenever the validation or pending state changes (optional)
 * @param error_handler - function to be executed whenever there's an error during validation
 * @param messages - special error messages that are added to the defaults (optional)
 * @param error_compiler - function to generate the error messages (optional)
 * @returns {validator object}
 */
function build(rules, change_handler, error_handler, messages, error_compiler) {

  let $touched = {};    // stores the paths that have been in `set()` calls
  let $dirty = {};      // stores the paths that have been in `set()` calls AND changed the initial value
  let $pending = {};    // stores the paths that are waiting for async validators to resolve
  let $errors = {};     // stores the error messages for invalid paths
  let $references = {}; // stores the list of compiled references between linked selectors
  let $data = {};       // holds the data that is being validated

  error_handler = error_handler || console.log;
  error_compiler = error_compiler || default_error_compiler;
  messages = Object.assign({}, default_messages, messages);

  const notify_validation_changes = function (path) {
    typeof change_handler === 'function' && change_handler.call(v, 'validation', path);
  };


  const notify_state_changes = function (path) {
    typeof change_handler === 'function' && change_handler.call(v, 'state', path);
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
     * @param new_data
     * @param skip_validation | boolean - will not perform validation of data
     * @param clean | boolean - will remove previously existing values
     */
    setData(new_data, skip_validation, reset) {
      if (reset) {
        foreach_object(new_data, function(path) {
          delete $data[path];
        });
      }

      foreach_object(new_data, (path, value) => {
        this.set(path, value, skip_validation);
      });
    },

    get(path) {
      return get($data, path);
    },

    /**
     * Method to populate leaf items in the data object tree
     * Use setData() to populate sub-trees
     *
     * @param path
     * @param value
     * @param skip_validation | boolean - will skip validation
     */
    set(path, value, skip_validation) {
      let previous_value = this.get(path);
      set($data, path, value);
      this.setTouched(path);
      if (previous_value !== value) {
        this.setDirty(path);
        skip_validation || this.validateItem(path);
      }
      if (!skip_validation && $references[path]) {
        $references[path].forEach((ref) => {
          let ref_path = get_ref_path(path, ref);
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
     * @param selector
     * @param rules
     */
    addRules(selector, selector_rules) {
      if (typeof selector === 'object') {
        foreach_object(selector, (key, rules) => {
          this.$rules[key] = compile_rules(rules);
        });
      } else {
        this.$rules[selector] = compile_rules(selector_rules);
      }
      $references = compile_references(this.$rules);
    },

    /**
     * @example
     * v.removeRules('username', 'required')
     * v.removeRules('username', ['required', 'min_length']
     *
     * @param selector
     * @param rules
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
      $references = compile_references(this.$rules);
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
      notify_validation_changes(path);
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
      notify_state_changes(path);
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
      let matching_rules = get_matching_rules(path, this.$rules);
      let value = this.get(path);

      // recursively validate children
      if (is_nested(value)) {
        // remove previous error messages
        foreach_object($errors, (item) => {
          if (item !== path && item.substr(0, path.length) === path) {
            delete $errors[item];
          }
        });
        foreach_object(value, (key) => {
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
            error_message = error_compiler(this, path, current_rule.selector, current_rule.name, messages);
            break;
          }

          // allow ONLY one async validator
          // @todo find solution to allow for multiple async validators?
          if (result.then) {
            this.setPending(path, true);
            result.then((result) => {
              if (result === false) {
                this.setError(path, error_compiler(this, path, current_rule.selector, current_rule.name, messages));
              } else {
                this.setError(path, null);
              }
              this.setPending(path, false);
            }).catch(function (e) {
              error_handler.call(this, 'field_validation', e);
            });
            // noinspection JSAnnotator
            break;
          }
        }
        this.setError(path, error_message);
      } catch (e) {
        error_handler.call(this, 'field_validation', e);
      }
    },

    validate() {
      ensure_selector_paths_are_present($data, Object.keys(this.$rules));
      let paths = Object.keys(flatten_object($data));
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
            error_handler.call(this, 'promise', new Error('Data validation has timed out'));
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

export default build
