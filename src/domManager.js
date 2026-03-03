const taskDisplay = document.querySelector(".taskDisplay");
const sidebarProjects = document.querySelector(".sidebarProjects");
const projectSelect = document.querySelector("#taskProjectSelect");
const addProjectScreen = document.querySelector(".addProjectScreen");
const addProjectNameBar = document.querySelector("#projectName");
const addTaskScreen = document.querySelector(".addTaskScreen");
const taskFormElements = {
    taskName: document.querySelector("#taskName"),
    taskDate: document.querySelector("#taskDate"),
    taskDescription: document.querySelector("#taskDescription"),
    taskPriority: document.querySelector("#taskPriority"),
    taskProjectSelect: document.querySelector("#taskProjectSelect")
};

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

const toggleAddTaskScreen = () => {
    addTaskScreen.classList.contains("hidden") ? addTaskScreen.classList.remove("hidden") :
        addTaskScreen.classList.add("hidden");
    Object.values(taskFormElements).forEach(element => element.value = "");
}

const toggleAddProjectScreen = () => {
    addProjectScreen.classList.contains("hidden") ? addProjectScreen.classList.remove("hidden") :
        addProjectScreen.classList.add("hidden");
    addProjectNameBar.value = "";
}

const displayProject = (project) => {
    const newProject = document.createElement("button");
    newProject.classList.add("sidebarItem");
    newProject.innerHTML = project.name;
    sidebarProjects.appendChild(newProject);
}

const addProjectToFormList = (project) => {
    const newProject = document.createElement("option");
    newProject.value = project.name;
    newProject.innerHTML = project.name;
    projectSelect.appendChild(newProject);
}

const DomManager = {displayTask, displayProject, addProjectToFormList, toggleAddProjectScreen, toggleAddTaskScreen};
export {DomManager};