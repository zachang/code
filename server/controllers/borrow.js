import * as _ from 'underscore';
import db from '../models';

const Borrow = db.Borrow;
const Book = db.Book;

const borrowController = {
  create(req, res) {
    const obj = req.body;
    const params = req.params;
    return Borrow.findAll({ where: { user_id: params.userId, book_id: obj.book_id, returned: 'false' } })
      .then((found) => {
        if (found.length) return res.status(403).send({ message: 'You have not returned the previous book you borrowed' });
        return Book.findById(obj.book_id);
      })
      .then((book) => {
        if (!book) {
          return res.status(404).send({ message: 'Book not found' });
        }
        if (!book.is_available) {
          return res.status(404).send({ message: 'Book not available' });
        }
        if (book.count_borrow >= book.book_count) {
          return res.status(404).send({ message: 'All books have been borrowed' });
        }

        return Borrow.create({
          user_id: params.userId,
          book_id: req.body.book_id,
          borrow_date: new Date(),
          expected_return: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)),
          collection_date: new Date()
        });
      })
      .then((borrow) => {
        return Book.findById(borrow.book_id);
      })
      .then((book) => {
        const count = book.count_borrow;
        const update = { count_borrow: count + 1 };
        return book.update(update);
      })
      .then(updated => res.status(200).send({ message: 'Borrow completed', updated }))
      .catch(() => res.status(503).send({ message: 'Borrow failed' }));
  },
  returnBook(req, res) {
    const obj = req.body;
    const params = req.params;
    return Book.findById(obj.book_id)
      .then((found) => {
        if (!found) return res.status(404).send({ message: 'Book not found' });
        const update = { returned: 'pending', actual_return: new Date() };
        return Borrow.update(update, { where: { user_id: params.userId, book_id: obj.book_id, returned: 'false' } });
      })
      .then((updatedCount) => {
        if (updatedCount > 0) {
          return Book.findById(obj.book_id);
        }
      })
      .then((book) => {
        const counts = book.count_borrow - 1;
        return book.update({ count_borrow: counts });
      })
      .then((updateBook) => {
        res.status(200).send({ message: 'return completed', updateBook });
      })
      .catch(() => res.status(503).send({ message: 'request not available' }));
  },
  borrowsByUser(req, res) {
    const params = req.params;
    return Borrow.findAll({
      where: { user_id: params.userId, returned: req.query.returned },
      include: [{
        model: Book
      }]
    })
      .then((borrows) => {
        const books = _.pluck(borrows, 'Book');
        return res.status(200).send(books);
      })
      .catch(() => res.status(503).send({ message: 'Request not available' }));
  }
};

export default borrowController;