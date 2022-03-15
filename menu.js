
let menu = (data, taskHandler) => {
    console.log('\tTODO LIST\n');

    if (data.list.length > 0) {
        for (let i = 0; i < data.list.length; i++) {
            let item = data.list[i];
            let task = new taskHandler.task(item.title, item.state);
            task.show();
        }
        console.log('- Add a new Task');
    }
    else {
        console.log('- Add your first TODO Task');
    }    
}

module.exports = { menu };