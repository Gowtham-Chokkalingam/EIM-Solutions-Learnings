db.persons.aggregate([{ $match: { gender: "female" } }, { $group: { _id: { state: "$location.state" }, totalPerosons: { $sum: 1 } } }]);

//> Sorting with aggregation
db.persons.aggregate([
  { $match: { gender: "female" } },
  { $group: { _id: { state: "$location.state" }, totalPerosons: { $sum: 1 } } },
  { $sort: { totalPerosons: -1 } },
]);

db.persons.aggregate([
  { $match: { "dob.age": { $gt: 50 } } },
  { $group: { _id: { gender: "$gender" }, total: { $sum: 1 }, Avgage: { $avg: "$dob.age" } } },
  { $sort: { total: 1 } },
]);
// > Group
db.persons.aggregate([{ $group: { _id: { gender: "$gender" }, totalAge: { $sum: "$dob.age" } } }]);

// > Projection in aggregation
// Display the id gender and full name

db.persons.aggregate([{ $project: { _id: 0, gender: 1, fullName: { $concat: ["$name.first", " ", "$name.last"] } } }]);

// Frist and last nama start with upper case

db.persons.aggregate([{ $project: { _id: 0, gender: 1, fullName: { $concat: [{ $toUpper: "$name.first" }, " ", { $toUpper: "$name.last" }] } } }]);

// op { gender: 'male', fullName: 'HARVEY chambers' },

//> What if we only Want the first char captilized

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
          { $substrCP: ["$name.first", 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] }] },
          " ",
          { $toUpper: "$name.last" },
        ],
      },
    },
  },
]);

//> Transforming the bday date

db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $convert: { input: "$dob.date", to: "date" } },
        age: "$dob.age",
        location: {
          type: "Point",
          coordinates: [
            {
              $convert: {
                input: "$location.coordinates.longitude",
                to: "double",
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $convert: {
                input: "$location.coordinates.latitude",
                to: "double",
                onError: 0.0,
                onNull: 0.0,
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
            {
              $substrCP: ["$name.first", 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] }],
            },
            " ",
            { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
            {
              $substrCP: ["$name.last", 1, { $subtract: [{ $strLenCP: "$name.last" }, 1] }],
            },
          ],
        },
      },
    },
  ])
  .pretty();

//> Pushing element into arrays
// ? unwind is used to flaten the array

db.friends.aggregate([{ $unwind: "$hobbies" }, { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } }]);

//> Eleminating duplicate values to pushing into array $addTosSet is used to aviod this
db.friends.aggregate([{ $unwind: "$hobbies" }, { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } }]);

// projecting array elemetns

db.friends.aggregate([{ $project: { _id: 0, examScore: { $slice: ["$examScores", 2, 1] } } }]);

//> Getting length of array

db.friends.aggregate([{ $project: { _id: 0, numSocres: { $size: "$examScores" } } }]);

//> Filtering in arrays of element 
// filter the data which examscore array score is greater than 60

db.friends.aggregate([{ $project: { score: { $filter: { input: "$examScores", as: "sc", cond: { $gt: ["$$sc.score", 60] } } } } }]);
