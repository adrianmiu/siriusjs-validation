/**
 * Used to determine if a particular path that is being validated matches a path defined in the validator
 *
 * items[0][quantity] matches items[*][quantity]
 *
 * @param path
 * @param selector
 * @returns {boolean}
 */
export default function (path, selector) {
  if (selector.indexOf('*') === -1) {
    return path === selector;
  }

  let regex = new RegExp(selector.replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace('*', '([^\\]]+)'));

  return !!path.match(regex);
}
