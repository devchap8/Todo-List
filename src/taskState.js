/*
Task Class + Function to make new tasks

taskList array (stores all tasks) - NOT EXPORTED
getTaskList function - EXPORTED
    return [...taskList]

Task class - NOT EXPORTED
    constructor takes name, date, priority, description
        this.name = name, this.date = date, etc
        this.id = crypto.randomUUID()
        this.checked = false
    toggleChecked function
        ternary operator that switches checked status

makeClass function
    takes name, date, priority, description
    task = new Task(name, date, priority, description)
    append task to taskList
    return task

*/




const logicHandling = {};
export {logicHandling};