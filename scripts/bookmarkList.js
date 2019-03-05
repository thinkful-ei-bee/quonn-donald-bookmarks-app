const bookmarkList = (function() {
  const handleSubmit = function() {
    $("#formCreate").on("click", "#submit", function(event) {
      event.preventDefault();
      const title = $("#title").val();
      const url = $("#url").val();
      const desc = $("#desc").val();
      const rating = $("input[name=rating]:checked").val();
      api.createBM(title, url, desc, parseInt(rating));
      console.log(rating);
    });
  };

  return { handleSubmit };
})();
