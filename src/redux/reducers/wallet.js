// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EDIT_TABLE, REQUEST_FAIL, SAVE_EXPENSE, SET_DATA, UPDATE_EXPENSE, END_EDITING,
} from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  cotation: {},
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isEditing: false,
  elementToEdit: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case END_EDITING:
    return {
      ...state,
      isEditing: false,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.payload,
      }],
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: action.newExpanseArr,
    };
  case SET_DATA:
    return {
      ...state,
      currencies: Object.keys(action.data),
      cotation: action.data,
      loading: false,
      error: '',
    };
  case REQUEST_FAIL:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case EDIT_TABLE:
    return {
      ...state,
      idToEdit: action.idToEdit,
      isEditing: true,
    };
  default:
    return state;
  }
};
export default walletReducer;
