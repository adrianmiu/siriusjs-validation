import getReferencePath from './getReferencePath'
import get from './get';
/**
 * Returns the value that should be used for comparison
 *
 * This is used to find values for the validation rules that are contextual
 * For example an date range end date should be higher than the start date.
 * The validation rule would be {'end_date', date_after('@start_date')
 *
 * This utility function will be used by validators to find the actual value to be used for comparison
 * and by the error message provider to generate the error message
 *
 * @example
 * let data = {'start_date': '2020-01-01', 'end_date': '2020-01-10'}
 * get_target_value(data, 'start_date', '@end_date') == '2020-01-10
 *
 * // this is where a value and not a reference is passed
 * get_target_value(data, 'start_date', '2020-10-01') == '2020-10-01
 *
 * @param {object} data
 * @param {string} path
 * @param {*} referenceOrValue
 * @returns {*}
 */
export default function(data, path, referenceOrValue) {
  if (!data || !path) {
    return referenceOrValue;
  }

  if (referenceOrValue.substring && referenceOrValue.substring(0,1) === '@') {
    return get(data, getReferencePath(path, referenceOrValue.substring(1)));
  }

  return referenceOrValue;
}
