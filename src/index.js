import "./style.css";
import { TaskState } from "./taskState.js";
import { DomManager } from "./domManager.js";
import { ProjectState } from "./projectState.js";
import { FormHandling } from "./formHandling.js";

const addTaskButton = document.querySelector(".addTaskButton");
const newProjectButton = document.querySelector(".newProjectButton");
const projectForm = document.querySelector(".addProjectScreen form");


const addTaskButtonEventListener = () => {
    addTaskButton.addEventListener("click", DomManager.toggleAddTaskScreen)
}

const addProjectButtonEventListener = () => {
    newProjectButton.addEventListener("click", DomManager.toggleAddProjectScreen);
}

function addProjectFormSubmitEventListener() {
    projectForm.addEventListener("submit", FormHandling.parseProjectFormData);
}


// Initial Setup

TaskState.makeTask("MyTask", "September 16", "This is the description", 1, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 2, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 3, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 4, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 5, "Project 1");

const project1 = ProjectState.makeProject("Project 1");
const project2 = ProjectState.makeProject("Project 2");
const project3 = ProjectState.makeProject("Project 3");
DomManager.addProjectToFormList(project1);
DomManager.addProjectToFormList(project2);
DomManager.addProjectToFormList(project3);

for(const task of TaskState.getTaskList()) {
    DomManager.displayTask(task);
}
for(const project of ProjectState.getProjectList()) {
    DomManager.displayProject(project);
}

addProjectButtonEventListener();
addProjectFormSubmitEventListener();
addTaskButtonEventListener();


