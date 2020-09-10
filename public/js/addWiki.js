// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(document).ready(() => {
  $(".add-form").on("submit", (event) => {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    //const variable for
    const addWiki = $("#add-form");

    addWiki.on("submit", (event) => {
      event.preventDefault();
      const newWiki = {
        category: category.val.trim(),
        title: title.val.trim(),
        description: description.val.trim(),
      };

      if (!newWiki.category || !newWiki.title || !newWiki.description) {
        return;
      }
    });
    //do we need to clear the add form?

    // Send the POST request
    $.ajax("/create", {
      type: "POST",
      data: newWiki,
    })
      .then(() => {
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

//how to get the id after wiki created???

//get the create button locator
