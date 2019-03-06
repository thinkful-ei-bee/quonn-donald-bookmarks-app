'use strict';

const api = (function() {
  const BASE_URL = "https://thinkful-list-api.herokuapp.com/dq1";

  const getItems = function() {
    return fetch(`${BASE_URL}` + "/bookmarks");
  };

  const deleteItems = function(id){
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
    return fetch(`${BASE_URL}` + "/bookmarks/" + id,options);
  }

  const createBM = function(title, url, desc, rating) {
    const newbM = JSON.stringify({
      title: title,
      url: url,
      desc: desc,
      rating: rating
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: newbM
    };

    return fetch(`${BASE_URL}` + "/bookmarks", options);
  };

  return {
    getItems,
    createBM,
    deleteItems
  };
})();
