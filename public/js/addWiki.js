// Make sure we wait to attach our handlers until the DOM is fully loaded.
console.log("thisworks");
$(document).ready(() => {
  //const variable for
  const addWiki = $("#add-form");
  const category = $("#category");
  const title = $("#title");
  const description = $("#description");

  addWiki.on("submit", (event) => {
    event.preventDefault();
    console.log("on submitting wiki");
    const newWiki = {
      category: category.val().trim(),
      title: title.val().trim(),
      description: description.val().trim(),
    };

    if (!newWiki.category || !newWiki.title || !newWiki.description) {
      return;
    }
    $.ajax("/api/create", {
      type: "POST",
      data: newWiki,
    })
      .then(() => {
        window.location.replace("/");
        console.log("after adding wiki");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
