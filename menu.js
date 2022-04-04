
const prompt = require('prompt');

let menu = (data, taskHandler) => {
    console.log('\tTODO LIST\n');

    if (data.list.length > 0) {
        for (let i = 0; i < data.list.length; i++) {
            let item = data.list[i];
            let task = new taskHandler.task(item.title, item.state);
            task.show();
        }
    }
    else {
        console.log('- Add your first TODO Task');
    }
    console.log('\nCommand List:\n- 1. Add Task\n- 2. Remove Task\n- 3. Edit Task\n- 4. Close');
}

let addTask = (data, taskHandler, rl) => {
    console.log('\n\nChoose a task name:');
    prompt.get(['name'], function (err, result) {
        if (err) {
          return onErr(err);
        }
        let newTask = new taskHandler.task(result.name, false);
        data.list.push(newTask);
      });
}

let removeTask = (data, taskHandler, rl) => {

}

let editTask = (data, taskHandler, rl) => {

}

module.exports = { menu, addTask, removeTask, editTask };