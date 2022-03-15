class task {
    constructor (/* string */ title, /* bool */ state) {
        this.title = title;
        this.state = state;

        //console.log('creating new task: '+title+" - "+state)
    }

    setTitle (newTitle) {
        this.title = title;
    }

    setState (newState) {
        this.state = state;
    }

    show () {
        console.log('- '+this.title+" => "+(this.state ? "terminée" : "non terminée"));
    }
}

module.exports = { task };