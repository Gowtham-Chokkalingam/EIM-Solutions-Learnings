- _Update doc in MongoDb_
  Before update
  data: {
  \_id: ObjectId("6423c9236f6a5f552a5e6d8d"),
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
- `db.users.updateOne({_id:ObjectId("6423c9236f6a5f552a5e6d8d")},{$set:{age:40,phone:8220330478}})`