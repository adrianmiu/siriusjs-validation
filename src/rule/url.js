import rule_factory from './rule_factory'
import value_is_present from '../utils/value_is_present';

export default rule_factory(function (value) {
  let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return !value_is_present(value) || regex.test(value.toLowerCase());
});
