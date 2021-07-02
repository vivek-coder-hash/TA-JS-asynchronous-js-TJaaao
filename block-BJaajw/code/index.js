let url =`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`
let newsElm = document.querySelector(".news")

let select = document.querySelector("select")

let allNews = []
let main = document.querySelector("section")
let errorElm =document.querySelector(".error")


function handleError(message = "something went wrong") {
    main.style.display = "none"
    errorElm.style.display="block"
    errorElm.innerText=message
}
function handleSpinner(status =false) {
    let isLoading = false ;
    if (status) {
        newsElm.innerHTML = `<div class = "spinner"><div class="donut"></div></div>`
    }
   
}

//fetch(url).then(res => res.json()).then(news=> console.log(news)) // This console will print news
 






/* <div class="donut"></div>*/

 
function renderNews(news) {
    newsElm.innerHTML=""
    news.forEach(newsItem => {

       let divp = document.createElement("div")
       divp.classList.add("flex" , "justify" , "align")

        let div1 = document.createElement("div")
        div1.classList.add("flex-50")
        let img = document.createElement("img")
        img.src= newsItem.imageUrl
        img.alt =newsElm.title

        div1.append(img)

        let div2 =document.createElement("div")
        div2.classList.add("flex-50")
        let a1 = document.createElement("a")
        a1.classList.add("btn" , "btn-pri")
        a1.innerText =newsItem.newsSite
        let p =document.createElement("p")
        p.innerText = newsItem.title
        let a2 =document.createElement("a")
        a2.classList.add("btn" , "btn-sec")
        a2.href =newsItem.url
        a2.innerText = "Read More"

        div2.append(a1,p,a2)

        divp.append(div1 , div2)

        newsElm.append(divp)
        

    
    })
} 


function displayOptions(sources) {
    // <option value="all">All</option>

    
    sources.forEach(source=> {
        let option = document.createElement("option")
        option.innerText = source
        option.value=source
        select.append(option)

    })
}

function init() {
   
    handleSpinner(true)
   fetch(url)
   .then(res => {
       if(res.ok) {
           return res.json()
       }

       else {
           throw new Error("Response not ok!")
       }
   })
   .then(news=>{
    
    handleSpinner()
       allNews=news
       renderNews(news)
       let allSources = Array.from(new Set(news.map(n=> n.newsSite)))
       //console.log(allSources)
       displayOptions(allSources)
   }).catch(error=> handleError(error))
}

select.addEventListener("change" ,(event)=> {
    // console.log(event.target.value)

    let source  =event.target.value.trim()
    let filterNews

    if (source) {
      filterNews  = allNews.filter(news=> news.newsSite=== source)
    }

  else {
      filterNews=allNews
  }    
    renderNews(filterNews)

})


if (navigator.onLine) {
    init()
}

else {
    handleError()
}
