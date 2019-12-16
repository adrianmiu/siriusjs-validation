export default function (path, selector) {
  if (selector.indexOf('*') === -1) {
    return path === selector;
  }

  let regex = new RegExp(selector.replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace('*', '([^\\]]+)'));

  return !!path.match(regex);
}
