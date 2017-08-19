import db from '../../models';

const User = db.User;

module.exports = {
  emptyDB(done) {
    User.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setData(fullname, username, email, phone_no, password, confirmPassword) {
    return {
      fullname,
      username,
      email,
      phone_no,
      password,
      password_confirmation: confirmPassword
    };
  },
  setLoginData(username, password) {
    return { username, password };
  },
  addUserToDb(done) {
    User.create({
      fullname: 'Eben Dawuda',
      username: 'ebenezer',
      email: 'eben@gmail.com',
      phone_no: '08075568940',
      password: 'password',
      level: 'silver' })
      .then(user => done())
      .catch(err => done(err));
  },

  addAdminToDb(done) {
    User.create({
      fullname: 'Eben Dawuda',
      username: 'ebenezer',
      email: 'eben@gmail.com',
      phone_no: '08075568940',
      password: 'password',
      is_admin: true,
      level: 'silver' })
      .then(user => done())
      .catch(err => done(err));
  }
};
