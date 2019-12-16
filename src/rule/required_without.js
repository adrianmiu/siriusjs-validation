import rule_factory from './rule_factory'
import value_is_present from '../utils/value_is_present'
import get_target_value from "../utils/get_target_value";

export default rule_factory(function (value, path, context) {
  return !get_target_value(context, path, this.params.target) ? value_is_present(value) : true;
}, ['target']);
