'use strict';

const bookmarkList = (function() {
  function generateBookmarkElement(bookmark) {
    let detailedBox;
    let description;
    if(bookmark.desc !== null){
      description = bookmark.desc;
    }else{
      description = "<p class='redText smallText'>No Description Submitted</p>";
    }
    if(bookmark.detailed){
      detailedBox = `<div id="detailedBox">
      <p>${bookmark.desc}</p>
      <div class="urlBtnBox">
      <a href="${bookmark.url}"}>${bookmark.url}</a>
    </div>
    </div>`;
    }else{
      detailedBox = `<div id="detailedBox" class="hidden">
      ${bookmark.desc}
      <div class="urlBtnBox">
      <button class=""><a href="${bookmark.url}"}>${bookmark.url}</a></button>
    </div>
    </div>`;
    }

    let bookmarkRatingTempVal;
    if(bookmark.rating === 1){
      bookmarkRatingTempVal = '<i class="fas fa-star "></i>';
    }else if(bookmark.rating === 2){
      bookmarkRatingTempVal = '<i class="fas fa-star "></i><i class="fas fa-star"></i>';
    }else if(bookmark.rating === 3){
      bookmarkRatingTempVal = '<i class="fas fa-star "></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
    }else if(bookmark.rating === 4){
      bookmarkRatingTempVal = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
    }else if(bookmark.rating === 5){
      bookmarkRatingTempVal = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star "></i><i class="fas fa-star"></i>';
    }else{
      bookmarkRatingTempVal = `<p class="redText smallText">Not Rated</p>`;
    }


    return `
    
      <!-- Bookmark -->
      <div id="${bookmark.id}" class="bookmarkItem">
      
        <span id="ratingBox">${bookmarkRatingTempVal}</span>
        <div class="bmContent">
      
        <button class="deleteBtn btn">X</button>
        <button class="detailed btn"><i class="fas fa-plus"></i></button>
        
        <p id="bmTitle">"${bookmark.title}..."</p>
        ${detailedBox}
        </div>
      </div>
    `
    ;

  }

  const generateBookmarkString = function(bookmarkList){
    const items = bookmarkList.map(item => generateBookmarkElement(item)); 
    // generates html string for each individual bookmark
    return items.join(''); 
    //joins html for all bookmarks
  };

  const renderBM = function(){ // renders the page with bookmarks from API endpoint
    let items = store.bookmarks;
    if(store.errorCode.errorMessage !== ""){
      
      $('#errorBox').html(`<p>${store.errorCode.errorMessage}</p>`)
    }
    if(store.ratingFilter.filterVal !== null){
      items = items.filter(item => item.rating >= store.ratingFilter.filterVal);
    }
    const bookmarkString = generateBookmarkString(items); 
    // creates HTML string to add to DOM
    $('.bmContainer').html(bookmarkString);
  };

  const renderCreateForm = function(){
    $('.createBox').toggleClass('hidden'); // toggles class
  };

  const handleSubmit = function() {
    $('#formCreate').on('click', '#submit', function(event) {
      // takes input from form
      event.preventDefault();
      const title = $('#title').val();
      const url = $('#url').val();
      const desc = $('#desc').val();
      const rating = $('input[name=rating]:checked').val();
      //makes API POST call to create and add new bookmarks to endpoint
      api
        .createBM(title, url, desc, parseInt(rating))
        .then(res => res.json())
        .then(newBM => {
          // adds a copy of recently created bookmark
          // to local store
        if(newBM.message === undefined){
          store.defaultLayout.createFormVis = !store.defaultLayout.createFormVis;
          renderCreateForm(); 
          store.addNewBM(newBM); 

        }else{
          store.errorCode.errorMessage = newBM.message;
        }

          renderBM(); // rerenders page with updated endpoint values
        });
      $('#title').val('');
      $('#url').val('');
      $('#desc').val('');
      $('textarea[name=rating]:checked').val('');
    });
  };

  const handleCreateFormBtn = function(){
    $('#createBtn').on('click', function(){
      // updates store to know to enable 
      // create form
      console.log("create");
      store.defaultLayout.createFormVis = !store.defaultLayout.createFormVis;
      renderCreateForm(); // toggles hidden class for div.createbox
    });
  };

  const handleDeleteBtn = function(){
    $('.bmContainer').on('click','.deleteBtn', function(){
      // captures id of the delete button of the selected
      // bookmark
      let id = $(this).closest('div.bookmarkItem').attr('id'); 
      // makes API delete call using ID to remove bookmark from endpoint
      api.deleteItems(id).then(res => res.json())
        .then(bm => {
          console.log(id);
          console.log(store.bookmarks);
          store.removeBM(id); // deletes bookmark in local storage
          api
    .getItems()
    .then(res => res.json())
    .then(items => {
      store.bookmarks = [];
      items.forEach(item => {
        store.addNewBM(item)});
      renderBM();
    });
        });
        renderBM();
    });
  };

  const handleDetailedBtn = function(){
    $('.bmContainer').on('click','.detailed', function(){
      let bmId = $(this).closest('div.bookmarkItem').attr('id');
      // on button press, updates "detailed" property of the selected bookmark 
      // using its ID
      store.bookmarks.forEach(bookmark => {
        if(bookmark.id === bmId){
          bookmark.detailed = !bookmark.detailed;
        }
      });
      renderBM();
    });
  };

  const handleFilter = function(){
    $('select#ratingFilter').change(function(){ // listens for action on the dropdown
      var selected = $(this).children('option:selected').attr('id');
      store.ratingFilter.filterVal = selected;
      renderBM();
    });
  };

   const bindEventListeners = function(){
     handleCreateFormBtn();
     handleDeleteBtn();
     handleDetailedBtn();
     handleFilter();
     handleSubmit();
   }
  return { handleSubmit,
    renderBM,
    handleCreateFormBtn,
    renderCreateForm,
    handleDeleteBtn,
    handleDetailedBtn,
    handleFilter,
    bindEventListeners
  };
})();
