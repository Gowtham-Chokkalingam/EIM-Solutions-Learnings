<!-- *{
    "id": 1,
    "url": "http://www.tvmaze.com/shows/1/under-the-dome",
    "name": "Under the Dome",
    "type": "Scripted",
    "language": "English",
    "genres": ["Drama", "Science-Fiction", "Thriller"],
    "status": "Ended",
    "runtime": 60,
    "premiered": "2013-06-24",
    "officialSite": "http://www.cbs.com/shows/under-the-dome/",
    "schedule": { "time": "22:00", "days": ["Thursday"] },
    "rating": { "average": 6.5 },
    "weight": 91,
    "network": { "id": 2, "name": "CBS", "country": { "name": "United States", "code": "US", "timezone": "America/New_York" } },
    "webChannel": null,
    "externals": { "tvrage": 25988, "thetvdb": 264492, "imdb": "tt1553656" },
    "image": {
      "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/0/1.jpg",
      "original": "http://static.tvmaze.com/uploads/images/original_untouched/0/1.jpg"
    },
    "summary": "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
    "updated": 1529612668,
    "_links": { "self": { "href": "http://api.tvmaze.com/shows/1" }, "previousepisode": { "href": "http://api.tvmaze.com/episodes/185054" } }
  } -->

_Operators to find the data_
_Comparision Operator_

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

- To find the particular set of data _in Range_ which statify the muliple condition we can use $in
`db.movies.find({runtime:{$in:[30,42]}})`
- To find the all values which is not in range of 30 and 60
  `db.movies.find({runtime:{$nin:[30,60]}})`

_Logical Operator_

<!-- > $or, $nor, $and -->

`db.movies.find({$or:[{"rating.average":{$lt:5}},{"rating.average":{$gt:9.3}}]})`

- $and

`db.movies.find({$and:[{genres:"Drama"},{"rating.average":{$gt:9}}]})`

<!-- both are same we can avoid and by using below conditon -->

`db.movies.find({genres:"Drama","rating.average":{$gt:9}})`

<!--> $not -->

`db.movies.find({runtime:{$not:{$eq:60}}})`

_$exists_
`db.users.updateOne({name:"Chris"}, {$rename:{totalAge:"age"}})`

`db.users.find({age:{$exists:true}})`

_To Search Text we can user $regex_

`db.movies.find({summary:{$regex:/musical/}})`

<!-- This won't look for full equality it will just search the text which is mentioned in the regex -->

_To find the moive data which genere is action and thirller even in differnt order_

`db.movies.find({genere:{$all:['action','thriller']}})`

_sorting_

`db.movies.find().sort({"rating.average":1,runtime:-1})`

_Skiping and Limiting_

`db.movies.find().sort({"rating.average":1,runtime:-1}).skip(10).limit(10)`

_Projection_
if you dont want to include the data while retriving from collection we can mention feild name with 0 for not include and 1 for inculsion

`db.movies.find({},{name:1,runtime:1, "schedule.time":1 })`

*slice*
This code will project the genres array with first two datas
`db.movies.find({'rating.average':{$gt:9}}, {genres:{$slice:2},name:1})`

or
`db.movies.find({'rating.average':{$gt:9}}, {genres:{$slice:[0,2]},name:1})`