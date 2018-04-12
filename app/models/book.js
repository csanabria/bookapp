var 
  //include all
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
var bookSchema = new Schema({
  title: { type: String, unique: true, required: [true, 'Title cannot be blank.'] },
  author: { type: String, required: [true, 'Author cannot be blank.'] },
  domain: String,
  excerpt: String,
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
bookSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
var Book = mongoose.model('Book', bookSchema);

// make this available to all app components
module.exports = Book;