import rule_factory from './rule_factory'
import get_target_value from '../utils/getTargetValue';

/**
 * @example
 * equal(10) // validation will pass if the item being validated is 10 or '10'
 * equal('@email_confirmation') // validation will pass if the item has the same value as the field 'email_confirmation'
 */
export default rule_factory(function (value, path, context) {
  return value == get_target_value(context, path, this.params.target);
}, ['target']);
