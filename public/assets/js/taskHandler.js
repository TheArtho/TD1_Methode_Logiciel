class task {
    constructor (/* string */ name, /* bool */ done, /* ObjectId */ id) {
        this.name = name;
        this.done = done;
        this.id = id;

        console.log('creating new task: '+this.toString())
    }

    setName (newName) {
        this.name = newName;
    }

    setState (newState) {
        this.done = newState;
    }

    show () {
        console.log('- '+this.toString());
    }

    toString () {
        return this.name+" => "+(this.done ? "terminée" : "non terminée"+" - Object ID : "+this.id);
    }
}

class task_group {
    constructor (/* string */ name,  /* ObjectId */ id) {
        this.name = name;
        this.id = id;
        this.tasks = [];

        console.log('creating new group: '+this.toString())
    }

    setName (newName) {
        this.name = newName;
    }

    show () {
        console.log('- '+this.toString());
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getTask(index) {
        if (i >= 0 && i < this.tasks.length)
            return this.tasks[i];
        else
            return undefined;
    }

    removeTask(task_id) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == task_id) {
                this.tasks.splice(i, 1);
                break;
            }
        }
    }

    toString () {
        return this.name+" - ObjectID : "+this.id;
    }
}

export { task, task_group };