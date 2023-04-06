// db b21 collecrions heros and orders

db.orders.find();
db.heros.find();

db.orders.aggregate(); // This will gives us all the record present in the collection

db.orders.aggregate({ $limit: 2 }); // which gives output as two records only

//? Sorting price in ascending order

db.orders.aggregate([{ $sort: { price: 1 } }]);

//? To find the all small size rec price greater than 16

db.orders.aggregate([{ $match: { size: "small", price: { $gt: 16 } } }]);
