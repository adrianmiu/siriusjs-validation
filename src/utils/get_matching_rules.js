import is_path_matching_selector from './is_path_matching_selector'
import foreach_object from './foreach_object'

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
export default function (path, rules) {
  let matching_selectors = Object.keys(rules).filter(function (selector) {
    return is_path_matching_selector(path, selector);
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
    foreach_object(rules[selector], function(rule, validator) {
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
