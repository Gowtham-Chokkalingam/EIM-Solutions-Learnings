// db.persons
//   .aggregate([
//     { $match: { "dob.age": { $gt: 50 } } },
//     {
//       $group: {
//         _id: { gender: "$gender" },
//         numPersons: { $sum: 1 },
//         avgAge: { $avg: "$dob.age" },
//       },
//     },
//     { $sort: { numPersons: -1 } },
//   ])
//   .pretty();

let x = 100;

function d() {
  var x = 10;
}
console.log(x);
d();
