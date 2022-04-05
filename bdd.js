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

getUser("loic","kebab");



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