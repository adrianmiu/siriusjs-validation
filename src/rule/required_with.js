import rule_factory from './rule_factory'
import notEmpty from '../utils/notEmpty'
import get_target_value from "../utils/getTargetValue";

export default rule_factory(function (value, path, context) {
  return get_target_value(context, path, this.params.target) ? notEmpty(value) : true;
}, ['target']);
