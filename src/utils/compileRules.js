import rule_registry from "../builtInRules";

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
    if (!rule_registry[details.name]) {
      throw 'Rule named ' + details.name + ' is not registered';
    }

    compiled_rules[details.name] = rule_registry[details.name].apply(null, details.params);
  });

  return compiled_rules;
}

export default compileRules
