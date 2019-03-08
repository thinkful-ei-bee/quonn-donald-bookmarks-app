function startApp() {
bookmarkList.bindEventListeners();
  api
    .getItems()
    .then(res => res.json())
    .then(items => {
      items.forEach(item => {
        store.addNewBM(item)});
      bookmarkList.renderBM();
    });
  
}

function handleBookMarkApp() {
  console.log(api.remoteBookmarks);
  startApp();
}

$(handleBookMarkApp);
