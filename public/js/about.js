// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(document).ready(() => {
  // Getting references to our form and inputs
  const about = $(".collection-item");
  const viewWikiPage = $("#viewEachWiki");

  viewWikiButton.on("click", (event) => {
    event.preventDefault();
    const wikiData = {
      category: viewWikiPage.val().trim(),
      title: viewWikiPage.val().trim(),
      description: viewWikiPage.val().trim(),
    };

    if (!wikiData.category || !userData.title || !userData.description) {
      return;
    }
  });

  $.ajax("/api/view/:id", {
    type: "Get",
    data: newWiki,
  })
    .then(() => {
      window.location.replace("/wikis");
      console.log("created new cat");
      // If there's an error, log the error
    })
    .catch((err) => {
      console.log(err);
    });
});
