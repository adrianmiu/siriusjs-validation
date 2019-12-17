import foreach_object from "./foreach_object";

/**
 * Creates a list of references between various paths in the data
 * that will be used to trigger the validation of other fields
 *
 * Scenario: user fills out the password field and then the password_confirm field which
 * must be the same as the password `equal("@password")`. Everything looks fine.
 * Now, the user changes the password so you want to revalidate the password_confirm field
 *
 * A validation rule may contain a `refs` property to hold the references to other fields
 *
 * In this function we compute the revereted relations
 *
 * from selector => rule => [refs] to
 * ref => [selectors]
 *
 * @param rules
 * @returns {{}}
 */
export default function (rules) {
  let references = {};
  foreach_object(rules, function (sel, sel_rules) {
    foreach_object(sel_rules, function (name, validator) {
      if (!validator.refs || !validator.refs.length) {
        return;
      }
      validator.refs.forEach(function(item) {
        references[item] = references[item] || [];
        references[item].push(sel);
      });
    });
  });
  return references;
}
