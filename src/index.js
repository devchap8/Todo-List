import "./style.css";
import {TaskState} from "./taskState.js";

TaskState.makeTask("MyTask", "September 16", "This is the description", 3);
console.log(TaskState.getTaskList());