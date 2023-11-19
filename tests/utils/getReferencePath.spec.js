import getReferencePath from '../../src/utils/getReferencePath'

describe('Test get referenced path function', () => {
  test('Get ref path', () => {

    let ref_path = getReferencePath('a', 'b');
    expect(ref_path).toEqual('b');

    ref_path = getReferencePath('a[1]', 'b[*]');
    expect(ref_path).toEqual('b[1]');

    ref_path = getReferencePath('a[0][0][b]', 'c[*][1][*]');
    expect(ref_path).toEqual('c[0][1][b]');

  });
});
