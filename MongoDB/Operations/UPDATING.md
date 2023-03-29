_Updating using match feilds in array_

`db.users.find({hobbies:{$elemMatch:{title:'Sports',freq:{$gte:3}}}})`

`db.users.updateMany({hobbies:{$elemMatch:{title:'Sports',freq:{$gte:2}}}},{$set:{"hobbies.$.highFreq":true}})`

_To update all ele in array $[]_

- To update users with totalAge greater Than 30 with incremnet the freq by 1
- `db.users.updateMany({totalAge:{$gt:40}}, {$inc:{"hobbies.$[].freq":-1}})`

<!-- - wrong - `db.users.updateMany({name:"Chris"},{$rename:{"hobbies.freq":"frequency"}})`
`db.users.findOne({name:"Chris"}).hobbies.updateMany({$rename:{freq:"frequency"}})` -->

_Added or Pushing new element to arry_

- `db.users.updateOne({name:'Manuel'},{$push:{title:'Sports', frequency:8}} )`

<!-- I removed bcz it was wrongly added by previous query -->

`db.users.updateMany({name:'Manuel'},{$unset:{title:"",frequency:""}})`

<!-- actual query -->

`db.users.updateOne({name:'Manuel'},{$push:{hobbies:{title:'Sports', frequency:8}} })`

_Pushing multiple elements_
`db.users.updateOne({name:'Manuel'},{$push:{hobbies:{$each:[{title:'Movie', frequency:2},{title:'Tinnes', frequency:4} ],$sort:{frequency:-1}}}})`
