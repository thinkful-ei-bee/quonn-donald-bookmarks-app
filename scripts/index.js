function startApp() {
  api
    .getItems()
    .then(res => res.json())
    .then(items => {
      items.forEach(item => {
        store.addNewBM(item)});
      bookmarkList.renderBM();
    });
  bookmarkList.handleSubmit();
  bookmarkList.handleCreateFormBtn();
  bookmarkList.renderCreateForm();
  bookmarkList.handleDeleteBtn();
  bookmarkList.handleDetailedBtn();
  bookmarkList.filterBMList();
}

function handleBookMarkApp() {
  startApp();
}

$(handleBookMarkApp);
