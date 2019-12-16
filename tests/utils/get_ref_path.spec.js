import get_ref_path from '../../src/utils/get_ref_path'

describe('Test get referenced path function', () => {
  test('Get ref path', () => {

    let ref_path = get_ref_path('a', 'b');
    expect(ref_path).toEqual('b');

    ref_path = get_ref_path('a[1]', 'b[*]');
    expect(ref_path).toEqual('b[1]');

    ref_path = get_ref_path('a[0][0][b]', 'c[*][1][*]');
    expect(ref_path).toEqual('c[0][1][b]');

  });
});
