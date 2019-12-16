import ensure_selector_paths_are_present from '../../src/utils/ensure_selector_paths_are_present';

describe('Function that populates an object with missing paths', () => {
  test('Root paths are present', () => {

    let data = {};

    ensure_selector_paths_are_present(data, ['username', 'emails[*]']);

    expect(Object.keys(data)).toEqual(['username', 'emails']);
  });
});
