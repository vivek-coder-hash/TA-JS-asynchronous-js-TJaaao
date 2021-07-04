


    let input = document.querySelector(".input") 
    
    let root  = document.querySelector("ul")
 
    let allTodos = JSON.parse(localStorage.getItem("todos")) || [] ;
 
 
   
 
       input.addEventListener("keyup" , function(event) {
          if (event.keyCode === 13 && event.target.value !== "")  {
             let todo = {
                 name: event.target.value ,
                 isDone:false ,
             } ;
   
             allTodos.push(todo)
             event.target.value=""
 
             createUI()
          }
 
          localStorage.setItem("todos",JSON.stringify(allTodos))  // for local storage
         
           
       })   
       
       
       function handleDelete(event) {
         event.target.parentElement.parentElement.remove();
         localStorage.setItem("todos",JSON.stringify(allTodos))  // for local storage
       }
 
     function createUI() {
 
         root.innerHTML=""
 
         allTodos.forEach((todo,i)=> {
             let li = document.createElement("li")
             li.classList.add("flex", "justify-between")
     
             let input = document.createElement("input")
             input.type="checkbox"
             input.name ="checkbox"
             input.checked=todo.isDone
             input.id =i
             input.addEventListener("change" , function handlechange(event){
                 let id  = event.target.id
                 allTodos[id].isDone =!allTodos[id].isDone
                 localStorage.setItem("todos",JSON.stringify(allTodos))   // for local storage
             })
 
 
     
     
             let p = document.createElement("p")
             p.classList.add("text")
             p.innerText=todo.name
             
     
     
             let a =document.createElement("a")
             a.classList.add("btn")
     
             let span =document.createElement("span")
             span.innerHTML ="✖"
             span.setAttribute("data-id" , i)
             span.addEventListener("click" , handleDelete)
     
             a.append(span)
     
             li.append(input,p,a)
 
             root.append(li)
         })
         
        
     }      
 
 
 
     createUI()
 
 
 
 