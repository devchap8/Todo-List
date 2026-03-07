import { format, parseISO } from "date-fns";

const taskList = [];
const getTaskList = () => [...taskList];

class Task {
    constructor(name, date, description, priority, project) {
        this.name = name;
        const localDate = new Date(date.replace(/-/g, '\/'));
        this.date = format(localDate, 'MM/dd/yyyy');
        this.description = description || null;
        this.priority = priority || 5;
        this.project = project || null;
        this.id = crypto.randomUUID();
        this.checked = false;
    }
    toggleChecked() {
        this.checked === true ? this.checked = false : this.checked = true;
    }
}

const makeTask = (name, date, description, priority, project) => {
    const myTask = new Task(name, date, description, priority, project);
    taskList.push(myTask);
    return myTask;
}

const deleteTaskFromList = (taskID) => {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === taskID) {
            taskList.splice(i, 1);
            break;
        }
    }
}

const getTaskInfo = (taskID) => {
    let myTask;
    for(let task of taskList) {
        if(task.id === taskID) {
            myTask = task;
            break;
        }
    }
    return myTask;
}

const editTaskInfo = (taskID, taskInfo) => {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === taskID) {
            taskList[i].name = taskInfo.name;
            taskList[i].date = taskInfo.date;
            taskList[i].description = taskInfo.description;
            taskList[i].priority = taskInfo.priority;
            taskList[i].project = taskInfo.project;
            break;
        }
    }
}

const deleteProjectFromTasks = (projectName) => {
    for(const task of taskList) {
        if(task.project === projectName) task.project = null;
    }
}

const TaskState = {getTaskList, makeTask, deleteTaskFromList, getTaskInfo, editTaskInfo, deleteProjectFromTasks};
export {TaskState};