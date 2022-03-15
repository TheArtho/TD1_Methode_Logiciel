const readline = require('readline');
const fs = require('fs');
const taskHandler = require('./taskHandler.js');
const interface = require('./menu.js')
const dataPath = './data.json';
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



/* Start */

// Checks for data file
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '{"list":[]}')
}
data = require(dataPath);

interface.menu(data, taskHandler);

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
        interface.menu(data, taskHandler);
    });

//event handle at close

rl.on('close', function () {

    console.log("BYE BYE !");
    process.exit(0);
}); 