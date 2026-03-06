import "./style.css";
import { TaskState } from "./taskState.js";
import { DomManager } from "./domManager.js";
import { ProjectState } from "./projectState.js";
import { FormHandling } from "./formHandling.js";
import { TaskSorting } from "./taskSorting.js";
import { format } from "date-fns";

const addTaskButton = document.querySelector(".addTaskButton");
const submitTaskButton = document.querySelector(".submitTaskButton")
const newProjectButton = document.querySelector(".newProjectButton");
const projectForm = document.querySelector(".addProjectScreen form");
const allTasksButton = document.querySelector(".sidebarAll");
const todayTasksButton = document.querySelector(".sidebarToday");
const weekTasksButton = document.querySelector(".sidebarThisWeek");
const importantTasksButton = document.querySelector(".sidebarImportant");
const projectDisplay = document.querySelector(".sidebarProjects");
const taskDisplay = document.querySelector(".taskDisplay");
const addTaskScreen = document.querySelector(".addTaskScreen");
const addProjectScreen = document.querySelector(".addProjectScreen");
const taskInfoScreen = document.querySelector(".taskInfoScreen");
const homepage = document.querySelector(".homepage");
const taskID = document.querySelector(".taskID");
const deleteTaskButton = document.querySelector(".deleteTaskButton");

// All main event listeners

const addTaskButtonEventListener = () => {
    addTaskButton.addEventListener("click", openScreen) //
}
const addSubmitTaskButtonEventListener = () => {
    submitTaskButton.addEventListener("click", FormHandling.parseTaskFormData);
}

const addProjectButtonEventListener = () => {
    newProjectButton.addEventListener("click", openScreen); //
}
function addProjectFormSubmitEventListener() {
    projectForm.addEventListener("submit", FormHandling.parseProjectFormData);
}

const addAllTasksButtonEventListener = () => {
    allTasksButton.addEventListener("click", TaskSorting.displayTasksAll);
}
const addTodayTasksButtonEventListener = () => {
    todayTasksButton.addEventListener("click", TaskSorting.displayTasksToday);
}
const addWeekTasksButtonEventListener = () => {
    weekTasksButton.addEventListener("click", TaskSorting.displayTasksWeek);
}
const addImportantTasksButtonEventListener = () => {
    importantTasksButton.addEventListener("click", TaskSorting.displayImportant);
}
const addProjectDisplayEventListener = () => {
    projectDisplay.addEventListener("click", TaskSorting.displayCertainProject);
}

const addTaskDisplayEventListener = () => {
    taskDisplay.addEventListener("click", openScreen); //
}

const addHomepageCloseScreenFunctionEventListener = () => {
    homepage.addEventListener("click", closeScreen);
}
const removeHomepageCloseScreenFunctionEventListener = () => {
    homepage.removeEventListener("click", closeScreen);
}

const deleteTask = () => {
    const deletedTaskID = taskID.id;
    TaskState.deleteTaskFromList(deletedTaskID);
    DomManager.deleteTaskFromDom(deletedTaskID);
    DomManager.toggleTaskInfoScreen();
}
const addDeleteTaskButtonEventListener = () => {
    deleteTaskButton.addEventListener("click", deleteTask);
}

const addTaskCheckEventListener = () => {
    homepage.addEventListener("change", toggleTaskChecked);
}
const toggleTaskChecked = (event) => {
    if(event.target.classList.contains("taskCheck")) {
        let task = event.target.parentElement;
        if(event.target.checked) {
            task.classList.add("checked")
        }
        else if(!(event.target.checked)) {
            task.classList.remove("checked");
        }
    }
}

// Handling for opening / closing forms

const addHomepageChildrenEventListeners = () => {
    addTaskButtonEventListener();
    addProjectButtonEventListener();
    addAllTasksButtonEventListener();
    addTodayTasksButtonEventListener();
    addWeekTasksButtonEventListener();
    addImportantTasksButtonEventListener();
    addProjectButtonEventListener();
    addProjectDisplayEventListener();
    addTaskDisplayEventListener();
    addTaskCheckEventListener();
}

const removeHomepageChildrenEventListeners = () => {
    addTaskButton.removeEventListener("click", openScreen);
    newProjectButton.removeEventListener("click", openScreen);
    allTasksButton.removeEventListener("click", TaskSorting.displayTasksAll);
    todayTasksButton.removeEventListener("click", TaskSorting.displayTasksToday);
    weekTasksButton.removeEventListener("click", TaskSorting.displayTasksWeek);
    importantTasksButton.removeEventListener("click", TaskSorting.displayImportant);
    projectDisplay.removeEventListener("click", TaskSorting.displayCertainProject);
    taskDisplay.removeEventListener("click", openScreen);
    homepage.removeEventListener("click", toggleTaskChecked);
}

const openScreen = (event) => {
    if(event.target === addTaskButton) DomManager.toggleAddTaskScreen();
    else if(event.target === newProjectButton) DomManager.toggleAddProjectScreen();
    else if((event.target.classList.contains("task") || event.target.parentElement.classList.contains("task"))
        && !(event.target.classList.contains("taskCheck"))) {
        let targetTask;
        event.target.classList.contains("task") ? targetTask = event.target : targetTask = event.target.parentElement;
        DomManager.openTaskInfoScreen(targetTask);
    }
    removeHomepageChildrenEventListeners();
    setTimeout(() => {
        addHomepageCloseScreenFunctionEventListener();
    }, 300); // close screen would always run immediately after open screen without a small delay
}

const closeScreen = () => {
    if(!(addTaskScreen.classList.contains("hidden"))) DomManager.toggleAddTaskScreen();
    else if(!(addProjectScreen.classList.contains("hidden"))) DomManager.toggleAddProjectScreen();
    else if(!(taskInfoScreen.classList.contains("hidden"))) DomManager.toggleTaskInfoScreen();
    addHomepageChildrenEventListeners();
    removeHomepageCloseScreenFunctionEventListener();

}

// Initial Setup

TaskState.makeTask("Long Description", "09/16/2026", "hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ", 1, "Project 2");
TaskState.makeTask("MyTask", "09/16/2026", "This is the description", 2, "Project 1");
TaskState.makeTask("MyTask", "09/16/2026", "This is the description", 3, "Project 1");
TaskState.makeTask("MyTask", "09/16/2026", "This is the description", 4, "Project 1");
TaskState.makeTask("MyTask", "09/16/2026", "This is the description", 5, "Project 1");
const today = format(new Date(), 'MM/dd/yyyy');
TaskState.makeTask("Due Today", today, "This is the description", 5, "Project 1");

const project1 = ProjectState.makeProject("Project 1");
const project2 = ProjectState.makeProject("Project 2");
const project3 = ProjectState.makeProject("Project 3");

for(const task of TaskState.getTaskList()) {
    DomManager.displayTask(task);
}
for(const project of ProjectState.getProjectList()) {
    DomManager.displayProject(project);
}

addProjectButtonEventListener();
addProjectFormSubmitEventListener();
addTaskButtonEventListener();
addSubmitTaskButtonEventListener();
addAllTasksButtonEventListener();
addTodayTasksButtonEventListener();
addWeekTasksButtonEventListener();
addImportantTasksButtonEventListener();
addProjectDisplayEventListener();
addTaskDisplayEventListener();
addDeleteTaskButtonEventListener();
addTaskCheckEventListener();
