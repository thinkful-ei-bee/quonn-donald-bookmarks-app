function startApp() {
  api
    .getItems()
    .then(res => res.json())
    .then(items => {
      items.forEach(item => {
        store.addNewBM(item)});
      bookmarkList.renderBM();
    });
  bookmarkList.bindEventHandlers();
}

function handleBookMarkApp() {
  startApp();
}

$(handleBookMarkApp);
