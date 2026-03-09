import "./style.css";
import { TaskState } from "./taskState.js";
import { DomManager } from "./domManager.js";
import { ProjectState } from "./projectState.js";
import { FormHandling } from "./formHandling.js";
import { TaskSorting } from "./taskSorting.js";
import { TasksLocalStorage } from "./localStorage.js";
import { format } from "date-fns";

const addTaskButton = document.querySelector(".addTaskButton");
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
const editTaskButton = document.querySelector(".editTaskButton");
const editTaskScreen = document.querySelector(".editTaskScreen");
const addTaskForm = document.querySelector("#addTaskForm");
const editTaskForm = document.querySelector("#editTaskForm");
const deleteProjectButton = document.querySelector(".deleteProjectButton");
const deleteProjectScreen = document.querySelector(".deleteProjectScreen");
const deleteProjectForm = document.querySelector("#deleteProjectForm");

// All main event listeners

const addTaskButtonEventListener = () => {
    addTaskButton.addEventListener("click", openScreen) //
}
const addTaskFormEventListener = () => {
    addTaskForm.addEventListener("submit", makeNewTask); 
}

const addProjectButtonEventListener = () => {
    newProjectButton.addEventListener("click", openScreen); //
}
const addProjectFormSubmitEventListener = () => {
    projectForm.addEventListener("submit", makeNewProject);
}

const addDeleteProjectButtonEventListener = () => {
    deleteProjectButton.addEventListener("click", openScreen); // 
}
const addDeleteProjectFormEventListener = () => {
    deleteProjectForm.addEventListener("submit", deleteProject);
}

