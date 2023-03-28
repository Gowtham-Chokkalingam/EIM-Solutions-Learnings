- To open mongoDb in terminal use this command "mongosh"
- To check the what are all the DBs preseng already "show dbs"
- To create a new DB `use flight`
  
- To insert data to collection db `db.flightData.insertOne({"name":"Gowtham","city":"Tirupur"})`
  
- To inser many data in one command `db.flightData.inserMany({"name":"Gowtham","city":"Tirupur"},{"name":"Chokkalingam","city":"Tirupur"})`

- To delete single  data in the collection `db.flightData.deleteOne({"name":"Gowtham})`
- To delete multiple data in collection `db.flightData.deleteMany({"city":"Tirupur"})`

- To update data in `db.flightData.updateOne({name:'Gowtham'},{$set:{age:28}})`
- If we want to update all the data in collection but we dont have any comman field in the collection the we can simply use this command `db.flightData.updateMany({},{$set:{age:28}})` using {} will select all the documents in collection 
