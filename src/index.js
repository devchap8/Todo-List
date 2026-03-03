import "./style.css";
import { TaskState } from "./taskState.js";
import { DomManager } from "./domManager.js";
import { ProjectState } from "./projectState.js";

const newProjectButton = document.querySelector(".newProjectButton");
const addProjectScreen = document.querySelector(".addProjectScreen");
const addProjectNameBar = document.querySelector("#projectName");
const projectForm = document.querySelector(".addProjectScreen form");


const addProjectButtonEventListener = () => {
    newProjectButton.addEventListener("click", toggleAddProjectScreen);
}
const toggleAddProjectScreen = () => {
    addProjectScreen.classList.contains("hidden") ? addProjectScreen.classList.remove("hidden") :
        addProjectScreen.classList.add("hidden");
    addProjectNameBar.value = "";
}

function addProjectFormSubmitEventListener() {
    projectForm.addEventListener("submit", parseProjectFormData);
}
const parseProjectFormData = (event) => {
    event.preventDefault();
    const projectData = new FormData(projectForm);
    const projectName = projectData.get("projectName");
    const myProject = ProjectState.makeProject(projectName);
    DomManager.displayProject(myProject);
    DomManager.addProjectToFormList(myProject);
    toggleAddProjectScreen();
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
console.log(ProjectState.getProjectList());

for(const task of TaskState.getTaskList()) {
    DomManager.displayTask(task);
}
for(const project of ProjectState.getProjectList()) {
    DomManager.displayProject(project);
}

addProjectButtonEventListener();
addProjectFormSubmitEventListener();


