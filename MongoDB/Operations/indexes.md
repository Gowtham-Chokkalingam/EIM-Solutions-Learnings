_Index can speed up the find, update, delete process_

`mongoimport --drop -d b21 -c persons --file persons.json --jsonArray`

_Adding a Single Field Index_

`db.persons.createIndex({'dob.age':1})`

_To Remove Index_
`db.persons.dropIndex({'dob.age':1})`

_Compound Index_

`db.persons.createIndex({"dob.age":1,gender:1})`

_Using Index for Sorting_

_To know the indexes created_
`db.persons.getIndexes()`

[
{ v: 2, key: { _id: 1 }, name: '_id_' },
{
v: 2,
key: { 'dob.age': 1, gender: 1 },
name: 'dob.age_1_gender_1'
}
]

_Configure Indexes_

`db.persons.createIndex({email:1}  )`

_Text Index_
db.products.insertMany([{title:"A Book", description: 'This is an awsome book about a man'},{title:'Red T-Shirt', description:'This is a awsome description about shirt'}]);

`db.products.createIndex({description:"text"})`

`db.products.find({$text:{$search:'awsome'}})`

To search two or more continues words
`db.products.find({$text:{$search:"\about shirt\"}})`

_Combained text indexes_

Before creating combined index we need to delete the exiting text index
`db.products.dropIndex("description_text")`

`db.products.createIndex({title:'text", description:'text'})`

_Using text indexex we can exclude the words we dont want_

In this case I want the element which has description as awsome and it should not contains t-shirt

`db.products.find({$text:{$search:"awsome -t-shirt"}})`