const addEditTaskButtonEventListener = () => {
    editTaskButton.addEventListener("click", openScreen); //
}
const addEditTaskFormEventListener = () => {
    editTaskForm.addEventListener("submit", editTask);
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

const addDeleteTaskButtonEventListener = () => {
    deleteTaskButton.addEventListener("click", deleteTask); 
}
const addTaskCheckEventListener = () => {
    homepage.addEventListener("change", toggleTaskChecked);
}

const addHomepageCloseScreenFunctionEventListener = () => {
    homepage.addEventListener("click", closeScreen);
}
const removeHomepageCloseScreenFunctionEventListener = () => {
    homepage.removeEventListener("click", closeScreen);
}

const makeNewProject = (event) => {
    event.preventDefault();
    const projectData = FormHandling.parseProjectFormData(event);
    const projectName = projectData.get("projectName");
    const myProject = ProjectState.makeProject(projectName);
    DomManager.displayProject(myProject);
    DomManager.toggleAddProjectScreen();
    TasksLocalStorage.storeList("projectList", ProjectState.getProjectList());
}

const makeNewTask = (event) => {
    event.preventDefault();
    const taskInfo = FormHandling.parseTaskFormData(event);
    const myTask = TaskState.makeTask(taskInfo.taskName, taskInfo.taskDate, 
        taskInfo.taskDescription, taskInfo.taskPriority, taskInfo.taskProject);
    DomManager.displayTask(myTask);
    DomManager.toggleAddTaskScreen();
    TasksLocalStorage.storeList("taskList", TaskState.getTaskList());
}

const editTask = (event) => {
    event.preventDefault();
    const editTaskID = document.querySelector(".taskID").id;
    const taskInfo = FormHandling.parseEditTaskFormData(event);
    TaskState.editTaskInfo(editTaskID, taskInfo);
    DomManager.editTaskInDom(editTaskID, taskInfo);
    closeScreen();
    TasksLocalStorage.storeList("taskList", TaskState.getTaskList());
}

const deleteTask = () => {
    const deletedTaskID = taskID.id;
    TaskState.deleteTaskFromList(deletedTaskID);
    DomManager.deleteTaskFromDom(deletedTaskID);
    closeScreen();
    TasksLocalStorage.storeList("taskList", TaskState.getTaskList());
}

const deleteProject = (event) => {
    event.preventDefault();
    const projectToDelete = FormHandling.parseDeleteProjectFormData(event);
    ProjectState.deleteProject(projectToDelete);
    DomManager.deleteProjectFromSidebar(projectToDelete);
    DomManager.deleteProjectFromTaskDisplay(projectToDelete);
    TaskState.deleteProjectFromTasks(projectToDelete);
    DomManager.removeProjectFromFormList(projectToDelete);
    closeScreen();
    TasksLocalStorage.storeList("projectList", ProjectState.getProjectList());
    TasksLocalStorage.storeList("taskList", TaskState.getTaskList());
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
    TasksLocalStorage.storeList("taskList", TaskState.getTaskList());
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
    addDeleteProjectButtonEventListener();
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
    deleteProjectButton.removeEventListener("click", deleteProject);
}

const openScreen = (event) => {
    if(event.target === addTaskButton) DomManager.toggleAddTaskScreen();
    else if(event.target === newProjectButton) DomManager.toggleAddProjectScreen();
    else if(event.target === deleteProjectButton) DomManager.toggleDeleteProjectScreen();
    else if(event.target === editTaskButton) {
        DomManager.toggleTaskInfoScreen();
        const editTaskID = document.querySelector(".taskID").id;
        const taskToBeEdited = TaskState.getTaskInfo(editTaskID);
        DomManager.populateEditTaskFormElements(taskToBeEdited);
        DomManager.toggleEditTaskScreen();
    }
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
    else if(!(editTaskScreen.classList.contains("hidden"))) DomManager.toggleEditTaskScreen();
    else if(!(taskInfoScreen.classList.contains("hidden"))) DomManager.toggleTaskInfoScreen();
    else if(!(deleteProjectScreen.classList.contains("hidden"))) DomManager.toggleDeleteProjectScreen();
    addHomepageChildrenEventListeners();
    removeHomepageCloseScreenFunctionEventListener();

}

const initialStorageSetup = () => {
    if(localStorage.getItem("taskList") !== null && localStorage.getItem("projectList") !== null) {
        TaskState.pullTaskListFromStorage(TasksLocalStorage.getList("taskList"));
        ProjectState.pullProjectListFromStorage(TasksLocalStorage.getList("projectList"));
        displayTasksProjects();
    } else {
        setupInitialTasksProjects();
    }
}

const setupInitialTasksProjects = () => {
    // TaskState.makeTask("Long Description", "09/16/2026", "hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ", 1, "Project 2");
    TaskState.makeTask("MyTask", "09/16/2026", "This is the description", 2, "Project 1");
    TaskState.makeTask("MyTask", "08/16/2026", "This is the description", 3, "Project 2");
    TaskState.makeTask("MyTask", "09/16/2027", "This is the description", 4, "Project 1");
    TaskState.makeTask("MyTask", "09/25/2026", "This is the description", 5, "Project 1");
    const today = format(new Date(), 'MM/dd/yyyy');
    TaskState.makeTask("Due Today", today, "This is the description", 5, "Project 1");
    ProjectState.makeProject("Project 1");
    ProjectState.makeProject("Project 2");
    ProjectState.makeProject("Project 3");
    displayTasksProjects();
    TasksLocalStorage.storeList("taskList", TaskState.getTaskList());
    TasksLocalStorage.storeList("projectList", ProjectState.getProjectList());
}

const displayTasksProjects = () => {
    TaskSorting.displayTasksAll();
    for(const project of ProjectState.getProjectList()) {
        DomManager.displayProject(project);
    }
}

// Initial Setup

addProjectButtonEventListener();
addTaskFormEventListener();
addProjectFormSubmitEventListener();
addTaskButtonEventListener();
addAllTasksButtonEventListener();
addTodayTasksButtonEventListener();
addWeekTasksButtonEventListener();
addImportantTasksButtonEventListener();
addProjectDisplayEventListener();
addTaskDisplayEventListener();
addDeleteTaskButtonEventListener();
addTaskCheckEventListener();
addEditTaskButtonEventListener();
addEditTaskFormEventListener();
addDeleteProjectButtonEventListener();
addDeleteProjectFormEventListener();

TaskSorting.displayTasksAll(); // So tasks are sorted when user opens program

initialStorageSetup();

// TasksLocalStorage.storeList("taskList", TaskState.getTaskList());
// console.log(TasksLocalStorage.getList("taskList"));



