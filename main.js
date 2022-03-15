const readline = require('readline');
const fs = require('fs');
const taskHandler = require('./taskHandler.js');

const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

let data;
let dataObj;

let saveData = () => {
    fs.writeFile("data.json", JSON.stringify(data), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been created.");
    });
}

let menu = () => {
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

const dataPath = './data.json';

/* Start */

// Checks for data file
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '{"list":[]}')
}
data = require(dataPath);

menu();

rl.on('line', (num) => {
    console.log('You choose:'+num);
        switch(num) {
            case "1":
              action1();
              break;
            case  "2":
              action2();
              break;
            case "3":
                rl.close();
                break;
            default:
              console.log('Dont know what you want...')
          }
        menu();
    });

//event handle at close

rl.on('close', function () {

    console.log("BYE BYE !");
    process.exit(0);
}); 