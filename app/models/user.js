// get an instance of mongoose and mongoose.Schema
var 
  //include all
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var userSchema = new Schema({ 
    username: String, 
    password: String, 
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
  
    // change the updated_at field to current date
    this.updated_at = currentDate;
  
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;
  
    next();
  });

mongoose.connect('mongodb://localhost/bookapp');

  // the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to all app components
module.exports = User;