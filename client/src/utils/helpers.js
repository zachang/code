import jwt_decode from 'jwt-decode';
import { browserHistory } from 'react-router';

const decodeToken = (token) => {
  return jwt_decode(token);
};

const redirectIfLoggedIn = (token) => {
  const decodedToken = jwt_decode(token);
  if (!decodedToken.is_admin) {
    browserHistory.push('/user');
  } else {
    browserHistory.push('/admin');
  }
};

const tokenValidate = (type) => {
  if (type === 'invalid') {
    window.sessionStorage.removeItem('token');
    browserHistory.push('/');
  } else if (type === 'unauthorized') {
    // unauthorize component
    browserHistory.push('/');
  }
};

export {
  decodeToken,
  tokenValidate,
  redirectIfLoggedIn
};
