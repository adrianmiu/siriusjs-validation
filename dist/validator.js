var messages = {
  _default: 'Field is not valid',
  required: 'This field is required',
  required_with: 'This field is required',
  required_without: 'This field is required',
  email: 'This field is not a valid email',
  url: 'This field is not a valid web address (must start with http:// or https://)',
  contains: 'This field should contain "{target}"',
  starts_with: 'This field should start with "{target}"',
  ends_with: 'This field should end with "{target}"',
  equal: 'This field should be equal to {target}',
  min: 'This field should be greater or equal to {min}',
  max: 'This field should be smaller or equal to {max}',
  alpha: 'This field should contain only letters',
  alpha_num: 'This field should contain only letters and numbers',
  slug: 'This field should contain only letters, numbers, "-" or "_"',
  regex: 'This field does not match the pattern',
  greater_than: 'This field should be greater or equal to {min}',
  less_than: 'This field should be smaller or equal to {max}',
  array_min_length: 'This list should contain at least {min} items',
  array_max_length: 'This list should contain less than {max} items',
  min_length: 'This field should have at least {min} characters',
  max_length: 'This field should have less than {max} characters',
  in_list: 'This field should be selected from the list of accepted values',
  not_in_list: 'This field has a value that is blacklisted',
};

/**
 * Returns an path that matches the reference relative to the provided path
 *
 * This is used to find values for the validation rules that are contextual
 * For example an date range end date should be higher than the start date.
 * The validation rule would be {'end_date', date_after('@start_date')
 *
 * If you have a list of date ranges the validation rule would be
 * {'date_ranges[*][end_date]', date_after('@date_ranges[*][start_date')
 * So date_ranges[0][end_date] should be greater than date_ranges[0][start_date]
 *
 * This utility function will be used by validators to find the corresponding referenced paths
 *
 * @example
 * getReferencePath('a[b][c]', 'a[*][d]') = a[b][d]
 * getReferencePath('a[0][1][c]', 'a[*][2][*]') = a[0][2][c]
 * getReferencePath('a[0][1][c]', 'a[*][*][d]') = a[0][1][d]
 *
 * @param {string} path
 * @param {string} referenced_path
 */
function getReferencePath(path, reference) {
  // no star, means the reference is absolute, not dependend on the path
  if (reference.indexOf('*') === -1) {
    return reference;
  }
  let parts = path.replace(/\]/g, '').split('[');
  let reference_parts = reference.replace(/\]/g, '').split('[');
  let relative_parts = reference_parts.map(function(part, idx) {
    return part === '*' ? parts[idx] : part;
  });

  return relative_parts.reduce(function(acc, part, idx) {
    if (idx === 0) {
      acc += part;
    } else {
      acc += '[' + part + ']';
    }
    return acc;
  }, '');
}

/**
 * Returns a value from an object based on a path
 *
 * @param {Object|null} obj
 * @param {string} path - ex: "username", "address[city]", "invoice_lines[2][product_id]"
 * @param {*} defaultValue
 * @returns {*}
 */
function get (obj, path, defaultValue) {
  let firstOpenBracket = path.indexOf('[');
  let firstCloseBracket = path.indexOf(']');

  if (firstOpenBracket === -1) {
    return !obj ? defaultValue : (obj[path] || defaultValue);
  }

  let container = path.substring(0, firstOpenBracket);
  let remaining_path = path.substring(firstOpenBracket + 1, firstCloseBracket) + path.substring(firstCloseBracket + 1);

  return get(obj[container], remaining_path, defaultValue);
}

/**
 * Returns the value that should be used for comparison
 *
 * This is used to find values for the validation rules that are contextual
 * For example an date range end date should be higher than the start date.
 * The validation rule would be {'end_date', date_after('@start_date')
 *
 * This utility function will be used by validators to find the actual value to be used for comparison
 * and by the error message provider to generate the error message
 *
 * @example
 * let data = {'start_date': '2020-01-01', 'end_date': '2020-01-10'}
 * get_target_value(data, 'start_date', '@end_date') == '2020-01-10
 *
 * // this is where a value and not a reference is passed
 * get_target_value(data, 'start_date', '2020-10-01') == '2020-10-01
 *
 * @param {object} data
 * @param {string} path
 * @param {*} referenceOrValue
 * @returns {*}
 */
