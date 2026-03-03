import { ProjectState } from "./projectState.js";
import { DomManager } from "./domManager.js";
import { TaskState } from "./taskState.js";

const projectForm = document.querySelector(".addProjectScreen form");
const taskForm = document.querySelector(".addTaskScreen form");

const parseProjectFormData = (event) => {
    event.preventDefault();
    const projectData = new FormData(projectForm);
    const projectName = projectData.get("projectName");
    const myProject = ProjectState.makeProject(projectName);
    DomManager.displayProject(myProject);
    DomManager.toggleAddProjectScreen();
}

const parseTaskFormData = (event) => {
    event.preventDefault();
    const taskData = new FormData(taskForm);
    const taskName = taskData.get("taskName");
    const taskDate = taskData.get("taskDate");
    const taskDescription = taskData.get("taskDescription");
    const taskPriority = taskData.get("taskPriority");
    const taskProject = taskData.get("taskProjectSelect");
    const myTask = TaskState.makeTask(taskName, taskDate, taskDescription, taskPriority, taskProject);
    DomManager.displayTask(myTask);
    DomManager.toggleAddTaskScreen();
}


const FormHandling = {parseProjectFormData, parseTaskFormData};
export {FormHandling};