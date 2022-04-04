class task {
    constructor (/* string */ name, /* bool */ done) {
        this.name = name;
        this.done = done;

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
        return this.name+" => "+(this.done ? "terminée" : "non terminée");
    }
}

export { task };