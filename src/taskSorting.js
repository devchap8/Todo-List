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

const sortByDueDate = (firstTask, secondTask) => {
    return differenceInDays(firstTask.date, secondTask.date);
}

const displayTasksAll = () => {
    const taskList = setupDisplay();
    taskList.sort(sortByDueDate);
    taskList.forEach(task => DomManager.displayTask(task));
}

const displayTasksToday = () => {
    const taskList = setupDisplay();
    taskList.sort(sortByDueDate);
    const today = format(new Date(), 'MM/dd/yyyy');
    taskList.forEach(function(task) {
        if(task.date === today) {
            DomManager.displayTask(task);
        }
    });
}

const displayTasksWeek = () => {
    const taskList = setupDisplay();
    taskList.sort(sortByDueDate);
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
    taskList.sort(sortByDueDate);
    taskList.forEach(function(task) {
        if(task.priority === 1) {
            DomManager.displayTask(task);
        }
    })
}

const displayCertainProject = (event) => {
    if(event.target.classList.contains("sidebarProject")) {
        console.log(event.target.innerHTML);
        const taskList = setupDisplay();
        taskList.sort(sortByDueDate);
        taskList.forEach(function(task) {
            if(task.project === event.target.innerHTML) {
                DomManager.displayTask(task);
            }
        })
    }
}

const TaskSorting = {clearTaskDisplay, displayTasksAll, displayTasksToday, 
    displayTasksWeek, displayImportant, displayCertainProject};
export {TaskSorting};