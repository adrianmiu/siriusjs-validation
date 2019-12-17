/**
 * Helper function that determines if a value is present
 * It is used by the `required` validators and
 * by other validators to stop the validation procedure if the field is not present
 *
 * @param value
 * @returns {boolean}
 */
export default function (value) {
  return Array.isArray(value) ? value.length > 0 : (value === false || value === 0) ? true : !!value;
}
