import { TaskState } from "./taskState.js";

const homepage = document.querySelector(".homepage");
const taskDisplay = document.querySelector(".taskDisplay");
const sidebarProjects = document.querySelector(".sidebarProjects");
const projectSelect = document.querySelector("#taskProjectSelect");
const addProjectScreen = document.querySelector(".addProjectScreen");
const addProjectNameBar = document.querySelector("#projectName");
const addTaskScreen = document.querySelector(".addTaskScreen");
const taskInfoScreen = document.querySelector(".taskInfoScreen");
const taskFormElements = {
    taskName: document.querySelector("#taskName"),
    taskDate: document.querySelector("#taskDate"),
    taskDescription: document.querySelector("#taskDescription"),
    taskPriority: document.querySelector("#taskPriority"),
    taskProjectSelect: document.querySelector("#taskProjectSelect")
};
const taskInfoScreenElements = {
    taskName: document.querySelector(".taskInfoTop > span"),
    taskDeleteButton: document.querySelector(".taskInfoTop > button"),
    taskDueDate: document.querySelector(".taskInfoDueDate"),
    taskProject: document.querySelector(".taskInfoProjectName"),
    taskPriority: document.querySelector(".taskInfoPriority"),
    taskDescription: document.querySelector(".taskInfoDescription")
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
    newTask.id = task.id;
    newTask.appendChild(taskTitle);
    newTask.appendChild(taskProject);
    newTask.appendChild(taskDate);
    taskDisplay.appendChild(newTask);

}

const toggleAddTaskScreen = () => {
    addTaskScreen.classList.contains("hidden") ? addTaskScreen.classList.remove("hidden") :
        addTaskScreen.classList.add("hidden");
    Object.values(taskFormElements).forEach(element => element.value = "");
    toggleBlur();
}
const toggleAddProjectScreen = () => {
    addProjectScreen.classList.contains("hidden") ? addProjectScreen.classList.remove("hidden") :
        addProjectScreen.classList.add("hidden");
    addProjectNameBar.value = "";
    toggleBlur();
}
const toggleTaskInfoScreen = () => {
    taskInfoScreen.classList.contains("hidden") ? taskInfoScreen.classList.remove("hidden") :
        taskInfoScreen.classList.add("hidden");
    toggleBlur();
}

const toggleBlur = () => {
    homepage.classList.contains("blurred") ? homepage.classList.remove("blurred") : 
        homepage.classList.add("blurred");
}

const displayProject = (project) => {
    const newProject = document.createElement("button");
    newProject.classList.add("sidebarItem");
    newProject.classList.add("sidebarProject");
    newProject.innerHTML = project.name;
    sidebarProjects.appendChild(newProject);
    addProjectToFormList(project);
}

const addProjectToFormList = (project) => {
    const newProject = document.createElement("option");
    newProject.value = project.name;
    newProject.innerHTML = project.name;
    projectSelect.appendChild(newProject);
}

const openTaskInfoScreen = (event) => {
    toggleTaskInfoScreen();
    if(!(event.target.classList.contains("task"))) return;
    const taskList = TaskState.getTaskList();
    let myTask;
    for(const task of taskList) {
        if(task.id === event.target.id) {
            myTask = task;
            break;
        }
    }
    taskInfoScreenElements.taskName.innerHTML = myTask.name;
    taskInfoScreenElements.taskDueDate.innerHTML = `Due ${myTask.date}`;
    taskInfoScreenElements.taskProject.innerHTML = myTask.project;
    taskInfoScreenElements.taskPriority.innerHTML = `Priority: ${myTask.priority}`;
    taskInfoScreenElements.taskDescription.innerHTML = myTask.description;
}

const DomManager = {displayTask, displayProject, addProjectToFormList, toggleAddProjectScreen, 
    toggleAddTaskScreen, toggleBlur, toggleTaskInfoScreen, openTaskInfoScreen};
export {DomManager};