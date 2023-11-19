import get from '../../src/utils/flattenObject'
import flattenObject from "../../src/utils/flattenObject";

describe('Test flatten object', () => {
  test('Object flatten', () => {
    let obj = flattenObject({
      a: 'b',
      c: {
        d: {
          e: 'f'
        }
      }
    });

    //expect(get(obj, 'a')).toEqual('b');
    expect(obj['c[d][e]']).toEqual('f');
  });
});
