import rule_factory from './rule_factory'
import get_target_value from "../utils/getTargetValue";
import notEmpty from "../utils/notEmpty";

export default rule_factory(function (value, path, context) {
  return !notEmpty(value) || value.length && value.length <= get_target_value(context, path, this.params.max);
}, ['max']);
