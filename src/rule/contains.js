import rule_factory from './rule_factory'
import notEmpty from '../utils/notEmpty';

export default rule_factory(function (value) {
  return !notEmpty(value) || value.indexOf(this.params.target) !== -1;
}, ['target']);
