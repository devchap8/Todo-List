const projectList = [];
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

const ProjectState = {getProjectList, makeProject};
export {ProjectState}