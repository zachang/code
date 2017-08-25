import db from '../../models';

const Book = db.Book;

const bookseeder = {
  emptyBookTable(done) {
    Book.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setBookData(book_name, author, category_id, publish_year, isbn, pages, book_count, book_image) {
    return {
      book_name,
      author,
      category_id,
      publish_year,
      isbn,
      pages,
      book_count,
      book_image
    };
  },
  setUpdateBookData(book_name, author, category_id, publish_year, isbn, pages, book_count, book_image, is_available) {
    return {
      book_name,
      author,
      category_id,
      publish_year,
      isbn,
      pages,
      book_count,
      book_image,
      is_available
    };
  },
  addBookToDb(done) {
    Book.create({
      book_name: 'Brave Heart',
      author: 'Townsend Jnr',
      category_id: 1,
      publish_year: new Date('1991/08/06'),
      isbn: 'ISBN43333334',
      pages: 506,
      book_count: 2,
      book_image: 'brave.jpg'
    })
      .then(() => done())
      .catch(err => done(err));
  },
};

export default bookseeder;