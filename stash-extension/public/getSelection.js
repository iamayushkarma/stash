// This function runs on the page to get the selected text while preserving line breaks.
(() => {
  const selection = window.getSelection();
  return selection ? selection.toString() : "";
})();
