let input = document.querySelector("input")

let flex = document.querySelector(".flex")
let userImage = document.querySelector(".flex img")
let userName = document.querySelector(".flex h2")
let userLogin =document.querySelector(".flex p")

let followers = document.querySelector(".followers")

let following = document.querySelector(".following")

function fetch(url ,successhandler) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET" , url)

    xhr.onload = ()=> successhandler(JSON.parse(xhr.response))
    
    

    xhr.onerror = function() {
        console.error("Something went wrong!")
    }


    xhr.send()
}

/*function displayFollowers(username) {
    followers.innerHTML =""
  fetch(`https://api.github.com/${username}/followers`, function(followersList){
  let topFive = followersList.slice(0,5)   
   topFive.forEach(info =>{
    let img = document.createElement("img")
    img.src = info.avatar_url
    img.alt = info.name
    
    li.append(img)
    followers.append(li)


   })

  })
}*/

function displayExtraInfo(url , rootElm) {
    rootElm.innerHTML =""
    fetch(url, function(followersList){
    let topFive = followersList.slice(0,5)   
     topFive.forEach(info =>{
      let img = document.createElement("img")
      img.src = info.avatar_url
      img.alt = info.name
      
      li.append(img)
      following.append(li)
  
  
     })
  
    })
  }


function handleDisplay(userInfo) {
    userImage.src = userInfo.avatar_url
    userImage.alt = userInfo.name
    userName.innerText  = userInfo.name
    userLogin.innerText = "@"+userInfo.login
    displayExtraInfo(`https://api.github.com/${userInfo.login}/followers`, followers)
    displayExtraInfo(`https://api.github.com/${userInfo.login}/following`, following)

}

function handleInput(event) {
    if (event.keyCode === 13 && input.value) {
        //console.log(input.value)
        let username = input.value ;
        const url = "https://api.github.com/users/"


        fetch (url+username , handleDisplay)
      /*  let xhr = new XMLHttpRequest()
        xhr.open("GET" , url+username)

        xhr.onload = function() {
            handleDisplay(JSON.parse(xhr.response))
            //console.log(JSON.parse(xhr.response))
        }

        xhr.onerror = function() {
            console.error("Something went wrong!")
        }


        xhr.send() */
        input.value =""

    }
}
input.addEventListener("keydown" , handleInput)

// https://api.thecatapi.com/v1/images/search?limit=1&size=full

let flexCat = document.querySelector(".flex-cat")
let btn = document.querySelector("button")
let catImage  = document.querySelector(".flex-cat img")

function handleClick() {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=1&size=full` , function(catInfo) {
        catImage.src = catInfo[0].url
    })
}

btn.addEventListener("click" , handleClick)