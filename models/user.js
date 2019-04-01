var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var assert = require('assert');

var userSchema = new mongoose.Schema({
   username: {type : String},
   password: {type : String},
   email: {type : String , unique: true},
   history: [
    {
      query: String,
      tag: {
          type: String,
          enum: ['story', 'comment'], 
       },
       by: {
           type: String,
           enum: ['date', 'popularity'], 
       },
       dateRange: {
           type: String,
           enum: ['all', 'last24h', 'pastWeek', 'pastMonth', 'pastYear'], 
       },
       time : { type : Date, default: Date.now }
   }
]

});
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User", userSchema);
User.on('index', function(err) { // <-- Wait for User's indexes to finish
  assert.ifError(err);
//   User.create([{ email: 'Val' }, { email: 'Val' }], function(err) {
//     console.log(err);
//   });
});

// Promise based alternative. `init()` returns a promise that resolves
// when the indexes have finished building successfully. The `init()`
// function is idempotent, so don't worry about triggering an index rebuild.
// User.init().then(function() {
//   assert.ifError(err);
//   User.create([{ email: 'Val' }, { email: 'Val' }], function(err) {
//     console.log(err);
//   });
// });

module.exports = User;