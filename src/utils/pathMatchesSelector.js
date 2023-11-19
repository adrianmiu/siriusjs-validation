/**
 * Used to determine if a particular path matches another path
 *
 * Ex: items[0][quantity] matches items[*][quantity]
 * Ex: items[0][quantity] does NOT match products[*][quantity]
 *
 * @param {string} path
 * @param {string} selector
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
