import { TaskState } from "./taskState.js";
import { format } from "date-fns";

const homepage = document.querySelector(".homepage");
const taskDisplay = document.querySelector(".taskDisplay");
const sidebarProjects = document.querySelector(".sidebarProjects");
const projectSelect = document.querySelector("#taskProjectSelect");
const editProjectSelect = document.querySelector("#editTaskProjectSelect");
const addProjectScreen = document.querySelector(".addProjectScreen");
const addProjectNameBar = document.querySelector("#projectName");
const addTaskScreen = document.querySelector(".addTaskScreen");
const taskInfoScreen = document.querySelector(".taskInfoScreen");
const editTaskScreen = document.querySelector(".editTaskScreen");
const deleteProjectSelect = document.querySelector("#deleteProjectSelect");
const deleteProjectScreen = document.querySelector(".deleteProjectScreen");
const taskFormElements = {
    taskName: document.querySelector("#taskName"),
    taskDate: document.querySelector("#taskDate"),
    taskDescription: document.querySelector("#taskDescription"),
    taskPriority: document.querySelector("#taskPriority"),
    taskProjectSelect: document.querySelector("#taskProjectSelect")
};
const editTaskFormElements = {
    taskName: document.querySelector("#editTaskName"),
    taskDate: document.querySelector("#editTaskDate"),
    taskDescription: document.querySelector("#editTaskDescription"),
    taskPriority: document.querySelector("#editTaskPriority"),
    taskProjectSelect: document.querySelector("#editTaskProjectSelect")
};
const taskInfoScreenElements = {
    taskName: document.querySelector(".taskInfoTop > span"),
    taskDeleteButton: document.querySelector(".taskInfoTop > button"),
    taskDueDate: document.querySelector(".taskInfoDueDate"),
    taskProject: document.querySelector(".taskInfoProjectName"),
    taskPriority: document.querySelector(".taskInfoPriority"),
    taskDescription: document.querySelector(".taskInfoDescription"),
    taskID: document.querySelector(".taskID")
};

const displayTask = (task) => {
    const newTask = document.createElement("button");
    newTask.classList.add(`prio${task.priority}`);
    newTask.classList.add("task");
    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.classList.add("taskCheck");
    taskCheck.name = "taskCheck";
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
    newTask.appendChild(taskCheck);
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
const toggleEditTaskScreen = () => {
    editTaskScreen.classList.contains("hidden") ? editTaskScreen.classList.remove("hidden") : 
        editTaskScreen.classList.add("hidden");
    toggleBlur();
}
const toggleDeleteProjectScreen = () => {
    deleteProjectScreen.classList.contains("hidden") ? deleteProjectScreen.classList.remove("hidden") :
        deleteProjectScreen.classList.add("hidden");
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
    editProjectSelect.innerHTML = projectSelect.innerHTML;
    deleteProjectSelect.innerHTML = projectSelect.innerHTML;
}

const openTaskInfoScreen = (targetTask) => {
    toggleTaskInfoScreen();
    const taskList = TaskState.getTaskList();
    let myTask;
    for(const task of taskList) {
        if(task.id === targetTask.id) {
            myTask = task;
            break;
        }
    }
    taskInfoScreenElements.taskName.innerHTML = myTask.name;
    taskInfoScreenElements.taskDueDate.innerHTML = `Due ${myTask.date}`;
    taskInfoScreenElements.taskProject.innerHTML = myTask.project;
    taskInfoScreenElements.taskPriority.innerHTML = `Priority: ${myTask.priority}`;
    taskInfoScreenElements.taskDescription.innerHTML = myTask.description;
    taskInfoScreenElements.taskID.id = myTask.id;
}

const populateEditTaskFormElements = (task) => {
    editTaskFormElements.taskName.value = task.name;
    const formattedDate = format(task.date, 'yyyy-MM-dd');
    editTaskFormElements.taskDate.value = formattedDate;
    editTaskFormElements.taskDescription.value = task.description;
    editTaskFormElements.taskPriority.value = task.priority;
    editTaskFormElements.taskProjectSelect.value = task.project;
}

const editTaskInDom = (taskID, taskInfo) => {
    const displayedTasks = Array.from(document.querySelectorAll(".task:not(.hidden)"));
    let taskToBeEdited;
    for(const task of displayedTasks) {
        if(task.id === taskID) {
            taskToBeEdited = task;
            break;
        }
    }
    const editName = taskToBeEdited.querySelector(".taskTitle");
    const editDate = taskToBeEdited.querySelector(".taskDate");
    const editProject = taskToBeEdited.querySelector(".taskProject");
    editName.innerHTML = taskInfo.name;
    const newDate = new Date(taskInfo.date.replace(/-/g, '\/'));
    editDate.innerHTML = format(newDate, 'MM/dd/yyyy');
    editProject.innerHTML = taskInfo.project;
    taskToBeEdited.className = `prio${taskInfo.priority} task`;
}

const deleteTaskFromDom = (taskID) => {
    document.getElementById(taskID).remove();
}

const DomManager = {displayTask, displayProject, addProjectToFormList, 
    toggleAddProjectScreen, toggleEditTaskScreen, toggleAddTaskScreen, toggleBlur, 
    toggleTaskInfoScreen, openTaskInfoScreen, deleteTaskFromDom,
     populateEditTaskFormElements, editTaskInDom, toggleDeleteProjectScreen};
export {DomManager};