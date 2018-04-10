var 
  //include all
  express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  app = express(),
  bookController = require('../app/controllers/book');

/* all books routes. */
router.get('/', bookController.findAllBooksAction);
router.get('/:id',  bookController.findBookAction);
router.post('/add', bookController.addBookAction);
router.put('/edit', bookController.updateBookAction);
router.delete('/delete/:id', bookController.deleteBookAction);

module.exports = router;