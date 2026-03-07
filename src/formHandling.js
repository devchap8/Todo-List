const projectForm = document.querySelector(".addProjectScreen form");
const taskForm = document.querySelector(".addTaskScreen form");
const editTaskForm = document.querySelector(".editTaskScreen form");
const deleteProjectForm = document.querySelector("#deleteProjectForm");

const parseProjectFormData = (event) => {
    event.preventDefault();
    const projectData = new FormData(projectForm);
    return projectData;
}

const parseTaskFormData = (event) => {
    event.preventDefault();
    const taskData = new FormData(taskForm);
    const taskInfo = {
        taskName: taskData.get("taskName"),
        taskDate: taskData.get("taskDate"),
        taskDescription: taskData.get("taskDescription"),
        taskPriority: taskData.get("taskPriority"),
        taskProject: taskData.get("taskProjectSelect")
    };
    return taskInfo;
}

const parseEditTaskFormData = (event) => {
    event.preventDefault();
    const taskData = new FormData(editTaskForm);
    console.log(taskData);
    const taskInfo = {
        name: taskData.get("editTaskName"),
        date: taskData.get("editTaskDate"),
        description: taskData.get("editTaskDescription"),
        priority: taskData.get("editTaskPriority"),
        project: taskData.get("editTaskProjectSelect")
    };
    return taskInfo;
}

const parseDeleteProjectFormData = (event) => {
    event.preventDefault();
    const taskData = new FormData(deleteProjectForm);
    return taskData.get("deleteProjectSelect");
}


const FormHandling = {parseProjectFormData, parseTaskFormData, parseEditTaskFormData, parseDeleteProjectFormData};
export {FormHandling};