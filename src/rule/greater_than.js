import rule_factory from './rule_factory'
import get_target_value from '../utils/get_target_value';
import value_is_present from '../utils/value_is_present';

export default rule_factory(function (value, path, context) {
  return !value_is_present(value) || +value >= +get_target_value(context, path, this.params.min);
}, ['min']);
