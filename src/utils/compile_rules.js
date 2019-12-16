import rule_registry from "../rule_registry";

function extract_rule_details(rule) {

  if (rule.indexOf('(') === -1) {
    return {name: rule, params: []};
  }

  if (rule.substr(-1, 1) !== ')') {
    throw 'Rule expression is not correct. Good expression: "between(3,5)"';
  }

  let first_para = rule.indexOf('(');

  let matches = [
    rule.substr(0, first_para),
    rule.substr(first_para + 1, rule.length - first_para - 2)
  ];

  return {
    name: matches[0],
    params: matches[1] ? JSON.parse('[' + matches[1] + ']') : ''
  }
}

function compile_rules(definition) {
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
    let details = extract_rule_details(rule);
    if (!rule_registry[details.name]) {
      throw 'Rule named ' + details.name + ' is not registered';
    }

    compiled_rules[details.name] = rule_registry[details.name].apply(null, details.params);
  });

  return compiled_rules;
}

export default compile_rules
