import get from '../../src/utils/get'

describe('Test get by path functionality', () => {
  test('Object get', () => {
    let obj = {
      a: 'b',
      c: {
        d: {
          e: 'f'
        }
      }
    };

    //expect(get(obj, 'a')).toEqual('b');
    expect(get(obj, 'c[d]')).toEqual({e: 'f'});
    expect(get(obj, 'c[d][e]')).toEqual('f');
    expect(get(obj, 'x')).toEqual(undefined);
    expect(get(obj, 'x', 'default')).toEqual('default');
    expect(get(obj, 'd', 'x')).toEqual('x');
    expect(get(null, 'd', 'x')).toEqual('x');
  });

  test('Array get', () => {
    let obj = [
      'a',
      {
        b: 'c',
        d: [
          'e',
          ['f', 'g', 'h'],
          {
            i: 'j'
          }
        ]
      }
    ];

    expect(get(obj, '0')).toEqual('a');
    expect(get(obj, '1[b]')).toEqual('c');
    expect(get(obj, '1[d][1][0]')).toEqual('f');
    expect(get(obj, '1[d][2][i]')).toEqual('j');
    expect(get(obj, '2')).toEqual(undefined);
    expect(get(obj, '2', 'default')).toEqual('default');
  });
});