function get_target_value(data, path, referenceOrValue) {
  if (!data || !path) {
    return referenceOrValue;
  }

  if (referenceOrValue.substring && referenceOrValue.substring(0,1) === '@') {
    return get(data, getReferencePath(path, referenceOrValue.substring(1)));
  }

  return referenceOrValue;
}

function foreachInObject(obj, callback) {
  return Object.keys(obj).forEach(function(key) {
    return callback(key, obj[key]);
  });
}

/**
 * Default function that generates the error messages
 * From a list of messages it extracts the most specific one and
 * replaces the placeholders (eg: "{min}" with the actual values
 *
 * @param validator
 * @param path
 * @param failed_rule_selector
 * @param failed_rule_name
 * @param messages
 * @returns {*}
 */
function defaultErrorMessageCompiler (validator, path, failed_rule_selector, failed_rule_name, messages$1) {
  messages$1 = messages$1 || messages;
  let params = validator.$rules[failed_rule_selector][failed_rule_name].params || {};

  /**
   * Compute the values of the params since they will be replaced in the message templates
   */
  foreachInObject(params, function (key, value) {
    get_target_value(validator.data, path, value);
  });

  /**
   * The potential messages contain keys from the `messages` variable that may be used to generate the error message
   * The first one that is found is used
   */
  let potential_messages = [
    path + ':' + failed_rule_name,
    failed_rule_selector + ':' + failed_rule_name,
    failed_rule_name
  ];

  let matched_message = potential_messages.find(function (msg) {
    return messages$1[msg];
  });

  let error = matched_message ? messages$1[matched_message] : false;

  if (typeof error === "function") {
    return error(validator, path, failed_rule_selector);
  }

  if (error) {
    // replace placeholders with actual parameter values
    foreachInObject(params, function (param, value) {
      error = error.replace(new RegExp('{' + param + '}', 'g'), get_target_value(validator.getData(), path, value));
    });
    return error;
  }

  return messages$1._default || 'Field is not valid';
}

var rule_factory = function (validationFn, params_names) {
  return function () {
    let options = Array.prototype.slice.call(arguments);
    let params = {};
    let refs = [];
    if (params_names) {
      params = params_names.reduce(function (acc, name, idx) {
        acc[name] = options[idx];
        return acc;
      }, {});
      refs = params_names.reduce(function (acc, name, idx) {
        let param = options[idx];
        if ((typeof param === 'string' || param instanceof String) && param.substring(0, 1) === '@') {
          acc.push(param.substring(1));
        }
        return acc;
      }, []);
    } else {
      params = options;
    }
    return {
      refs: refs,
      params: params,
      validate: validationFn
    }
  };
};

/**
 * Helper function that determines if a value is present
 * It is used by the `required` validators and
 * by other validators to stop the validation procedure if the field is not present
 *
 * @param value
 * @returns {boolean}
 */
function notEmpty (value) {
  return Array.isArray(value) ? value.length > 0 : (value === false || value === 0) ? true : !!value;
}

var required = rule_factory(function (value) {
  return notEmpty(value);
});

var required_with = rule_factory(function (value, path, context) {
  return get_target_value(context, path, this.params.target) ? notEmpty(value) : true;
}, ['target']);

var required_without = rule_factory(function (value, path, context) {
  return !get_target_value(context, path, this.params.target) ? notEmpty(value) : true;
}, ['target']);

/**
 * @example
 * equal(10) // validation will pass if the item being validated is 10 or '10'
 * equal('@email_confirmation') // validation will pass if the item has the same value as the field 'email_confirmation'
 */
var equal = rule_factory(function (value, path, context) {
  return value == get_target_value(context, path, this.params.target);
}, ['target']);

