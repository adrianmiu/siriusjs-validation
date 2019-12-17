/**
 * Sometimes a form may have fields that have never been changed (ie: set() was not called)
 * So the data that is validated might have missing paths (eg: 'username')
 *
 * When the validation is performed it checks each item in the data object and since some might be
 * missing it won't trigger the validation error
 *
 * This function ensures that the first level ("username" but not "addresses[*][email" are present
 * so when the validation is performed those fields are going to be processed
 *
 * @param data
 * @param selectors
 */
export default function ensure_selector_paths_are_present(data, selectors) {
  selectors.forEach((sel) => {
    let first_bracket = sel.indexOf('[');
    if (first_bracket !== -1) {
      sel = sel.substr(0, first_bracket)
    }

    if (!data.hasOwnProperty(sel)) {
      data[sel] = null;
    }
  });
}
