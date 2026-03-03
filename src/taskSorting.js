import { format } from "date-fns";
import { TaskState } from "./taskState.js";
import { DomManager } from "./domManager.js";

const taskDisplay = document.querySelector(".taskDisplay");

const clearTaskDisplay = () => {
    taskDisplay.innerHTML = "";
}

const setupDisplay = () => {
    clearTaskDisplay();
    const taskList = TaskState.getTaskList();
    return taskList;
}

const displayTasksAll = () => {
    const taskList = setupDisplay();
    taskList.forEach(task => DomManager.displayTask(task));
}

const displayTasksToday = () => {
    const taskList = setupDisplay();
    const today = format(new Date(), 'MM/dd/yyyy');
    taskList.forEach(function(task) {
        if(task.date === today) {
            DomManager.displayTask(task);
        }
    })
}

const TaskSorting = {clearTaskDisplay, displayTasksAll, displayTasksToday};
export {TaskSorting};