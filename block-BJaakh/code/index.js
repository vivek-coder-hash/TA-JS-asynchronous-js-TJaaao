


    let input = document.querySelector(".input") 
    
    let root  = document.querySelector("ul")
 
    let allTodos = JSON.parse(localStorage.getItem("todos")) || [] ;

    const baseURL = "https://sleepy-falls-37563.herokuapp.com/api/"
 
 
   
 
    /*   input.addEventListener("keyup" , function(event) {
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
         
           
       })   */
       
       
       /*function handleDelete(event) {
         event.target.parentElement.parentElement.remove();
         localStorage.setItem("todos",JSON.stringify(allTodos))  // for local storage
       }*/

       function handleDelete(id) {
        fetch(baseURL+`todo/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
           
          }).then(()=> {
              displayTodos()
          })
       }


       function handleToggle(id , status) {

        let data = {
            todo: {
                isCompleted: !status
            }
        }
        fetch(baseURL+`todo/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
           
          }).then(()=> {
              displayTodos()
          })
       }


       function handleEdit(event ,id,title) {
    

          let inputt = document.createElement("input")
          inputt.value = title
          inputt.addEventListener("keyup" , (event)=> {
            if (event.keyCode === 13 && event.target.value !== "") {
                let data = {
                    todo: {
                        title: event.target.value
                    }
                }
                fetch(baseURL+`todo/${id}`, {
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                   
                  }).then(()=> {
                      displayTodos()
                  })
            }
          })
          let p = event.target
          let parent = event.target.parentElement
          parent.replaceChild(inputt,p)
          console.log(inputt,p,parent)  

       }



 
     function createUI(data) {
 
         root.innerHTML=""
 
         data.forEach((todo)=> {
             let li = document.createElement("li")
             li.classList.add("flex", "justify-between")
     
             let input = document.createElement("input")
             input.type="checkbox"
             input.name ="checkbox"
             input.checked=todo.isCompleted
             input.setAttribute("data-id" , todo._id)
             input.addEventListener("click" ,()=> handleToggle(todo._id , todo.isCompleted))
             
 
 
     
     
             let p = document.createElement("p")
             p.classList.add("text")
             p.innerText=todo.title
             p.addEventListener("dblclick" , (event)=> handleEdit(event,todo._id ,todo.title))
     
     
             let a =document.createElement("a")
             a.classList.add("btn")
     
             let span =document.createElement("span")
             span.innerHTML ="✖"
             span.setAttribute("data-id" , todo._id)
             span.addEventListener("click" ,()=> handleDelete(todo._id))
     
             a.append(span)
     
             li.append(input,p,a)
 
             root.append(li)
         })
         
        
     }      
 
 
 
     function displayTodos() {
        fetch(baseURL+"todo").then(res=> res.json()).then((allTodos)=> {
            console.log(allTodos.todos)
            createUI(allTodos.todos)
        })
     }


     input.addEventListener("keyup" , function(event) {
        if (event.keyCode === 13 && event.target.value !== "")  {
            let data = {
                todo: {
                    title: event.target.value,
                    "isCompleted" : false
                }
            }
            fetch(baseURL+"todo", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
              }).then(()=> {
                  event.target.value=""
                  displayTodos()
              })
        }

        localStorage.setItem("todos",JSON.stringify(allTodos))  // for local storage
       
         
     }) 

     displayTodos()
 
 
 
 