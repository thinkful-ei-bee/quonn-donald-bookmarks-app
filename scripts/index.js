function startApp() {
  api.getItems();
  bookmarkList.handleSubmit();
}

function handleBookMarkApp() {
  startApp();
}

$(handleBookMarkApp);
