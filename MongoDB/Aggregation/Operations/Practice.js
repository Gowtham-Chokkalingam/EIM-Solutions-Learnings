//?link-- https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-sort

db.universities.insert([
  {
    country: "Spain",
    city: "Salamanca",
    name: "USAL",
    location: {
      type: "Point",
      coordinates: [-5.6722512, 17, 40.9607792],
    },
    students: [
      { year: 2014, number: 24774 },
      { year: 2015, number: 23166 },
      { year: 2016, number: 21913 },
      { year: 2017, number: 21715 },
    ],
  },
  {
    country: "Spain",
    city: "Salamanca",
    name: "UPSA",
    location: {
      type: "Point",
      coordinates: [-5.6691191, 17, 40.9631732],
    },
    students: [
      { year: 2014, number: 4788 },
      { year: 2015, number: 4821 },
      { year: 2016, number: 6550 },
      { year: 2017, number: 6125 },
    ],
  },
]);

// Again, you can insert them in the same way, using the following code or by importing as a JSON file:

db.courses.insert([
  {
    university: "USAL",
    name: "Computer Science",
    level: "Excellent",
  },
  {
    university: "USAL",
    name: "Electronics",
    level: "Intermediate",
  },
  {
    university: "USAL",
    name: "Communication",
    level: "Excellent",
  },
]);

// >  MongoDB $match
// The $match stage allows us to choose just those documents from a collection that we want to work with. It does this by filtering out those that do not follow our requirements.

// In the following example, we only want to work with those documents which specify that Spain is the value of the field country, and Salamanca is the value of the field city.

db.universities.aggregate([{ $match: { country: "Spain", city: "Salamanca" } }]);
// output
let op = [
  {
    _id: ObjectId("5b7d9d9efbc9884f689cdba9"),
    country: "Spain",
    city: "Salamanca",
    name: "USAL",
    location: {
      type: "Point",
      coordinates: [-5.6722512, 17, 40.9607792],
    },
    students: [
      {
        year: 2014,
        number: 24774,
      },
      {
        year: 2015,
        number: 23166,
      },
      {
        year: 2016,
        number: 21913,
      },
      {
        year: 2017,
        number: 21715,
      },
    ],
  },
  {
    _id: ObjectId("5b7d9d9efbc9884f689cdbaa"),
    country: "Spain",
    city: "Salamanca",
    name: "UPSA",
    location: {
      type: "Point",
      coordinates: [-5.6691191, 17, 40.9631732],
    },
    students: [
      {
        year: 2014,
        number: 4788,
      },
      {
        year: 2015,
        number: 4821,
      },
      {
        year: 2016,
        number: 6550,
      },
      {
        year: 2017,
        number: 6125,
      },
    ],
  },
];

//> MongoDB $project
// It is rare that you ever need to retrieve all the fields in your documents. It is good practice to return only those fields you need so as to avoid processing more data than is necessary.

// The $project stage is used to do this and to add any calculated fields that you need.

// In this example, we only need the fields country, city and name.

db.universities.aggregate([{ $project: { _id: 0, country: 1, city: 1, name: 1 } }]);

//> output
let op2 = [
  { country: "Spain", city: "Salamanca", name: "USAL" },
  { country: "Spain", city: "Salamanca", name: "UPSA" },
];

//> MongoDB $group
// With the $group stage, we can perform all the aggregation or summary queries that we need, such as finding counts, totals, averages or maximums.

// In this example, we want to know the number of documents per university in our ‘universities’ collection:

db.universities.aggregate([{ $group: { _id: "$name", totalDocs: { $sum: 1 } } }]);
//> output

let op3 = [
  { _id: "UPSA", totaldocs: 1 },
  { _id: "USAL", totaldocs: 1 },
];
//> MongoDB $sort
// You need the $sort stage to sort your results by the value of a specific field.

// For example, let’s sort the documents obtained as a result of the $unwind stage by the number of students in descending order.

db.universities.aggregate([{ $match: { name: "USAL" } }, { $unwind: "$students" }, { $sort: { "students.number": -1 } }]);

//> MongoDB $lookup
// Because MongoDB is document-based, we can shape our documents the way we need. However, there is often a requirement to use information from more than one collection.

db.universities.aggregate([
  { $match: { name: "USAL" } },
  {
    $project: { _id: 0, name: 1 },
  },
  {
    $lookup: {
      from: "courses",
      localField: "name",
      foreignField: "university",
      as: "Courses",
    },
  },
]);

// > How do we get the total number of students that have ever belonged to each one of the universities?

// Here number of students is present inside the students array , before suming we need to unwide to get the all summ

db.universities.aggregate([{ $unwind: "$students" }, { $group: { _id: "$name", totalStudents: { $sum: "$students.number" } } }]);
