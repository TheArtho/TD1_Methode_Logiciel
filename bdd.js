const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Ray:test@todolist.lgwkb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);


client.connect((err) => {
  if (err) {
    console.log("Erreur lors de la connection à la base de données");
  } else {
    const collection = client.db("TODOList").collection("users");

    let test = collection.updateOne({
      name : "loic"
    },{$set: {password: "rayane"}},  (err) => {
      if (err) {
        // do something
      } else {
        client.close();
      }
    });}});