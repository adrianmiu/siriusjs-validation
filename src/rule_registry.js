import required from './rule/required';
import required_with from './rule/required_with';
import required_without from './rule/required_without';
import equal from './rule/equal';
import greater_than from './rule/greater_than';
import lower_than from './rule/lower_than';
import min_length from './rule/min_length';
import max_length from './rule/max_length';
import email from './rule/email';
import url from './rule/url';
import contains from './rule/contains';
import starts_with from './rule/starts_with';
import ends_with from './rule/ends_with';
import in_list from './rule/in_list';
import not_in_list from './rule/not_in_list';
import alpha from './rule/alpha';
import alpha_num from './rule/alpha_num';
import slug from './rule/slug';
import regex from './rule/regex';
import integer from './rule/integer';
import number from './rule/number';

var registry = {
  required,
  required_with,
  required_without,
  equal,
  greater_than,
  lower_than,
  min: greater_than,
  max: lower_than,
  min_length,
  max_length,
  contains,
  starts_with,
  ends_with,
  email,
  url,
  in_list,
  not_in_list,
  alpha,
  alpha_num,
  slug,
  regex,
  integer,
  number,
  array_min_length: min_length,
  array_max_length: max_length
};

export default registry
