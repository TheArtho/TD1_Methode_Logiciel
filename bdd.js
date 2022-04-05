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

function createUser(username, password, callback){
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
          callback(0);
          client.close();
        }
      });
          collection.insertOne({name : username, password : password},(err) => {
          if (err) {
            console.log("Erreur lors de l'ajout à la base de donnée");
          } else {
            console.log("L'utilisateur a bien été crée");
            callback(1);
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

function getTasksByGroupID(id, callback){
  let query = {groupTaskID : id};

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
function createGroupTask(name, userID, callback){
  client.connect((err)=>{
    if (err) {
      console.log("Erreur lors de la connection à la base de données");
    }
    else{
      const collection = client.db("TODOList").collection("tasks_groups");
      
          collection.insertOne({name : name, userID : userID},(err) => {
          if (err) {
            console.log("Erreur lors de l'ajout à la base de donnée");
          } else {
            console.log("Le groupe a bien été ajoutée");
            callback(0);
            client.close();
          }
        }); 
    }
  });
}
function createTask(name, groupTaskID, callback){
  client.connect((err)=>{
    if (err) {
      console.log("Erreur lors de la connection à la base de données");
    }
    else{
      const collection = client.db("TODOList").collection("tasks");
          collection.insertOne({name : name, done : false, groupTaskID : groupTaskID},(err) => {
          if (err) {
            console.log("Erreur lors de l'ajout à la base de donnée");
          } else {
            console.log("La tâche a bien été ajoutée");
            callback(0);
            client.close();
          }
        }); 
    }
  });
}
function updateTask(id,name,done, callback){
  client.connect((err)=>{
    if (err) {
      console.log("Erreur lors de la connection à la base de données");
    }
    else{
      const collection = client.db("TODOList").collection("tasks");
          collection.updateMany({_id : id},{$set:{name : name, done : done}},(err) => {
          if (err) {
            console.log("Erreur lors de l'ajout à la base de donnée");
          } else {
            console.log("La tâche a bien été modifiée");
            callback(0);
            client.close();
          }
        }); 
    }
  });
}
function removeTask(id, callback){
  client.connect((err)=>{
    if (err) {
      console.log("Erreur lors de la connection à la base de données");
    }
    else{
      const collection = client.db("TODOList").collection("tasks");
      collection.remove({_id : id}, null, function(error, result) {
        if (error) throw error;
        else
          console.log("la tache a bien été supprimée"); 
          client.close();  
    });
    }
    
  });
}
function removeGroupTask(id, callback){
  client.connect((err)=>{
    if (err) {
      console.log("Erreur lors de la connection à la base de données");
    }
    else{
      getTasksByGroupID(id,(tasks)=>{
        tasks.array.forEach(element => {
          removeTask(element._id, (val)=>{})
        });
      });

      const collection = client.db("TODOList").collection("tasks_groups");

      collection.remove({_id : id}, null, function(error, result) {
        if (error) throw error;
        else
          console.log("le groupe a bien été supprimée"); 
          client.close();  
    });
    }
    
  });
}

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