var greater_than = rule_factory(function (value, path, context) {
  return !notEmpty(value) || +value >= +get_target_value(context, path, this.params.min);
}, ['min']);

var lower_than = rule_factory(function (value, path, context) {
  return !notEmpty(value) || +value <= get_target_value(context, path, this.params.max);
}, ['max']);

var min_length = rule_factory(function (value, path, context) {
  return !notEmpty(value) || value.length && value.length >= get_target_value(context, path, this.params.min);
}, ['min']);

var max_length = rule_factory(function (value, path, context) {
  return !notEmpty(value) || value.length && value.length <= get_target_value(context, path, this.params.max);
}, ['max']);

var email = rule_factory(function (value) {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !notEmpty(value) || regex.test(value.toLowerCase());
});

var url = rule_factory(function (value) {
  let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return !notEmpty(value) || regex.test(value.toLowerCase());
});

var contains = rule_factory(function (value) {
  return !notEmpty(value) || value.indexOf(this.params.target) !== -1;
}, ['target']);

var starts_with = rule_factory(function (value) {
  return !notEmpty(value) || value.substring(0, this.params.target.length) === this.params.target;
}, ['target']);

var ends_with = rule_factory(function (value) {
  return !notEmpty(value) || value.substring(value.length - this.params.target.length) === this.params.target;
}, ['target']);

var in_list = rule_factory(function (value) {
  return !notEmpty(value) || this.params.target.indexOf(value) !== -1;
}, ['target']);

var not_in_list = rule_factory(function (value) {
  return !notEmpty(value) || this.params.target.indexOf(value) === -1;
}, ['target']);

var alpha = rule_factory(function (value) {
  return !notEmpty(value) || /^[a-zA-Z]*$/.test(value);
});

var alpha_num = rule_factory(function (value) {
  return !notEmpty(value) || /^[a-zA-Z0-9]*$/.test(value);
});

var slug = rule_factory(function (value) {
  return !notEmpty(value) || /^[a-zA-Z0-9_-]*$/.test(value);
});

var regex = rule_factory(function (value) {
  return !notEmpty(value) || (new RegExp(this.params.pattern, this.params.modifiers || '')).test(value);
}, ['pattern', 'modifiers']);

var integer = rule_factory(function (value) {
  return !notEmpty(value) || value == parseInt(value);
});

var number = rule_factory(function (value) {
  return !notEmpty(value) || value == parseFloat(value);
});

/**
 * Holds the built-in validation rules and here we add the custom rules
 *
 * @type {{required: *, required_with: *, required_without: *, equal: *, greater_than: *, lower_than: *, min: *, max: *, min_length: *, max_length: *, contains: *, starts_with: *, ends_with: *, email: *, url: *, in_list: *, not_in_list: *, alpha: *, alpha_num: *, slug: *, regex: *, integer: *, number: *, array_min_length: *, array_max_length: *}}
 */
var registry = {
  required,
  required_with,
  required_without,
  equal,
  greater_than,
  lower_than,
  min: greater_than,
  max: lower_than,
  min_length,
  max_length,
  contains,
  starts_with,
  ends_with,
  email,
  url,
  in_list,
  not_in_list,
  alpha,
  alpha_num,
  slug,
  regex,
  integer,
  number,
  array_min_length: min_length,
  array_max_length: max_length
};

/**
 * Extract the name and parameters of a rule
 *
 * @param {string} rule
 * @returns {*}
 */
function extractRuleDetails(rule) {

  if (rule.indexOf('(') === -1) {
    return {name: rule, params: []};
  }

  if (!rule.endsWith(')')) {
    throw 'Rule expression is not correct. Good expression: "between(3,5)"';
  }

  let firstParanthesis = rule.indexOf('(');

  let matches = [
    rule.substring(0, firstParanthesis),
    rule.substring(firstParanthesis + 1, rule.length - 1)
  ];

  return {
    name: matches[0],
    params: matches[1] ? JSON.parse('[' + matches[1] + ']') : ''
  }
}

