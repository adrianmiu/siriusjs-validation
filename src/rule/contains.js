import rule_factory from './rule_factory'
import value_is_present from '../utils/value_is_present';

export default rule_factory(function (value) {
  return !value_is_present(value) || value.indexOf(this.params.target) !== -1;
}, ['target']);
