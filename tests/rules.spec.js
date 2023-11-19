import rule_registry from '../src/builtInRules'

rule_registry['mustBeCool'] = function() {
  return function(value) {
    return value.contains('cool')
  }
};

describe('Test built-in validation rules', () => {

  test('required', () => {
    const required = rule_registry.required();
    expect(required.validate(1)).toEqual(true);
    expect(required.validate(0)).toEqual(true);
    expect(required.validate(false)).toEqual(true);
    expect(required.validate(null)).toEqual(false);
    expect(required.validate('')).toEqual(false);
    expect(required.validate(undefined)).toEqual(false);
    expect(required.validate([])).toEqual(false);
  });

  test('required_with', () => {
    // product quantities are required if the product_id was provided
    const rule = rule_registry.required_with('@items[*][product_id]');
    const context = {
      items: [
        {product_id: 1, quantity: ''},
        {product_id: '', quantity: ''},
        {product_id: 3, quantity: 2},
      ]
    }
    expect(rule.validate('', 'items[0][quantity]', context)).toBe(false);
    expect(rule.validate('', 'items[1][quantity]', context)).toBe(true);
    expect(rule.validate(2, 'items[2][quantity]', context)).toBe(true);
  });

  test('required_without', () => {
    // phone numbers are required if email is not present
    const rule = rule_registry.required_without('@contacts[*][email]');
    const context = {
      contacts: [
        {email: '', phone: null},
        {email: '', phone: 1},
        {email: 'b', quantity: 2},
      ]
    }
    expect(rule.validate('', 'contacts[0][phone]', context)).toBe(false);
    expect(rule.validate(1, 'contacts[1][phone]', context)).toBe(true);
    expect(rule.validate(2, 'contacts[2][phone]', context)).toBe(true);
  });

  test('equal', () => {
    const equal = rule_registry.equal(10);
    expect(equal.validate(5)).toEqual(false);
    expect(equal.validate(10)).toEqual(true);

    let obj = {target: 5};
    const contextual_equal = rule_registry.equal('@target');
    expect(contextual_equal.validate(5, 'value', obj)).toEqual(true);
    expect(contextual_equal.validate(2, 'value', obj)).toEqual(false);
  });

  test('min', () => {
    const min = rule_registry.min(10);
    expect(min.validate(5)).toEqual(false);
    expect(min.validate(10)).toEqual(true);
    expect(min.validate(15)).toEqual(true);

    let obj = {min: 5};
    const context_min = rule_registry.min('@min');
    expect(context_min.validate(5, 'value', obj)).toEqual(true);
    expect(context_min.validate(2, 'value', obj)).toEqual(false);
  });

  test('max', () => {
    const max = rule_registry.max(10);
    expect(max.validate(5)).toEqual(true);
    expect(max.validate(10)).toEqual(true);
    expect(max.validate(15)).toEqual(false);

    let obj = {max: 5};
    const context_max = rule_registry.max('@max');
    expect(context_max.validate(7, 'value', obj)).toEqual(false);
    expect(context_max.validate(3, 'value', obj)).toEqual(true);
  });

  test('min_length', () => {
    const min_length = rule_registry.min_length(2);
    expect(min_length.validate('a')).toEqual(false);
    expect(min_length.validate('ab')).toEqual(true);
    expect(min_length.validate('abc')).toEqual(true);

    expect(min_length.validate(['a'])).toEqual(false);
    expect(min_length.validate(['a', 'b'])).toEqual(true);
    expect(min_length.validate(['a', 'b', 'c'])).toEqual(true);
  });

  test('max_length', () => {
    const max_length = rule_registry.max_length(2);
    expect(max_length.validate('a')).toEqual(true);
    expect(max_length.validate('ab')).toEqual(true);
    expect(max_length.validate('abc')).toEqual(false);

    expect(max_length.validate(['a'])).toEqual(true);
    expect(max_length.validate(['a', 'b'])).toEqual(true);
    expect(max_length.validate(['a', 'b', 'c'])).toEqual(false);
  });

  test('contains', () => {
    const rule = rule_registry.contains('XYZ');
    expect(rule.validate('abc XYZ')).toEqual(true);
    expect(rule.validate('abc')).toEqual(false);
  });

  test('starts_with', () => {
    const rule = rule_registry.starts_with('XYZ');
    expect(rule.validate('XYZ abc')).toEqual(true);
    expect(rule.validate('abc XYZ')).toEqual(false);
  });

  test('ends_with', () => {
    const rule = rule_registry.ends_with('XYZ');
    expect(rule.validate('abc XYZ')).toEqual(true);
    expect(rule.validate('XYZ abc')).toEqual(false);
  });

  test('in_list', () => {
    const rule = rule_registry.in_list(['a', 'b', 'c']);
    expect(rule.validate('b')).toEqual(true);
    expect(rule.validate('d')).toEqual(false);
  });

  test('not_in_list', () => {
    const rule = rule_registry.not_in_list(['a', 'b', 'c']);
    expect(rule.validate('d')).toEqual(true);
    expect(rule.validate('b')).toEqual(false);
  });

  test('email', () => {
    const rule = rule_registry.email();
    expect(rule.validate('email@domain.com')).toEqual(true);
    expect(rule.validate('email')).toEqual(false);
  });

  test('url', () => {
    const rule = rule_registry.url();
    expect(rule.validate('http://www.google.com/path?query')).toEqual(true);
    expect(rule.validate('https://www.google.com')).toEqual(true);
    expect(rule.validate('www.google.com')).toEqual(false);
  });

  test('integer', () => {
    const rule = rule_registry.integer();
    expect(rule.validate('123.00')).toEqual(true);
    expect(rule.validate('-123.00')).toEqual(true);
    expect(rule.validate('123.20')).toEqual(false);
  });

  test('number', () => {
    const rule = rule_registry.number();
    expect(rule.validate('123.40')).toEqual(true);
    expect(rule.validate('-123.40')).toEqual(true);
    expect(rule.validate('123,20')).toEqual(false);
  });

  test('alpha', () => {
    const rule = rule_registry.alpha();
    expect(rule.validate('abc')).toEqual(true);
    expect(rule.validate('ab3')).toEqual(false);
  });

  test('alpha_num', () => {
    const rule = rule_registry.alpha_num();
    expect(rule.validate('abc123')).toEqual(true);
    expect(rule.validate('abc123#')).toEqual(false);
  });

  test('slug', () => {
    const rule = rule_registry.slug();
    expect(rule.validate('abc-123_def')).toEqual(true);
    expect(rule.validate('abc-123_#')).toEqual(false);
  });

  test('regex', () => {
    const rule = rule_registry.regex('[a-z]+', 'i');
    expect(rule.validate('abc')).toEqual(true);
    expect(rule.validate('ABC')).toEqual(true);
    expect(rule.validate('1')).toEqual(false);
  });
});


describe('Test Validator', () => {

});
