import compileRules from '../../src/utils/compileRules'

describe('Test validation rule parsing', () => {
  test('Parse string', () => {

    let rules = compileRules('required | min(2) | max(10)');

    expect(typeof rules.required.validate).toEqual('function');
    expect(rules.min.params.min).toEqual(2);
    expect(rules.max.params.max).toEqual(10);
  });
});
