import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  errors: null,
  fails: null,
  books: [],
  book: null
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDBOOK_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        fails: null
      };
      break;
    case actionTypes.ADDBOOK_VALIDATION_ERROR:
      state = {
        ...state,
        success: false,
        errors: action.payload
      };
      break;
    case actionTypes.ADDBOOK_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload
      };
      break;
    case actionTypes.UPDATEBOOK_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        fails: null
      };
      break;
    case actionTypes.UPDATEBOOK_VALIDATION_ERROR:
      state = {
        ...state,
        success: false,
        errors: action.payload
      };
      break;
    case actionTypes.UPDATEBOOK_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload
      };
      break;
    case actionTypes.GETBOOKS_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        books: action.payload
      };
      break;
    case actionTypes.GETBOOKS_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload,
        books: null
      };
      break;
    case actionTypes.GETONEBOOK_SUCCESSFUL:
    state = {
      ...state,
      success: true,
      errors: null,
      book: action.payload
    };
    break;
    case actionTypes.GETONEBOOK_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.payload,
        book: null
      };
      break;
    case actionTypes.DELETE_BOOK_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        fails: null,
        books: state.books.filter((book) =>
          book.id !== action.payload
        )
      };
      break;
    case actionTypes.DELETE_BOOK_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default bookReducer;