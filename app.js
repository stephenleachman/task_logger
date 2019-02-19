
// DEFINE UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// LOAD ALL EVENT LISTENERS
loadEventListeners();


// LOAD ALL EVENT LISTENERS
function loadEventListeners(){

    // DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded', getTasks);

    // ADD TASK EVENT
    form.addEventListener('submit', addTask);

    // REMOVE TASK EVENT
    taskList.addEventListener('click', removeTask);

    // CLEAR TASK EVENT
    clearBtn.addEventListener('click', clearTasks);

    // FILTER TASK EVENT EVENT
    filter.addEventListener('keyup', filterTasks);
}


// GET TASKS FROM LS
function getTasks() {

    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

        // CREATE LI ELEMENT
        const li = document.createElement('li');

        // ADD CLASS
        li.className = 'collection-item';

        // CREATE TEXT NODE AND APPEND TO LI
        li.appendChild(document.createTextNode(tasks));

        // CREAT NEW LINK ELLAMENT
        const link = document.createElement('a');

        // ADD CLASS
        link.className = 'delete-item secondary-content';

        // ADD ICON HTML
        link.innerHTML = '<i class="fas fa-times"></i>';

        // APPEND THE LINK TO THE LI
        li.appendChild(link);

        // APPEND LI TO UL
        taskList.appendChild(li);
    });
}


// ADD TASK
function addTask(e) {

    if(taskInput.value === ''){
        alert('Add Task');
    }

    // CREATE LI ELEMENT
    const li = document.createElement('li');

    // ADD CLASS
    li.className = 'collection-item';

    // CREATE TEXT NODE AND APPEND TO LI
    li.appendChild(document.createTextNode(taskInput.value));

    // CREAT NEW LINK ELLAMENT
    const link = document.createElement('a');

    // ADD CLASS
    link.className = 'delete-item secondary-content';

    // ADD ICON HTML
    link.innerHTML = '<i class="fas fa-times"></i>';

    // APPEND THE LINK TO THE LI
    li.appendChild(link);

    // APPEND LI TO UL
    taskList.appendChild(li);

    // STORE IN LOCAL-STORAGE
    storeInLocalStorage(taskInput.value);

    // CLEAR INPUT
    taskInput.value = '';

    e.preventDefault();
}


// STORE TASK
function storeInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//  REMOVE TASK
function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item')) {

        if(confirm('Are You Sure?')) {

            e.target.parentElement.parentElement.remove();

            // REMOVE FROM LOCAL STORAGE
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}


// REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem) {
    
    let tasks;

    if(localStorage.getItem('tasks') === null) {

        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {

        if(taskItem.textContent === task) {

            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// CLEAR ALL TASKS
function clearTasks(){
   
    if(confirm('Are You Sure?')){

        // taskList.innerHTML = '';

        // FASTER WAY OF CLEARING TASKS - WHILE
        while(taskList.firstChild) {

            taskList.removeChild(taskList.firstChild);
        }
    }   
    // CLEAR FROM LOCAL STORAGE
    clearTaskFromLocalStorage();
}


// CLEAR TASKS FROM LOCAL STORAGE
function clearTaskFromLocalStorage() {

    localStorage.clear();
}


// FILTER TASKS
function filterTasks(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){

        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){

            task.style.display = 'block';

        } else {

            task.style.display = 'none';
        }
    });
}