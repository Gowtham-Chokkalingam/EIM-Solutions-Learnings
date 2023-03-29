- To open mongoDb in terminal use this command "mongosh"
- To check the what are all the DBs preseng already "show dbs"
- To create a new DB `use flight`
- To insert data to collection db `db.flightData.insertOne({"name":"Gowtham","city":"Tirupur"})`
- To inser many data in one command `db.flightData.inserMany({"name":"Gowtham","city":"Tirupur"},{"name":"Chokkalingam","city":"Tirupur"})`
- `mongoimport --drop --db b21 --collection flightData --file ./01-flights.json --jsonArray`

- To delete single data in the collection `db.flightData.deleteOne({"name":"Gowtham})`
- To delete multiple data in collection `db.flightData.deleteMany({"city":"Tirupur"})`

- To update data in `db.flightData.updateOne({name:'Gowtham'},{$set:{age:28}})`
- If we want to update all the data in collection but we dont have any comman field in the collection the we can simply use this command `db.flightData.updateMany({},{$set:{age:28}})` using {} will select all the documents in collection

- Different ways of finding data in collection `db.flightdata.find({name:'Gowtham'})`

- Updating documets with arrays of items `db.passerngers.updateOne({name:"Albert Twostone"}, {$set:{hobbies:["sports","cooking"]}})`

- Relational database collection '
- `db.patients.insertOne({name:"Gowtham",age:28,diseaseSummery:"summery-1"})`

{
acknowledged: true,
insertedId: ObjectId("6422d80b770b96e75a320c77")
}

- To drop database `db.dropDatabase()`

- What happens if we Inserting Multiple data with duplicate id

`db.companies.insertMany([{name:'Masai', city:"Bangalore",_id:1},{name:'Newton', city:"Chennai",_id:2}])`
//this will not cause any issues it will add the data to db

`db.companies.insertMany([{name:'Masai', city:"Bangalore",_id:1},{name:'Newton', city:"Chennai",_id:2},{name:'Function up', city:"Bangalore",_id:1},{name:'Code Ninja', city:"Bangalore",_id:4}])`
// this will give a duplicate id error after the third data insterting so this will not insett the
// data after the duplicate id is exist and it is known as ordered insertion
// If we still want to add data after the duplicate id is exit we add the ordered : false in the insert statement

`db.companies.insertMany([{name:'Masai', city:"Bangalore",_id:1},{name:'Newton', city:"Chennai",_id:2},{name:'Function up', city:"Bangalore",_id:1},{name:'Code Ninja', city:"Bangalore",_id:4}], orderded: false)`

- - **Importing JSON data**
    
    `mongoimport --drop --db movieData --collection movies --file tv-shows.json --jsonArray`

    `mongoimport --jsonArray --db movieData --collection movies --file tv-shows.json`