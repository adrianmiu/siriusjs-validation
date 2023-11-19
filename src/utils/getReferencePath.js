/**
 * Returns an path that matches the reference relative to the provided path
 *
 * This is used to find values for the validation rules that are contextual
 * For example an date range end date should be higher than the start date.
 * The validation rule would be {'end_date', date_after('@start_date')
 *
 * If you have a list of date ranges the validation rule would be
 * {'date_ranges[*][end_date]', date_after('@date_ranges[*][start_date')
 * So date_ranges[0][end_date] should be greater than date_ranges[0][start_date]
 *
 * This utility function will be used by validators to find the corresponding referenced paths
 *
 * @example
 * getReferencePath('a[b][c]', 'a[*][d]') = a[b][d]
 * getReferencePath('a[0][1][c]', 'a[*][2][*]') = a[0][2][c]
 * getReferencePath('a[0][1][c]', 'a[*][*][d]') = a[0][1][d]
 *
 * @param {string} path
 * @param {string} referenced_path
 */
export default function(path, reference) {
  // no star, means the reference is absolute, not dependend on the path
  if (reference.indexOf('*') === -1) {
    return reference;
  }
  let parts = path.replace(/\]/g, '').split('[');
  let reference_parts = reference.replace(/\]/g, '').split('[');
  let relative_parts = reference_parts.map(function(part, idx) {
    return part === '*' ? parts[idx] : part;
  });

  return relative_parts.reduce(function(acc, part, idx) {
    if (idx === 0) {
      acc += part;
    } else {
      acc += '[' + part + ']';
    }
    return acc;
  }, '');
}
