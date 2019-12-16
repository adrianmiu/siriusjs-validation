import set from '../../src/utils/set'

describe('Test set by path functionality', () => {
  test('Object set', () => {
    var obj = set({}, 'a[b][c]', 'd');
    expect(obj.a.b).toEqual({'c': 'd'});
  });

  test('Array set', () => {
    var obj = set({}, 'a[0][c]', 'd');
    expect(obj.a[0].c).toEqual('d');
  });
});
