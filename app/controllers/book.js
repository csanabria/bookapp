var 
    //includes all
    Book = require('../models/book');


module.exports.addBookAction = function (req, res) {
    Book.create({
        title: req.body.title,
        author: req.body.author,
        excerpt: req.body.excerpt,
        domain: req.body.domain
    }, 
    function (err, book) {
        if (err) return res.status(500).json(err);
        res.json({status: true, message:"Book saved successfully."});
    });
};

/* GET single book listing. */
module.exports.findBookAction = function(req, res, next) {
    // get the book, id belongs to.
    Book.find({ _id:req.params.id}, function(err, book) {
        if (err) throw err;
        res.json(book)
    });  
};

/* GET books listing. */
module.exports.findAllBooksAction =  function(req, res, next) {
    // get all the books
    Book.find({}, function(err, books) {
        if (err) res.status(500).json(err);
        res.json(books)
    }); 
};

module.exports.updateBookAction =   function (req, res) {
    Book.findOne({ _id:req.body.id}, 
        function (err, book) {
            if (err) return res.status(500).json(err);
            book.title = req.body.title;
            book.author = req.body.author;
            book.excerpt = req.body.excerpt;
            book.domain = req.body.domain;
            book.save(function(err) {
                 if (err) throw err;
                return res.status(200).send("Book updated succcessfully.");
              });
        }
    );
};

module.exports.deleteBookAction =   function (req, res) {
    Book.deleteOne({ _id:req.params.id},
        function (err, book) {
            if (err) return res.status(500).json(err);
            res.json({status: true, message:"Book deleted successfully."});
        }
    );
};

