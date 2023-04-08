
//> Evaluation Operator $expr and $regex operators for querying the documents - MongoDB
//If we want to find the doc by comparing the feild which present inside the doc itself we can use $expr

db.monthlyBudget.insertMany([{category:'misc', budget:500,spend:300},{category:'travel', budget:200,spend:650},])

// to rename field Spend to spent
db.monthlyBudget.updateMany({},{$rename:{spend:"spent"}})

movieData> db.monthlyBudget.find()
let op=[
  {
    _id: ObjectId("642fcb37714a8424bdee53d2"),
    category: 'food',
    budget: 400,
    spend: 450
  },
  {
    _id: ObjectId("642fcb37714a8424bdee53d3"),
    category: 'drinks',
    budget: 100,
    spend: 150
  }
]

// now we are finding the data whose spent is greater than budget 
db.monthlyBudget.find({$expr:{$gt:['$spent', '$budget']}})



//>Use $expr operator with $cond to query the documents with condition

db.monthlyBudget.aggregate([
    {
      $group: {
        _id: "$category",
        avgSpent: { $avg: "$spent" }
      }
    },
   
  ])
  