import rule_factory from './rule_factory'
import notEmpty from "../utils/notEmpty";

export default rule_factory(function (value) {
  return !notEmpty(value) || /^[a-zA-Z0-9_-]*$/.test(value);
});