/**
 * Generates the rules object from a rule definition
 * @param {string|Object} definition - ex: `required | min_length(6) | equal("@some_path"`
 * @returns {*}
 */
function compileRules(definition) {
  // the rules should already be in the proper format
  if (typeof definition === 'object') {
    return definition;
  }

  // the rules should be a string
  if (typeof definition !== 'string') {
    throw 'Validation rules definition should be a string';
  }

  const rules = definition.split(' | ');
  let compiled_rules = {};

  rules.forEach(function (rule) {
    let details = extractRuleDetails(rule);
    if (!registry[details.name]) {
      throw 'Rule named ' + details.name + ' is not registered';
    }

    compiled_rules[details.name] = registry[details.name].apply(null, details.params);
  });

  return compiled_rules;
}

/**
 * Set a value for a path into an object
 *
 * @param obj
 * @param path - ex: "username", "address[city]", "invoice_lines[2][product_id]"
 * @param value
 * @returns {*}
 */
function set(obj, path, value) {
  let parts = path.replace(/\]/g, '').split('[');
  let working_obj = obj;

  parts.map(function(part, idx) {
    if (idx === parts.length - 1) {
      working_obj[part] = value;
      return;
    }

    if (!working_obj[part]) {
      let next_part = parts[idx + 1];
      working_obj[part] = (next_part == parseInt(next_part)) ? [] : {};
    }

    working_obj = working_obj[part];

  });

  return obj;

}

/**
 * Used to determine if a particular path matches another path
 *
 * Ex: items[0][quantity] matches items[*][quantity]
 * Ex: items[0][quantity] does NOT match products[*][quantity]
 *
 * @param {string} path
 * @param {string} selector
 * @returns {boolean}
 */
function pathMatchesSelector (path, selector) {
  if (selector.indexOf('*') === -1) {
    return path === selector;
  }

  let regex = new RegExp(selector.replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace('*', '([^\\]]+)'));

  return !!path.match(regex);
}

/**
 * Returns the rules that match a particular path ordered by specificity
 * A validator may contain more than 1 selector that matches a path and this function
 * finds all the selectors that match a path and orders them by priority so that,
 * when the validation is performed, the validators are executed in a proper order
 *
 * @param path
 * @param rules
 * @returns {*}
 */
function getMatchingRules (path, rules) {
  let matching_selectors = Object.keys(rules).filter(function (selector) {
    return pathMatchesSelector(path, selector);
  });
  if (matching_selectors.length == 0) {
    return false
  }

  // sort selectors by specificity (ie: how general they are)
  // more specific selectors are those that have less * in the path
  matching_selectors.sort(function (a, b) {
    let a_specificity = -(a.match(/\*/ig) || []).length;
    let b_specificity = -(b.match(/\*/ig) || []).length;
    if (a_specificity < b_specificity) {
      return -1;
    }
    if (a_specificity > b_specificity) {
      return 1;
    }
    return 0;
  });

  var matching_rules = [];

  matching_selectors.forEach(function (selector) {
    foreachInObject(rules[selector], function(rule, validator) {
      // we only set it once so rules from less specific selectors
      // don't overwrite the rules from more specific selectors
      if (!matching_rules.find(function (item) {
          return item.name == rule;
        })) {
        matching_rules.push({
          selector: selector,
          name: rule,
          validator: validator
        });
      }
    });
  });

  return matching_rules;
}

function isNested (obj) {
  return obj && (Array.isArray(obj) || (typeof obj === 'object' && Object.keys(obj).length > 0));
}

/**
 * Sometimes a form may have fields that have never been changed
 * (ie: set() was not called on it) so the data that is being
 * validated might have missing paths (eg: 'username')
 *
 * When the validation is performed the library checks each item in the data object
 * and since some might be missing it won't trigger the validation error
 *
 * This function ensures that the first level ("username" but not "addresses[*][email]") are present
 * so when the validation is performed those fields are going to be processed
 *
 * @param {Object} obj
 * @param {string[]} selectors
 */
