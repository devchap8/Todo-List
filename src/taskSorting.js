import { format, addDays, differenceInDays } from "date-fns";
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
    });
}

const displayTasksWeek = () => {
    const taskList = setupDisplay();
    const today = format(new Date(), 'MM/dd/yyyy');
    const afterOneWeek = format(addDays(today, 6), 'MM/dd/yyyy');
    taskList.forEach(function(task) {
        if(differenceInDays(task.date, afterOneWeek) <= 0) {
            DomManager.displayTask(task);
        }
    });
}

const displayImportant = () => {
    const taskList = setupDisplay();
    taskList.forEach(function(task) {
        if(task.priority === 1) {
            DomManager.displayTask(task);
        }
    })
}

const TaskSorting = {clearTaskDisplay, displayTasksAll, displayTasksToday, 
    displayTasksWeek, displayImportant};
export {TaskSorting};