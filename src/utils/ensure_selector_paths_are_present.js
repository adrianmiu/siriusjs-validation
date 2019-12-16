export default function ensure_selector_paths_are_present(data, selectors) {
  selectors.forEach((sel) => {
    let first_bracket = sel.indexOf('[');
    if (first_bracket !== -1) {
      sel = sel.substr(0, first_bracket)
    }

    if (!data.hasOwnProperty(sel)) {
      data[sel] = null;
    }
  });
}
