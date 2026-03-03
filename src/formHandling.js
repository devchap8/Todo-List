import { ProjectState } from "./projectState.js";
import { DomManager } from "./domManager.js";

const projectForm = document.querySelector(".addProjectScreen form");

const parseProjectFormData = (event) => {
    event.preventDefault();
    const projectData = new FormData(projectForm);
    const projectName = projectData.get("projectName");
    const myProject = ProjectState.makeProject(projectName);
    DomManager.displayProject(myProject);
    DomManager.addProjectToFormList(myProject);
    DomManager.toggleAddProjectScreen();
}


const FormHandling = {parseProjectFormData};
export {FormHandling};