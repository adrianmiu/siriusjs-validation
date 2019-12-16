import rule_factory from './rule_factory'
import value_is_present from '../utils/value_is_present';

export default rule_factory(function (value) {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !value_is_present(value) || regex.test(value.toLowerCase());
});
