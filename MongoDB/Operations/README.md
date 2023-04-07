- To open mongoDb in terminal use this command "mongosh"
- To check the what are all the DBs preseng already "show dbs"
- To create a new DB `use flight`
- To insert data to collection db `db.flightData.insertOne({"name":"Gowtham","city":"Tirupur"})`
  
- To insert many data in one command `db.flightData.inserMany({"name":"Gowtham","city":"Tirupur"},{"name":"Chokkalingam","city":"Tirupur"})`
- `mongoimport --drop --db b21 --collection flightData --file ./01-flights.json --jsonArray`

- To delete single data in the collection `db.flightData.deleteOne({"name":"Gowtham})`
- To delete multiple data in collection `db.flightData.deleteMany({"city":"Tirupur"})`

- To update data in `db.flightData.updateOne({name:'Gowtham'},{$set:{age:28}})`
- If we want to update all the data in collection but we dont have any comman field in the collection the we can simply use this command `db.flightData.updateMany({},{$set:{age:28}})` using {} will select all the documents in collection

- Different ways of finding data in collection `db.flightdata.find({name:'Gowtham'})`

- Updating documets with arrays of items `db.passerngers.updateOne({name:"Albert Twostone"}, {$set:{hobbies:["sports","cooking"]}})`

- Relational database collection '
  `db.patients.insertOne({name:"Gowtham",age:28,diseaseSummery:"summery-1"})`

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

    `mongoimport --drop --db b21 --collection users --file users.json --jsonArray`

    `mongoimport --jsonArray --db movieData --collection movies --file tv-shows.json`

- _Update doc in MongoDb_
  Before update
  data: {
  _id: ObjectId("6423c9236f6a5f552a5e6d8d"),
  name: 'Chris',
  hobbies: [ 'Sports', 'Cooking', 'Hiking' ]
  }

  `db.users.updateOne({_id:ObjectId("6423c9236f6a5f552a5e6d8d")},{$set:{hobbies:[{title:"Sports",freq:5},{title:"Cooking",freq:6},{title:"Hiking",freq:6}]}})`
  {
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
  }
  After Update
  {
  \_id: ObjectId("6423c9236f6a5f552a5e6d8d"),
  name: 'Chris',
  hobbies: [
  { title: 'Sports', freq: 5 },
  { title: 'Cooking', freq: 6 },
  { title: 'Hiking', freq: 6 }
  ]
  }


*Update Many*
- First we can check the doc by find methode 
- `db.users.find({'hobbies.title':'Sports'})`
- Three items are present in users collections
- Now we can update by updateMany

`db.users.updateMany({'hobbies.title':'Sports'},{$set:{isSporty:true}})`

- Now we need to add/update the chris data with age
`db.users.updateOne({_id:ObjectId("6423c9236f6a5f552a5e6d8d")},{$set:{age:40,phone:8220330478}})`

- Now If we want to do increment or decrement age by some value we can use $inc or $dec operatior
- `db.users.updateOne({_id:ObjectId("6423c9236f6a5f552a5e6d8d")},{$inc:{age:1}})`
- 
- And we can do multiple opertation with update math $inc and $set togerter
- `db.users.updateOne({_id:ObjectId("6423c9236f6a5f552a5e6d8c")},{$inc:{age:-1}},{$set:{isSporty:false}})`

*To Remove the Feild in document*
`db.users.updateMany({isSporty:true},{$unset:{phone:""}})`


*Renaming the Feild*

- Now we want to rename the age to totalAge
- `db.users.updateMany({},{$rename:{age:"totalAge"}})`



*upsert* `$upsert:true` it is used as last argument in updateOne, which update if the data exist or create a new data if it doesn't

db.sports.updateOne(   { title: "Cricket" },   { $set: { requiresTeam: true } },   { upsert: true } );

db.sports.updateOne(   { title: "Tennis" },   { $set: { requiresTeam: false } },   { upsert: true } );


1) db.sports.updateMany(   { requiresTeam: true },   { $set: { minPlayersReq: 11 } } );

2) db.sports.updateMany(   { requiresTeam: true },   { $inc: { minPlayersReq: 10 } } );

