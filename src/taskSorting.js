import { TaskState } from "./taskState.js";
import { DomManager } from "./domManager.js";

const taskDisplay = document.querySelector(".taskDisplay");

const clearTaskDisplay = () => {
    taskDisplay.innerHTML = "";
}

const displayTasksAll = () => {
    clearTaskDisplay();
    const taskList = TaskState.getTaskList();
    taskList.forEach(task => DomManager.displayTask(task));
}

const TaskSorting = {clearTaskDisplay, displayTasksAll};
export {TaskSorting};