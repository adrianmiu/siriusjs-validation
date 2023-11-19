import rule_factory from './rule_factory'
import notEmpty from '../utils/notEmpty';

export default rule_factory(function (value) {
  let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return !notEmpty(value) || regex.test(value.toLowerCase());
});
