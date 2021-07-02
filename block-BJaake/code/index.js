let url =`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`

//fetch(url).then(res => res.json()).then(news=> console.log(news)) // This console will print news

fetch(url).then(res => res.json()).then(news=>{
    allNews=news
    renderNews(news)
    let allSources = Array.from(new Set(news.map(n=> n.newsSite)))
    //console.log(allSources)
    displayOptions(allSources)
})

let newsElm = document.querySelector(".news")

let select = document.querySelector("select")

let allNews = []

/* <div class="flex-50">
              <img
                src="https://mk0spaceflightnoa02a.kinstacdn.com/wp-content/uploads/2021/03/50875730681_b4e2d8c6cc_k.jpg"
                alt=""
              />
            </div>
            <div class="flex-50">
              <a class="btn btn-pri" href="#">news paper</a>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea,
                eveniet.
              </p>
              <a class="btn btn-sec" href="#">read more</a>*/

 
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