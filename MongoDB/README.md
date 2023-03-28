- To open mongoDb in terminal use this command "mongosh"
- To check the what are all the DBs preseng already "show dbs"
- To create a new DB `use flight`
  
- To insert data to collection db `db.flightData.insertOne({"name":"Gowtham","city":"Tirupur"})`
  
- To inser many data in one command `db.flightData.inserMany({"name":"Gowtham","city":"Tirupur"},{"name":"Chokkalingam","city":"Tirupur"})`
- `mongoimport --drop --db b21 --collection flightData --file ./01-flights.json --jsonArray`

- To delete single  data in the collection `db.flightData.deleteOne({"name":"Gowtham})`
- To delete multiple data in collection `db.flightData.deleteMany({"city":"Tirupur"})`

- To update data in `db.flightData.updateOne({name:'Gowtham'},{$set:{age:28}})`
- If we want to update all the data in collection but we dont have any comman field in the collection the we can simply use this command `db.flightData.updateMany({},{$set:{age:28}})` using {} will select all the documents in collection 

- Different ways of finding data in collection `db.flightdata.find({name:'Gowtham'})`


- Updating documets with arrays of items `db.passerngers.updateOne({name:"Albert Twostone"}, {$set:{hobbies:["sports","cooking"]}})`


- Relational database collection '
-  `db.patients.insertOne({name:"Gowtham",age:28,diseaseSummery:"summery-1"})`

{
  acknowledged: true,
  insertedId: ObjectId("6422d80b770b96e75a320c77")
}

- To drop database `db.dropDatabase()`