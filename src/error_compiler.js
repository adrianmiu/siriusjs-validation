import default_messages from './lang/en.js'
import get_target_value from './utils/get_target_value'

export default function(validator, path, failed_rule_selector, failed_rule_name, messages) {
  messages = messages || default_messages;
  let value = validator.get(path);
  let params = validator.$rules[failed_rule_selector][failed_rule_name].params || {};
  let computed_params = {};

  Object.keys(params).forEach(function(param) {
    computed_params[params] = get_target_value(validator.data, path, params[param]);
  });


  /**
   * The potential messages contain keys from the `messages` variable that may be used to generate the error message
   * The first one that is found is used
   *
   * @type {*[]}
   */
  let potential_messages = [
    path + ':' + failed_rule_name,
    failed_rule_selector + ':' + failed_rule_name,
    failed_rule_name
  ];

  let matched_message = potential_messages.find(function(msg) {
    return messages[msg];
  });

  let message = matched_message ? messages[matched_message] : false;

  if (typeof message === "function") {
    return message(validator, path, failed_rule_selector);
  }

  if (message) {
    Object.keys(params).forEach(function(p) {
      message = message.replace(new RegExp('\{'+p+'\}', 'g'), get_target_value(validator.getData(), path, params[p]));
    });
    return message;
  }

  return messages._default || 'Field is not valid';
}
