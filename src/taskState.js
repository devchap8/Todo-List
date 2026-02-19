const taskList = [];
const getTaskList = () => [...taskList];

class Task {
    constructor(name, date, description, priority) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.priority = priority || 5;
        this.id = crypto.randomUUID();
        this.checked = false;
    }
    toggleChecked() {
        this.checked === true ? this.checked = false : this.checked = true;
    }
}

const makeTask = (name, date, description, priority) => {
    const myTask = new Task(name, date, description, priority);
    taskList.push(myTask);
}

const TaskState = {getTaskList, makeTask};
export {TaskState};