function ensurePaths(obj, selectors) {
  selectors.forEach((sel) => {
    let first_bracket = sel.indexOf('[');
    if (first_bracket !== -1) {
      sel = sel.substring(0, first_bracket);
    }

    if (!obj.hasOwnProperty(sel)) {
      obj[sel] = null;
    }
  });
}

/**
 * Recursive function to convert an deeply nested object into a 1-level object
 * [
 *    address: {
 *        'city': 'New York'
 *    }
 * }
 *
 * After flattenting will look like this
 * [
 *    address: {
 *        'city': 'New York'
 *    }
 *    'address[city]': 'New York'
 * }
 *
 * This way we will have all possible paths available in an object to compare with the selectors in the validator
 *
 * @param obj
 * @param branch
 * @returns {{}}
 */
function flattenObject (obj, branch) {
  let result = {};
  if (isNested(obj)) {
    foreachInObject(obj, function(key, value) {
      let path = branch ? branch + '[' + key + ']' : key;
      result[path] = value;
      if (isNested(value)) {
        Object.assign(result, flattenObject(value, path));
      }
    });
  }
  return result;
}

/**
 * Creates a list of references between various paths in the data
 * that will be used to trigger the validation of other fields
 *
 * Scenario: user fills out the password field and then the password_confirm field which
 * must be the same as the password `equal("@password")`. Everything looks fine.
 * Now, the user changes the password, so you want to revalidate the password_confirm field
 *
 * A validation rule may contain a `refs` property to hold the references to other fields
 *
 * In this function we compute the reverted relations
 *
 * from selector => rule => [refs] to
 * ref => [selectors]
 *
 * @param {Object<string, Object} rules
 * @returns {Object.<string, string>}
 */
function compileReferences (rules) {
  let references = {};
  foreachInObject(rules, function (selector, selectorRules) {
    foreachInObject(selectorRules, function (name, validator) {
      if (validator.refs && validator.refs.length) {
        validator.refs.forEach(function (item) {
          references[item] = references[item] || [];
          references[item].push(selector);
        });
      }
    });
  });
  return references;
}

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
function make(rules, onChange, onError, messages$1, errorMessageCompiler) {

  let $touched = {};    // stores the paths that have been in `set()` calls
  let $dirty = {};      // stores the paths that have been in `set()` calls AND changed the initial value
  let $pending = {};    // stores the paths that are waiting for async validators to resolve
  let $errors = {};     // stores the error messages for invalid paths
  let $references = {}; // stores the list of compiled references between linked selectors
  let $data = {};       // holds the data that is being validated

  onError = onError || console.log;
  errorMessageCompiler = defaultErrorMessageCompiler || errorMessageCompiler;
  messages$1 = Object.assign({}, messages, messages$1);

  const notify_validation_changes = function (path) {
    typeof onChange === 'function' && onChange.call(v, 'validation', path);
  };


  const notify_state_changes = function (path) {
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
     * @param new_data
     * @param skip_validation | boolean - will not perform validation of data
     * @param clean | boolean - will remove previously existing values
     */
    setData(new_data, skip_validation, reset) {
      if (reset) {
        foreachInObject(new_data, function(path) {
          delete $data[path];
        });
      }

      foreachInObject(new_data, (path, value) => {
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
          delete this.$rules[selector][rule];
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
            error_message = errorMessageCompiler(this, path, current_rule.selector, current_rule.name, messages$1);
            break;
          }

          // allow ONLY one async validator
          // @todo find solution to allow for multiple async validators?
          if (result.then) {
            this.setPending(path, true);
            result.then((result) => {
              if (result === false) {
                this.setError(path, errorMessageCompiler(this, path, current_rule.selector, current_rule.name, messages$1));
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

let SiriusValidation = {
  messages,
  rules: registry,
  rule(name, factory, message) {
    registry[name] = factory;
    messages[name] = message;
  },
  utils: {
    get,
    set,
    getReferencePath,
    pathMatchesSelector
  },
  make
};

export { SiriusValidation as default };
