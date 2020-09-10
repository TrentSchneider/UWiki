// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(document).ready(() => {
  // Getting references to our form and inputs
  const viewWikiLink = $(".collection-item"); //Link to view teh wiki description page

  viewWikiLink.on("click", (event) => {
    event.preventDefault();
    const id = $(this).data("id");

    $.ajax("/view/" + id, {
      type: "GET",
    }).catch((err) => {
      console.log(err);
    });
  });
});
