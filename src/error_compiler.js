import default_messages from './lang/en.js'
import get_target_value from './utils/get_target_value'

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
export default function(validator, path, failed_rule_selector, failed_rule_name, messages) {
  messages = messages || default_messages;
  let params = validator.$rules[failed_rule_selector][failed_rule_name].params || {};
  let computed_params = {};

  /**
   * Compute the values of the params since they will be replaced in the message templates
   */
  Object.keys(params).forEach(function(param) {
    computed_params[params] = get_target_value(validator.data, path, params[param]);
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

  let matched_message = potential_messages.find(function(msg) {
    return messages[msg];
  });

  let error = matched_message ? messages[matched_message] : false;

  if (typeof error === "function") {
    return error(validator, path, failed_rule_selector);
  }

  if (error) {
    // replace placeholders with actual parameter values
    Object.keys(params).forEach(function(p) {
      error = error.replace(new RegExp('\{'+p+'\}', 'g'), get_target_value(validator.getData(), path, params[p]));
    });
    return error;
  }

  return messages._default || 'Field is not valid';
}
