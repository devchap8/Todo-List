import "./style.css";
import {TaskState} from "./taskState.js";
import { DomManager } from "./domManager.js";

TaskState.makeTask("MyTask", "September 16", "This is the description", 1, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 2, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 3, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 4, "Project 1");
TaskState.makeTask("MyTask", "September 16", "This is the description", 5, "Project 1");
console.log(TaskState.getTaskList());

for(const task of TaskState.getTaskList()) {
    DomManager.displayTask(task);
}