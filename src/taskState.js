const taskList = [];
const getTaskList = () => [...taskList];

class Task {
    constructor(name, date, description, priority, project) {
        this.name = name;
        this.date = date;
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

const TaskState = {getTaskList, makeTask};
export {TaskState};