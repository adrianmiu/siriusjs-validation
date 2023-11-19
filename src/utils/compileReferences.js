import foreachInObject from "./foreachInObject";

/**
 * Creates a list of references between various paths in the data
 * that will be used to trigger the validation of other fields
 *
 * Scenario: user fills out the password field and then the password_confirm field which
 * must be the same as the password `equal("@password")`. Everything looks fine.
 * Now, the user changes the password, so you want to revalidate the password_confirm field
 *
 * A validation rule may contain a `refs` property to hold the references to other fields
 *
 * In this function we compute the reverted relations
 *
 * from selector => rule => [refs] to
 * ref => [selectors]
 *
 * @param {Object<string, Object} rules
 * @returns {Object.<string, string>}
 */
export default function (rules) {
  let references = {};
  foreachInObject(rules, function (selector, selectorRules) {
    foreachInObject(selectorRules, function (name, validator) {
      if (validator.refs && validator.refs.length) {
        validator.refs.forEach(function (item) {
          references[item] = references[item] || [];
          references[item].push(selector);
        });
      }
    });
  });
  return references;
}
