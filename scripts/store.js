"use strict";
const bookmarks = [];
const store = (function(){
    const defaultLayout = {
        createFormVis: false
    };

    const ratingFilter = {
        filterVal: null
    }

    const errorCode = {
        errorMessage: ""
    }

    const addNewBM = function(item) {
        item.detailed = false;
        this.bookmarks.push(item);
      };

      const removeBM = function(id){
          this.bookmarks.forEach(item => {
              if(item.id === id){
                this.bookmarks.splice(this.bookmarks.indexOf(id), 1);
              }
          })
      }

    return {
        defaultLayout,
        addNewBM,
        removeBM,
        ratingFilter,
        errorCode,
        bookmarks
    }
})();