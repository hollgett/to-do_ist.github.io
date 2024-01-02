let formTask = document.querySelector('.task-form');
let formText = formTask.querySelector('.task-text');
let taskList = document.querySelector('.task-list');
let test = document.querySelector('.test');
let save = document.querySelector('.save');

//session data()
const keysStorage = Object.keys(sessionStorage).sort();

if(keysStorage.length !== 0){
    console.log(sessionStorage);
    keysStorage.forEach(function (key) {
        let Itemtext = sessionStorage.getItem(key);  
        let newElement = createElement(Itemtext);
        newElement.dataset.count = key;
        taskList.append(newElement);
    });
}


formTask.onsubmit = function (evt) {
    evt.preventDefault();
    let lastTaskElement;
    let newElement = createElement();
    if(taskList.querySelector('.task-item') === null){
        newElement.dataset.count = 1;
        sessionStorage.setItem(1,formText.value);
    } else {
        lastTaskElement = taskList.querySelector('.task-list .task-item:last-child').dataset;
        newElement.dataset.count = parseInt(lastTaskElement.count) + 1;
        sessionStorage.setItem(parseInt(lastTaskElement.count)+ 1,formText.value);
    }
    // console.log(lastTaskElement.count);
    taskList.append(newElement);
    formText.value = '';
};

function createElement(Itemtext) {
    let newElement = document.createElement('li');
    newElement.classList.add('task-item');
    let link = document.createElement('a');
    link.classList.add('task');
    let span = document.createElement('span');
    span.classList.add('completed');
    span.textContent = '✔';
    link.appendChild(span);
    let textLink;
    if(Itemtext ==undefined){
        textLink = document.createTextNode(formText.value);
    } else {
        textLink = document.createTextNode(Itemtext);
    }
    link.appendChild(textLink);
    newElement.appendChild(link);
    return newElement;
}


save.onclick = function () {
    sessionStorage.clear();

};

test.onclick = function () {
    taskList.querySelectorAll('.task-item').forEach(function(element){element.remove();});
};