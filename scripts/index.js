"use strict";

function startApp() {
  bookmarkList.bindEventListeners();
  bookmarkList.generateList();
}

function handleBookMarkApp() {
  startApp();
}

$(handleBookMarkApp);
