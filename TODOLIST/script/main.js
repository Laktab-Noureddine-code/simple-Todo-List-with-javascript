let arrayOfTasks = [];

const add = document.getElementById('add')
const task = document.getElementById('task')
const tasks = document.querySelector('.tasks')

// add tasks from local storage to array
if(localStorage.tasks){
    arrayOfTasks = JSON.parse(localStorage.tasks)
    // if true => add tasks to page
    addToPage(arrayOfTasks)
}
// complete and delete the tasks
tasks.addEventListener('click' ,(e)=>{
    if(e.target.classList.contains('ri-circle-line')){
        e.target.parentElement.classList.add('done')
        e.target.classList.replace('ri-circle-line' ,'ri-circle-fill')
        completedTasks(e.target.parentElement.dataset.id)
    }else if(e.target.classList.contains('ri-circle-fill')){
        e.target.parentElement.classList.remove('done')
        e.target.classList.replace('ri-circle-line' ,'ri-circle-line')
        completedTasks(e.target.parentElement.dataset.id)
    }else if(e.target.classList.contains('del')){
        e.target.parentElement.parentElement.remove()
        removeFromArray(e.target.parentElement.parentElement.dataset.id)
    }
})

// completed tasks
function completedTasks(id){
    arrayOfTasks.forEach((task ,index)=>{
        if(task.id == id){
            if(task.completed == false){
                task.completed = true
            }else{
                task.completed = false
            }
        }
        addToPage(arrayOfTasks)
        addToLocalStorage(arrayOfTasks)
    })
}


// delete tasks
function removeFromArray(id){
    arrayOfTasks = arrayOfTasks.filter(task => task.id != id)
    addToPage(arrayOfTasks)
    addToLocalStorage(arrayOfTasks)
}
// add the task to the arrayOfTasks
add.onclick= ()=>{
    if(!task.value == ""){
        addTaskToArray(task.value)
    }
    task.value = ""
}
function addTaskToArray(task){
    const taskTodo = {
        id : Date.now(),
        title : task,
        completed : false
    }
    arrayOfTasks.push(taskTodo)

    // add tasks to the page
    addToPage(arrayOfTasks)

    // add the tasks to local storage
    addToLocalStorage(arrayOfTasks)
}
function addToPage(array){
    tasks.innerHTML = ""
    array.forEach(task=>{
        // create a task div
        const div = document.createElement('div')
        div.classList.add('task')
        div.setAttribute('data-id' ,task.id)
    
        // check if the task is done
        div.innerHTML = `
            <i class="ri-circle-line"></i>
            <p>${task.title}</p>
            <span><i class="ri-delete-bin-6-line del"></i><span>
        `
        if(task.completed == true){
            div.classList.add('task','done')
            div.innerHTML = `
                 <i class="ri-circle-fill"></i>
                <p><del>${task.title}<del></p>
                <span><i class="ri-delete-bin-6-line del"></i><span>
            `
        }
        tasks.append(div)
    })
    
}

function addToLocalStorage(array){
    localStorage.tasks = JSON.stringify(array)
}
