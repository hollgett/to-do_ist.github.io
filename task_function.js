const formTask = document.querySelector('.task-form');
const taskList = document.querySelector('.task-list');
taskList.innerHTML = localStorage.getItem('data');
taskList.addEventListener('click', taskClick);
const allTask = document.getElementById('all');
const unCompletedTask = document.getElementById('uncompleted');
const ClearTask = document.getElementById('clear');

window.addEventListener('beforeunload', function () {
    taskList.querySelectorAll('.hidden').forEach(function (element) {
        element.classList.remove('hidden');
    });
});

//create new element for task list
formTask.onsubmit = function (evt) {
    evt.preventDefault();
    let newElement = document.createElement('li');
    newElement.classList.add('task-item');
    let textInput = formTask.querySelector('.task-text');
    newElement.textContent = textInput.value;
    textInput.value = '';
    taskList.appendChild(newElement);
    saveData();
};

//change active task
function taskClick(evt) {
    let itemList = evt.target;
    itemList.classList.toggle('completed');
    saveData();
};

//filter function 
allTask.onclick = function () {
    activeFilter(allTask);
    taskList.querySelectorAll('.hidden').forEach(function (element) {
        element.classList.remove('hidden');
    });
};

unCompletedTask.onclick = function () {
    activeFilter(unCompletedTask);
    taskList.querySelectorAll('.completed').forEach(function (element) {
        element.classList.add('hidden');
    });
};

ClearTask.onclick = function () {
    taskList.querySelectorAll('.task-item').forEach(function (element) {
        element.remove();
    });
    saveData();
};

//function change active button filter
function activeFilter(filter) {
    document.querySelector('.active').classList.remove('active');
    filter.classList.add('active');
};

function saveData() {
    localStorage.setItem('data', taskList.innerHTML);
}; 
