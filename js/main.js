let elWrapper = document.querySelector("#wrapper")
let elListGrop = document.querySelector("#bookmark_list_grop")
let elBookModal = document.querySelector(".book-modal")
let elForm = document.querySelector("#form")
let elSearchInput = document.querySelector("#search_input")
let elshowingresult = document.querySelector("#showing__result")

let elwrapperTemplate = document.querySelector(".wrapper-templale").content;
let elbookMarkTemplate = document.querySelector(".bookmark-temlate").content;






;(async function() {
    let recponce = await fetch(`https://www.googleapis.com/books/v1/volumes?q=python`)
    let data = await recponce.json()
    let result = data.items
    console.log(result);
    renderBooks(result, elWrapper)
})()




// render books
function renderBooks(array , wrapper) {
    wrapper.innerHTML = null;
    
    let booksFragment = document.createDocumentFragment()
    
    array.forEach(item => {
        
        let bookstemplate = elwrapperTemplate.cloneNode(true)
        
        bookstemplate.querySelector("#card-img-top").src = item.volumeInfo.imageLinks.smallThumbnail;
        bookstemplate.querySelector("#card-title").textContent = item.volumeInfo.title
        bookstemplate.querySelector("#card-text").textContent = item.volumeInfo.authors
        bookstemplate.querySelector("#card-year").textContent = item.volumeInfo.publishedDate
        bookstemplate.querySelector("#read__btn").href = item.volumeInfo.previewLink
        bookstemplate.querySelector(".bookmark__btn").dataset.bookId = item.id
        bookstemplate.querySelector(".info__btn").dataset.bookForModalId = item.id
        
        
        
        
        booksFragment.appendChild(bookstemplate)
    });
    
    wrapper.appendChild(booksFragment)
    
    elshowingresult.textContent = array.length
    
}


elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    
    let searchValue = elSearchInput.value.trim()
    
    if (searchValue) {
        ;(async function(){
            let responce = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`)
            let data = await responce.json()
            let result = data.items
            renderBooks(result, elWrapper)
        })();
        
        
    }
    elSearchInput.value = null
    
    
    
})

// -------------------------------------------------------------------------------

// let storage = window.localStorage
// let getItemFormLocalStorage = JSON.parse(storage.getItem("movieArray"))

let savebookmark =  [] || getItemFormLocalStorage



function bookmarkrender(array, wrapper) {
    
    wrapper.innerHTML = null
    
    let bookmarkFragment = document.createDocumentFragment()
    
    array.forEach(item => {
        
        let bookmarkTemplate = elbookMarkTemplate.cloneNode(true)
        
        bookmarkTemplate.querySelector("#bookmark__title").textContent = item.title
        bookmarkTemplate.querySelector("#bookmark__text").textContent = item.authors
        
        bookmarkFragment.appendChild(bookmarkTemplate)
    });
    
    wrapper.appendChild(bookmarkFragment)
}



elWrapper.addEventListener("click", function (evt) {
    
    let bookIDs = evt.target.dataset.bookId
    
    if (bookIDs) {
        ;(async function(){
            let responce = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookIDs}`)
            let data = await responce.json()
            let result = data.volumeInfo
            savebookmark.push(result)
            bookmarkrender(savebookmark, elListGrop)
            
            
            // let doesInclute = savebookmark.findIndex(function (item) {
            //     return item.id === bookIDs
            // })
            
            // console.log(doesInclute);
            
            // if (doesInclute === -1) {
            //     savebookmark.push(result)
            //     storage.setItem("movieArray",JSON.stringify(savebookmark))
            //     console.log(savebookmark);
                
            // }
        })();
        
        
        
        
    }
    
    
})


// more info 
elWrapper.addEventListener("click",function (evt) {
    let bookInfoBtn = evt.target.dataset.bookForModalId
    
    if (bookInfoBtn) {
        ;(async function(){
            let responce = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookInfoBtn}`)
            let data = await responce.json()
            let result = data.volumeInfo
            
            elBookModal.querySelector(".book_modal_title").textContent = result.title
            elBookModal.querySelector(".modal_img").src = result.imageLinks.smallThumbnail
            elBookModal.querySelector(".modal_text").textContent = result.description
            elBookModal.querySelector(".modal_author").textContent = result.authors
            elBookModal.querySelector(".modal_published").textContent = result.publishedDate
            elBookModal.querySelector(".modal_publishers").textContent = result.publisher
            elBookModal.querySelector(".modal_categories").textContent = result.categories
            elBookModal.querySelector(".modal_count").textContent = result.printedPageCount
            
            
            v
            
        })();
    }
    
})