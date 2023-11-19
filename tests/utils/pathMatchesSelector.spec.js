import is_path_matching_selector from '../../src/utils/pathMatchesSelector'

describe('Test function that checks if a path matches a selector', () => {
  test('is_path_matching_selector', () => {

    expect(is_path_matching_selector('password', 'confirm_password')).toEqual(false);
    expect(is_path_matching_selector('address[1][city]', 'address[*][city]')).toEqual(true);
    expect(is_path_matching_selector('address[1][city]', 'address[1][city]')).toEqual(true);
    expect(is_path_matching_selector('address[1][city]', 'address[*][zip]')).toEqual(false);
  });
});
