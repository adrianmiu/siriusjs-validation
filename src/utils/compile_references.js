import foreach_object from "./foreach_object";

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
