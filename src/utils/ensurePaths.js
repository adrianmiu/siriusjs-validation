/**
 * Sometimes a form may have fields that have never been changed
 * (ie: set() was not called on it) so the data that is being
 * validated might have missing paths (eg: 'username')
 *
 * When the validation is performed the library checks each item in the data object
 * and since some might be missing it won't trigger the validation error
 *
 * This function ensures that the first level ("username" but not "addresses[*][email]") are present
 * so when the validation is performed those fields are going to be processed
 *
 * @param {Object} obj
 * @param {string[]} selectors
 */
export default function ensurePaths(obj, selectors) {
  selectors.forEach((sel) => {
    let first_bracket = sel.indexOf('[');
    if (first_bracket !== -1) {
      sel = sel.substring(0, first_bracket)
    }

    if (!obj.hasOwnProperty(sel)) {
      obj[sel] = null;
    }
  });
}
