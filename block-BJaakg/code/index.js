let modalWindow = document.querySelector(".modal-window")
let modalClose = document.querySelector(".modal-close")
let openButton =document.querySelector(".btn")
let booksUL = document.querySelector(".container")
let charactersUL = document.querySelector(".characters")

const booksURL = "https://www.anapioficeandfire.com/api/books"


function spinner(rootElm ,status=false) {
  if (status =true) {
      rootElm.innerHTML =`<div class="spinner"><div class="donut"></div></div>`
  }
}

// <div class="spinner"><div class="donut"></div></div>

function displayCharacters(characters) {
    spinner(charactersUL,true)
    Promise.all(characters.map(character => fetch(character).then(res=> res.json()))).then((charactersData)=>  {
        charactersUL.innerHTML=""
        charactersData.forEach(ch=> {
            let li = document.createElement("li")
            li.innerText = `${ch.name} : (${ch.aliases.join(" ")})`
            charactersUL.append(li)
        })
    })
    
    
    

    //characters.map(character => fetch(character).then(res=> res.json()).then(value=> console.log(value)))


}




function displayBooks(data) {
    booksUL.innerHTML=""
  data.forEach((book)=> {
    let article = document.createElement("article")
    article.classList.add("flex-30")
    let h2 = document.createElement("h2")
    h2.innerText=book.name
 
    let p = document.createElement("p")
    p.innerText =book.authors.join(" ")
 
    let btn = document.createElement("button")
    btn.classList.add("btn")
    btn.innerText=`show characters(${book.characters.length})`
    btn.addEventListener("click" , ()=> {
        console.log("clicked")
        modalWindow.style.display ="block"
        displayCharacters(book.characters)
        modalWindow.querySelector(".modal-close").addEventListener("click" , ()=> {
            modalWindow.style.display="none"
        })
    })
    

    article.append(h2,p,btn)

    booksUL.append(article)
  })
}
function fetchBooks() {
    spinner(booksUL,true)
    fetch(booksURL).then(res=> res.json()).then(booksdata=> {
       displayBooks(booksdata)
    })
}


fetchBooks()


