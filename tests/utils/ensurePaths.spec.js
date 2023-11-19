import ensurePaths from '../../src/utils/ensurePaths';

describe('Function that populates an object with missing paths', () => {
  test('Root paths are present', () => {

    let data = {};

    ensurePaths(data, ['username', 'emails[*]']);

    expect(Object.keys(data)).toEqual(['username', 'emails']);
  });
});
