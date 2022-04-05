const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Ray:test@todolist.lgwkb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);


function getUser(username,password){  
  let query = { name : username, password : password};

  client.connect((err)=>{
    if (err) {
      console.log("Erreur lors de la connection à la base de données");
    }
    else{
      const collection = client.db("TODOList").collection("users");
      collection.find(query).toArray((err, result) =>{
        if(result.length == 0)
          console.log("Utilisateur introuvable");
          
        else
          console.log(result);
          
          client.close();
      });
    }
  });
}

function createUser(username, password){
  let query = { name : username, password : password};
  exist = 0;
  client.connect((err)=>{
    if (err) {
      console.log("Erreur lors de la connection à la base de données");
    }
    else{
      const collection = client.db("TODOList").collection("users");
      collection.find(query).toArray((err, result) =>{
        if(result.length == 0) {
          exist = 1;
        }  
        else {
          //console.log(result);
          console.log("L'utilisateur existe déjà, veuiller donner un autre nom");
          client.close();
        }
      });
          collection.insertOne({name : username, password : password},(err) => {
          if (err) {
            console.log("Erreur lors de l'ajout à la base de donnée");
          } else {
            console.log("L'utilisateur a bien été crée");
            client.close();
          }
        });
      
    }
  });
}

function getUserToken(username, password, callback){  
  let query = { name : username, password : password};
  let res = undefined;

  client.connect((err)=>{
    if (err) {
      console.log("Erreur lors de la connection à la base de données");
    }
    else{
      const collection = client.db("TODOList").collection("users");
      collection.find(query).toArray((err, result) =>{
        if(result.length == 0) {
          callback(0);
        }  
        else {
          //console.log(result);
          res = result[0]._id;
          console.log(res);
          callback(res);
        }
          client.close();
      });
    }
  });
}

function getTasksByUserID(id, callback){
  let query = {_id : id};

  client.connect((err)=>{
    if (err) {
      console.log("Erreur lors de la connection à la base de données");
    }
    else{
      const collection = client.db("TODOList").collection("tasks");
      collection.find(query).toArray((err, result) =>{
        if(result.length == 0) {
          callback(0);
        }  
        else {
          console.log(result);
          callback(result);
        }
          client.close();
      });
    }
  });

}

function getTasksGroupsByUserID(id, callback){
  let query = {_id : id};

  client.connect((err)=>{
    if (err) {
      console.log("Erreur lors de la connection à la base de données");
    }
    else{
      const collection = client.db("TODOList").collection("tasks_group");
      collection.find(query).toArray((err, result) =>{
        if(result.length == 0) {
          callback(0);
        }  
        else {
          console.log(result);
          callback(result);
        }
          client.close();
      });
    }
  });

}

createUser("nfjn", "kebdedab");
/*
client.connect((err) => {
  if (err) {
    console.log("Erreur lors de la connection à la base de données");
  } else {
    const collection = client.db("TODOList").collection("users");

   collection.findOne({
      name : "loic"
    },(err) => {
      if (err) {
        // do something
      } else {
        client.close();
      }
    });}
  });*/