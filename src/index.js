import "./style.css";
import { TaskState } from "./taskState.js";
import { DomManager } from "./domManager.js";
import { ProjectState } from "./projectState.js";

const newProjectButton = document.querySelector(".newProjectButton");
const addProjectScreen = document.querySelector(".addProjectScreen");

const addProjectButtonEventListener = () => {
    newProjectButton.addEventListener("click", toggleAddProjectScreen);
}

const toggleAddProjectScreen = () => {
    addProjectScreen.classList.contains("hidden") ? addProjectScreen.classList.remove("hidden") :
        addProjectScreen.classList.add("hidden");
}

TaskState.makeTask("MyTask", "September 16", "This is the description", 1, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 2, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 3, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 4, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 5, "Project 1");

ProjectState.makeProject("Project 1");
ProjectState.makeProject("Project 2");
ProjectState.makeProject("Project 1");
ProjectState.makeProject("Project 3");
console.log(ProjectState.getProjectList());

for(const task of TaskState.getTaskList()) {
    DomManager.displayTask(task);
}
for(const project of ProjectState.getProjectList()) {
    DomManager.displayProject(project);
}

addProjectButtonEventListener();


