import rule_factory from './rule_factory'
import get_target_value from "../utils/get_target_value";
import value_is_present from "../utils/value_is_present";

export default rule_factory(function (value) {
  return !value_is_present(value) || (new RegExp(this.params.pattern, this.params.modifiers || '')).test(value);
}, ['pattern', 'modifiers']);
