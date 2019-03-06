const bookmarkList = (function() {

  function generateBookmarkElement(bookmark) {
    
    let detailedBox;

    if(bookmark.detailed){
      detailedBox = `<div id="detailedBox">
      ${bookmark.desc}
      <div class="urlBtnBox">
      <button class="btn"><a href="${bookmark.url}"}>Visit Site</a></button>
    </div>
    </div>`;
    }else{
      detailedBox = `<div id="detailedBox" class="hidden">
      ${bookmark.desc}
      <div class="urlBtnBox">
      <button class="btn"><a href="${bookmark.url}"}>Visit Site</a></button>
    </div>
    </div>`;
    }

    let bookmarkRatingTempVal;
    if(bookmark.rating === 1){
      bookmarkRatingTempVal = `<i class="fas fa-star"></i>`;
    }else if(bookmark.rating === 2){
      bookmarkRatingTempVal = `<i class="fas fa-star"></i><i class="fas fa-star"></i>`;
    }else if(bookmark.rating === 3){
      bookmarkRatingTempVal = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
    }else if(bookmark.rating === 4){
      bookmarkRatingTempVal = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
    }else{
      bookmarkRatingTempVal = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
    }


    return `
    
      <!-- Bookmark -->
      <div id="${bookmark.id}" class="bookmarkItem">
      <button class="deleteBtn">X</button>
        <p id="">"${bookmark.title}"</p>
        <span id="ratingBox">${bookmarkRatingTempVal}</span>
        <div>
        <button class="detailed btn">Detailed View</button>
        ${detailedBox}
        </div>
      </div>
    `
    ;

  }

  const generateBookmarkString = function(bookmarkList){
    const items = bookmarkList.map(item => generateBookmarkElement(item));
    return items.join("");
  }

  const renderBM = function(){
    let items = [...store.bookmarks];
    if(store.ratingFilter.filterVal){
      items = items.filter(item => item.rating === store.ratingFilter.filterVal);
      console.log(items);
    }
    const bookmarkString = generateBookmarkString(items);
    $('.bmContainer').html(bookmarkString);
}

const renderCreateForm = function(){
      $('.createBox').toggleClass("hidden");
}

  const handleSubmit = function() {
    $("#formCreate").on("click", "#submit", function(event) {
      event.preventDefault();
      const title = $("#title").val();
      const url = $("#url").val();
      const desc = $("#desc").val();
      const rating = $("input[name=rating]:checked").val();
      api
        .createBM(title, url, desc, parseInt(rating))
        .then(res => res.json())
        .then(newBM => {
          store.addNewBM(newBM);
          renderBM();
        });

    });
  };

  const handleCreateFormBtn = function(){
    $('#createBtn').on("click", function(){
      if(!store.defaultLayout.createFormVis){
        store.defaultLayout.createFormVis = true;
      }else{
        store.defaultLayout.createFormVis = false;
      }
      renderCreateForm();
    });
  };

  const handleDeleteBtn = function(){
    let id;
    $('.bmContainer').on("click",".deleteBtn", function(){
      id = $(this).closest('div.bookmarkItem').attr("id");
      api.deleteItems(id).then(res => res.json())
      .then(bm => {
        store.removeBM(id);
        renderBM();
      });
      renderBM();
    });
  }

  const handleDetailedBtn = function(){
    let bmId;
    $('.bmContainer').on("click",".detailed", function(){
      bmId = $(this).closest('div.bookmarkItem').attr("id");
      store.bookmarks.forEach(item => {
        if(item.id === bmId){
          item.detailed = !item.detailed;
        }
      });
      renderBM();
    });
  }

  const filterBMList = function(){
    $("select#ratingFilter").change(function(){
      var selected= $(this).children("option:selected").val();
      store.ratingFilter.filterVal = selected;
      renderBM();
  });
  }

  return { handleSubmit,
    renderBM,
    handleCreateFormBtn,
    renderCreateForm,
    handleDeleteBtn,
    handleDetailedBtn,
    filterBMList
  };
})();
