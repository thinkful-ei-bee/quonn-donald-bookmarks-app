'use strict';

function handleBookMarkApp() {
  bindEventHandlers(); // renders list
  api
    .getItems() // grabs items from API endpoint
    .then(res => res.json())
    .then(bookmarks => {
      bookmarks.forEach(bookmark => {
        store.addNewBM(bookmark);}); // updates the local store
      bookmarkList.renderBM(); // renders the page
    });

}

function bindEventHandlers() { // binds our event handlers for the app
  bookmarkList.handleSubmit(); // event listener for submit button on create form
  bookmarkList.handleCreateFormBtn(); // event listener to toggle new bookmark creation form
  bookmarkList.handleDeleteBtn(); // event listener to delete bookmark from API and local storage
  bookmarkList.handleDetailedBtn(); // event listener that updates the "detailed" property of bookmark item
  bookmarkList.handleFilter();
}

$(handleBookMarkApp);
