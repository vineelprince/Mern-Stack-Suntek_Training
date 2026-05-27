db.createCollection("users")
{ ok: 1 }
show databases
PassManager        72.00 KiB
admin              40.00 KiB
anuragdb            8.00 KiB
config             72.00 KiB
digital-diner      76.00 KiB
expense_tracker    40.00 KiB
kyc_verification   72.00 KiB
local             184.00 KiB
men                72.00 KiB
men-drive         216.00 KiB
students           72.00 KiB
studetns           80.00 KiB
test               72.00 KiB
db.users.insertOne({name:"ravi",age:19,city:"hyderabad"})
{
  acknowledged: true,
  insertedId: ObjectId('697c80d680992dfd14cde1b2')
}
db.users.insertMany([{name:"ravi",age:19,city:"hyderabad"},{name:"jk",age:20,city:"jaipur"}])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('697c81a280992dfd14cde1b3'),
    '1': ObjectId('697c81a280992dfd14cde1b4')
  }
}
db.users.findOne()
{
  _id: ObjectId('697c80d680992dfd14cde1b2'),
  name: 'ravi',
  age: 19,
  city: 'hyderabad'
}
db.users.find()
{
  _id: ObjectId('697c80d680992dfd14cde1b2'),
  name: 'ravi',
  age: 19,
  city: 'hyderabad'
}
{
  _id: ObjectId('697c81a280992dfd14cde1b3'),
  name: 'ravi',
  age: 19,
  city: 'hyderabad'
}
{
  _id: ObjectId('697c81a280992dfd14cde1b4'),
  name: 'jk',
  age: 20,
  city: 'jaipur'
}
 
 
 
 
 
 
db.users.updateOne({name:"ravi"},{$set:{name:"teja"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.users.find()
{
  _id: ObjectId('697c80d680992dfd14cde1b2'),
  name: 'teja',
  age: 19,
  city: 'hyderabad'
}
{
  _id: ObjectId('697c81a280992dfd14cde1b3'),
  name: 'ravi',
  age: 19,
  city: 'hyderabad'
}
{
  _id: ObjectId('697c81a280992dfd14cde1b4'),
  name: 'jk',
  age: 20,
  city: 'jaipur'
}
db.users.deleteOne({name:"ravi"})
{
  acknowledged: true,
  deletedCount: 1
}
db.users.find()
{
  _id: ObjectId('697c80d680992dfd14cde1b2'),
  name: 'teja',
  age: 19,
  city: 'hyderabad'
}
{
  _id: ObjectId('697c81a280992dfd14cde1b4'),
  name: 'jk',
  age: 20,
  city: 'jaipur'
}
show databases
PassManager        72.00 KiB
admin              40.00 KiB
anuragdb           72.00 KiB
config            108.00 KiB
digital-diner      76.00 KiB
expense_tracker    40.00 KiB
kyc_verification   72.00 KiB
local             184.00 KiB
men                72.00 KiB
men-drive         216.00 KiB
students           72.00 KiB
studetns           80.00 KiB
test               72.00 KiB
db.users.findOne({name:"teja"})
{
  _id: ObjectId('697c80d680992dfd14cde1b2'),
  name: 'teja',
  age: 19,
  city: 'hyderabad'
}
db.users.findOne({name:{$eq:"teja"}})
{
  _id: ObjectId('697c80d680992dfd14cde1b2'),
  name: 'teja',
  age: 19,
  city: 'hyderabad'
}
db.users.findOne({name:{$eq:"madhu"}})
null
db.users.find({age:{$gt:18}})
{
  _id: ObjectId('697c80d680992dfd14cde1b2'),
  name: 'teja',
  age: 19,
  city: 'hyderabad'
}
{
  _id: ObjectId('697c81a280992dfd14cde1b4'),
  name: 'jk',
  age: 20,
  city: 'jaipur'
}
db.users.find({name:{$neq:"teja"}})
MongoServerError[BadValue]: unknown operator: $neq
db.users.find({name:{$ne:"teja"}})
{
  _id: ObjectId('697c81a280992dfd14cde1b4'),
  name: 'jk',
  age: 20,
  city: 'jaipur'
}