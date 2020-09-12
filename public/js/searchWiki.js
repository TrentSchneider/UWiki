// ** For future development
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(() => {
  // Getting references to and from our inputs
  const searchWikiButton = $(".collection-item");
  const wikiList = $("#searchListWiki");

  searchWikiButton.on("click", event => {
    event.preventDefault();
    const searchData = {
      category: wikiList.val().trim(),
      title: wikiList.val().trim(),
      description: wikiList.val().trim()
    };
    // stops the remaining code from running if a field is empty
    if (!searchData.category || !searchData.title || !searchData.description) {
      return;
    }
  });

  $.ajax("/view/:id", {
    type: "Get",
    data: newWiki
  })
    .then(() => {
      window.location.replace("/view/:id");
      console.log("view wiki list on main page");
      // If there's an error, log the error
    })
    .catch(err => {
      console.log(err);
    });
});
