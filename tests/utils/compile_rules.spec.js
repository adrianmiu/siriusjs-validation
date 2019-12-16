import compile_rules from '../../src/utils/compile_rules'

describe('Test validation rule parsing', () => {
  test('Parse string', () => {

    let rules = compile_rules('required | min(2) | max(10)');

    expect(typeof rules.required.validate).toEqual('function');
    expect(rules.min.params.min).toEqual(2);
    expect(rules.max.params.max).toEqual(10);
  });
});
