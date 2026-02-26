const taskDisplay = document.querySelector(".taskDisplay");

const displayTask = (task) => {
    const newTask = document.createElement("button");
    newTask.classList.add(`prio${task.priority}`);
    newTask.classList.add("task");
    const taskTitle = document.createElement("span");
    taskTitle.classList.add("taskTitle");
    taskTitle.innerHTML = task.name;
    const taskDate = document.createElement("span");
    taskDate.classList.add("taskDate");
    taskDate.innerHTML = task.date;
    const taskProject = document.createElement("span");
    taskProject.classList.add("taskProject");
    taskProject.innerHTML = task.project;
    newTask.appendChild(taskTitle);
    newTask.appendChild(taskProject);
    newTask.appendChild(taskDate);
    taskDisplay.appendChild(newTask);
}

const DomManager = {displayTask};
export {DomManager};