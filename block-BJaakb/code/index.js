//https://unsplash.com/documentation
//cWrvuAS9Z64plSSm-ExsBGqC9yxS-rKzsIgRPIRZmgk
const url ="https://api.unsplash.com/photos/?client_id=cWrvuAS9Z64plSSm-ExsBGqC9yxS-rKzsIgRPIRZmgk"
const getSearchUrl = (query)=> `https://api.unsplash.com/search/photos?query=${query}/?client_id=cWrvuAS9Z64plSSm-ExsBGqC9yxS-rKzsIgRPIRZmgk`

let root = document.querySelector(".flex")
let searchElm = document.querySelector("input")

/*function fetch(url , successHandler) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET" , url)
    xhr.onload =() =>successHandler(JSON.parse(xhr.response))

    xhr.onerror = function() {
        console.log("something went wrong!")
    }

    xhr.send()
}*/


function fetch(url) {
    return new Promise((res , rej)=> {
        let xhr = new XMLHttpRequest();
        xhr.open("GET" , url)
        xhr.onload = ()=> res(JSON.parse(xhr.response))
        xhr.onerror = ()=> rej("Something went Wrong!!")

        xhr.send()
    })
}

function displayImages(images) {
    
        root.innerHTML=""
        images.forEach(image=> {
            let div = document.createElement("div")
            div.classList.add("flex-20")
    
            let img =document.createElement("img")
            img.src = image.urls.thumb
    
            div.append(img)
            root.append(div)
    
        })
    
}

fetch(url).then(displayImages).catch((error)=> console.log(error))

function handleSearch(event) {
  if (event.keyCode === 13 && searchElm.value) {
     fetch(getSearchUrl(searchElm.value)).then(searchResult=> {
        displayImages(searchResult.results)
     }).catch((error)=> console.log(error))
        
        
    
     searchElm.value=""
  }
}

searchElm.addEventListener("keyup" , handleSearch)



//


