/* 
Display Task function

top of module - querySelect taskDisplay

takes 1 input - task

make a new button
    add to button classList: "prio" + priority number
    add to button classList: task

make a span with class taskTitle
    span.innerHTML = task.name

make a span with class classDate
    span.innerHTML = task.date

make a span with class taskProject
    span.innerHTML = task.project

append the spans to the button then append the button to taskDisplay

*/

import { TaskState } from "./taskState"; // temporary so I can display classes manually before adding the button functionality

