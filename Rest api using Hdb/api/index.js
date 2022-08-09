const db = require('../config/db_config');

exports.addBook = (request, response) => {
    db.insert(
      {
        table: 'books',
        records: [
          {
            title: request.body.title,
            author: request.body.author
          }
        ]
      },
      (err, res) => {
        if (err) response.status(500).json(err);
  
        response.status(res.statusCode).json(res.data);
      }
    );
  };

  exports.getByAuthor = (request, response) => {
    db.searchByValue(
      {
        table: 'books',
        searchAttribute: 'author',
        searchValue: request.body.author,
        attributes: ['*']
      },
      (err, res) => {
        if (err) response.status(500).json(err);
  
        console.log(res);
  
        response.status(res.statusCode).json(res.data);
      }
    );
  };


  exports.getById = (request, response) => {
    db.searchByHash(
      {
        table: 'books',
        hashValues: [request.body.id],
        attributes: ['title']
      },
      (err, res) => {
        if (err) response.status(500).json(err);
  
        response.status(res.statusCode).json(res.data);
      }
    );
  };

  exports.deleteBook = (request, response) => {
    db.delete(
      {
        table: 'books',
        hashValues: [request.body.id]
      },
      (err, res) => {
        if (err) response.status(500).json(err);
  
        response.status(res.statusCode).json(res);
      }
    );
  };