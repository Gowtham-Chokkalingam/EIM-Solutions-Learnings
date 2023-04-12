db.persons.insertMany([
  {
    personName: "Gowtham",
    fathersName: "Chokkalingam",
    gender: "Male",
    age: 26,
    address: {
      doorNumber: 67,
      streetName: "TSR Lay Out",
      landmark: "Kongu Main Road",
      city: "Tirupur",
      pincode: 641607,
      contactNumber: { primaryNumber: [8220330478, 9994752528], secondaryNumber: [421421782, 72569812] },
      email: { personal: "gowthamtceian@gmail.com", office: "gowtham.cho@eimsolutions.com" },
    },
    education: ["10th", "12th", "B.E"],
    hobbies: ["Cricket", "Batminton", "Bike Riding", "Coding"],
  },
  {
    personName: "Vignesh",
    fathersName: "Karthik",
    gender: "Male",
    age: 26,
    address: {
      doorNumber: 75,
      streetName: "Sv Colony",
      landmark: "Ring Main Road",
      city: "Coimbatore",
      pincode: 641625,
      contactNumber: { primaryNumber: [9220330478, 7994752528], secondaryNumber: [421421782, 72569812] },
      email: { personal: "vignesh@gmail.com", office: "vignaesh.cho@eimsolutions.com" },
    },
    education: ["10th", "12th", "B.S.E"],
    hobbies: ["Football", "Batminton", "Bike Riding", "Travelling"],
  },
  {
    personName: "Madhu",
    fathersName: "Teegredy",
    gender: "Female",
    age: 26,
    address: {
      doorNumber: 12,
      streetName: "Latha Colony",
      landmark: "Godavari Main Road",
      city: "East Godavari",
      pincode: 641605,
      contactNumber: { primaryNumber: [8220330478, 9994752528], secondaryNumber: [421421782, 72569812] },
      email: { personal: "madhu@gmail.com", office: "madhu.t@eimsolutions.com" },
    },
    education: ["10th", "12th", "B.E"],
    hobbies: ["Chess", "Batminton", "Singing", "Reading Books"],
  },
  {
    personName: "Vijay",
    fathersName: "Kumar",
    gender: "Male",
    age: 26,
    address: {
      doorNumber: 56,
      streetName: "T Nager",
      landmark: "TK purum",
      city: "Chennai",
      pincode: 6000028,
      contactNumber: { primaryNumber: [7820330478, 7794752528], secondaryNumber: [421421782, 72569812] },
      email: { personal: "vijay@gmail.com", office: "vijay.k@eimsolutions.com" },
    },
    education: ["10th", "12th", "B.E"],
    hobbies: ["Cricket", "Batminton", "Bike Riding", "Coding"],
  },
  {
    personName: "Janani",
    fathersName: "Shanmugam",
    gender: "Female",
    age: 26,
    address: {
      doorNumber: 56,
      streetName: "Boyampalayam",
      landmark: "Anna nagar Road",
      city: "Tirupur",
      pincode: 641617,
      contactNumber: { primaryNumber: [7220330478, 8794752528], secondaryNumber: [421421782, 72569812] },
      email: { personal: "janani@gmail.com", office: "janai.s@eimsolutions.com" },
    },
    education: ["10th", "12th", "MBBS"],
    hobbies: ["Travelling", "Hockey", "Cycle Riding", "Cooking"],
  },
]);

db.persons.updateOne({ education: "MBBS" }, { $set: { age: 25 } });
db.persons.updateOne({ personName: "Gowtham" }, { $set: { age: 27 } });
db.persons.aggregate([{ $group: { _id: null, totalAge: { $max: "$age" } } }]);

// > To find the largest aged person details in mongo aggregation
// we can use the $group aggregation stage to find the max age among the documents and $project stage to display the person name and gender of the document with the max age.

db.persons.aggregate([
  {
    $group: {
      _id: null,
      maxAge: { $max: "$age" },
    },
  },
  {
    $lookup: {
      from: "persons",
      let: { maxAge: "$maxAge" },
      pipeline: [{ $match: { $expr: { $eq: ["$age", "$$maxAge"] } } }, { $project: { personName: 1, gender: 1, _id: 0 } }],
      as: "personWithMaxAge",
    },
  },

  {
    $project: {
      _id: 0,
      personName: { $arrayElemAt: ["$personWithMaxAge.personName", 0] },
      gender: { $arrayElemAt: ["$personWithMaxAge.gender", 0] },
    },
  },
]);

db.persons.aggregate([{ $sort: { age: -1 } }]);
db.persons.find({}, { personName: 1, age: 1 }).sort({ age: -1 }).skip(1).limit(1);
db.persons.aggregate([{ $project: { name: "$personName", age: "$age", _id: 0 } }, { $sort: { age: -1 } }, { $skip: 1 }, { $limit: 1 }]);
