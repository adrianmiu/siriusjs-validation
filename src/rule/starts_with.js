import rule_factory from './rule_factory'
import notEmpty from '../utils/notEmpty';

export default rule_factory(function (value) {
  return !notEmpty(value) || value.substring(0, this.params.target.length) === this.params.target;
}, ['target']);
