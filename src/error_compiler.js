import default_messages from './lang/en.js'
import get_target_value from './utils/get_target_value'
import foreach_object from './utils/foreach_object'

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
export default function (validator, path, failed_rule_selector, failed_rule_name, messages) {
  messages = messages || default_messages;
  let params = validator.$rules[failed_rule_selector][failed_rule_name].params || {};
  let computed_params = {};

  /**
   * Compute the values of the params since they will be replaced in the message templates
   */
  foreach_object(params, function (key, value) {
    computed_params[key] = get_target_value(validator.data, path, value);
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
    return messages[msg];
  });

  let error = matched_message ? messages[matched_message] : false;

  if (typeof error === "function") {
    return error(validator, path, failed_rule_selector);
  }

  if (error) {
    // replace placeholders with actual parameter values
    foreach_object(params, function (param, value) {
      error = error.replace(new RegExp('\{' + param + '\}', 'g'), get_target_value(validator.getData(), path, value));
    });
    return error;
  }

  return messages._default || 'Field is not valid';
}
