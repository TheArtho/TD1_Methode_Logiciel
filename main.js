const readline = require('readline');
const fs = require('fs')

const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

let data;
let dataObj;

let createData = () => {
    let jsonData = '[]';

    fs.writeFile("data.json", jsonData, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been created.");
    });
}

let saveData = () => {
    fs.writeFile("data.json", data, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been created.");
    });
}

let menu = () => {
    console.log('\tTODO LIST\n');

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            console.log('- '+data[i]);
        }
        console.log('- Add a new Task');
    }
    else {
        console.log('- Add your first TODO Task');
    }    
}

const dataPath = './data.json'

/* Start */

// Checks for data file
try {
  if (fs.existsSync(path)) {
    //file exists
  }
} catch(err) {
    createData();
}
data = require('data.json');


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