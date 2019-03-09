"use strict";

function startApp() {
  bookmarkList.bindEventListeners();
  bookmarkList.generateList();
}

function bindEventHandlers() {
  // binds our event handlers for the app
  bookmarkList.handleSubmit(); // event listener for submit button on create form
  bookmarkList.handleCreateFormBtn(); // event listener to toggle new bookmark creation form
  bookmarkList.handleDeleteBtn(); // event listener to delete bookmark from API and local storage
  bookmarkList.handleDetailedBtn(); // event listener that updates the "detailed" property of bookmark item
  bookmarkList.handleFilter();
}

$(startApp);
