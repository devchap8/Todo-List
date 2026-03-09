let projectList = [];
const getProjectList = () => [...projectList];

class Project {
    constructor(name) {
        this.name = name;
    }
}

const makeProject = (name) => {
    let projectListContainsSameName = false;

    projectList.forEach((project) => {
        if(project.name == name) {
            projectListContainsSameName = true;
        }
    });
    if(!projectListContainsSameName) {
        const myProject = new Project(name);
        projectList.push(myProject);
        return myProject;
    }
}

const deleteProject = (projectName) => {
    for(let i = 0; i < projectList.length; i++) {
        if(projectList[i].name === projectName) {
            projectList.splice(i, 1);
            break;
        }
    }
}

const pullProjectListFromStorage = (storageList) => {
    projectList = storageList;
}

const ProjectState = {getProjectList, makeProject, deleteProject, pullProjectListFromStorage};
export {ProjectState}