*Operators to find the data*
*Comparision Operator*
<!-- Common Operators $eq Equla to  ,`$nq` not Equal to, $lt Lesser than, $gt Greater than, $lte LesserThan or Equal, $gte Greater Than or equal -->
- To find the movie which runtime is 60
`db.movies.find({runtime:{$eq:60}})`
`db.movies.find({runtime:{$gte:60}})`

- To find or filter the nested docs or obj in collection
`db.movies.find({"rating.average":{$gte:8}})`
  
- To find the data in according to arry 
    
    genres: [ 'Comedy', 'Family' ],
    
Here we need to filter the items wrt comedy
`db.movies.find({genres:'Comedy'})` casing is important
`db.movies.find({genres:['Comedy']})` this will show the arrys with mentioned data

- To find the particular set of data *in Range* which statify the muliple condition we can use $in
`db.movies.find({runtime:{$in:[30,42]}})`
- To find the all values which is not in range of 30 and 60
`db.movies.find({runtime:{$nin:[30,60]}})`



*Logical Operator*
<!-- > $or, $nor, $and -->
`db.movies.find({$or:[{"rating.average":{$lt:5}},{"rating.average":{$gt:9.3}}]})`

- $and

`db.movies.find({$and:[{genres:"Drama"},{"rating.average":{$gt:9}}]})`
<!-- both are same we can avoid and by using below conditon -->
`db.movies.find({genres:"Drama","rating.average":{$gt:9}})`

<!--> $not -->
`db.movies.find({runtime:{$not:{$eq:60}}})`

*$exists*
`db.users.updateOne({name:"Chris"}, {$rename:{totalAge:"age"}})`

`db.users.find({age:{$exists:true}})`

*To Search Text we can user $regex*

`db.movies.find({summary:{$regex:/musical/}})`
<!-- This won't look for full equality it will just search the text which is mentioned in the regex -->


*To find the moive data which genere is action and thirller even in differnt order*

`db.movies.find({genere:{$all:['action','thriller']}})`