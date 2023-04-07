// db b21 collecrions heros and orders

db.orders.find();
db.heros.find();

db.orders.aggregate(); // This will gives us all the record present in the collection

db.orders.aggregate({ $limit: 2 }); // which gives output as two records only

//? Sorting price in ascending order

db.orders.aggregate([{ $sort: { price: 1 } }]);

//? To find the all small size rec price greater than 16

db.orders.aggregate([{ $match: { size: "small", price: { $gt: 16 } } }]);

//? Group the rec by size

db.orders.aggregate([{ $group: { _id: "$size", nameOfPiza: { $push: "$name" }, total: { $sum: 1 } } }]);

//?  To find the total qty of medium size pizaas
db.orders.aggregate([{ $match: { size: "medium" } }, { $group: { _id: "$name", total: { $sum: "$quantity" } } }]);

// > Now we are using cities db

//? To group them based on state and find total population per state

db.cities.aggregate([{ $group: { _id: "$state", totalPopulation: { $sum: "$pop" } } }, { $sort: { _id: 1 } }]);

db.cities.aggregate([{ $group: { _id: "$state", totalPopulation: { $sum: "$pop" } } }, { $sort: { totalPopulation: -1 } }, { $limit: 1 }]);

// ? Find average population of every state per city

db.cities.aggregate([{ $group: { _id: { state: "$state" ,city:'$city'}, tot:{$sum:"$pop"} } }]);
