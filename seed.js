var db = require('./models');



var test_destination =[{
  location: "Taiwan",
  date: "November-12-2017",
  budget: 5000,
  plans: ["dsd","dsfsd","fsfs"]
},{
  location: "jfklsd",
  date: "djklsa-24-294",
  budget: 6000,
  plans: ["fsf","dsda","fsfs"]
}]


db.Destination.remove({},function(err, success){
  if(err){console.log("seed.js err line 18")};
  db.Destination.create(test_destination, function(err, success){
    if(err){return console.log(err)};
    console.log("db is seeded...",success);
    process.exit();
  })
})
