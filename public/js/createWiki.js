// Make sure we wait to attach our handlers until the DOM is fully loaded.
console.log("thisworks");
$(document).ready(() => {
  const addWiki = $("#add-form");
  const category = $("#category");
  const title = $("#title");
  const description = $("#description");
  // wiki creation button functionality
  addWiki.on("submit", event => {
    event.preventDefault();
    const newWiki = {
      category: category.val().trim(),
      title: title.val().trim(),
      description: description.val().trim()
    };
    // Stops the reminain code from running if a field is blank
    if (!newWiki.category || !newWiki.title || !newWiki.description) {
      return;
    }
    // POST request
    $.ajax("/api/create", {
      type: "POST",
      data: newWiki
    })
      .then(() => {
        category.val("");
        title.val("");
        description.val("");
      })
      .catch(err => {
        console.log(err);
      });
  });
});
