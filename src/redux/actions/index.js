// Coloque aqui suas actions
import getAPIRequest from '../../helpers/getAPIRequest';

export const LOGIN = 'LOGIN';

export const userlogin = (email) => ({
  type: LOGIN,
  email,
});

export const SET_DATA = 'SET_DATA';

export const setCurrencyAPIData = (data) => ({
  type: SET_DATA,
  data,
});

export const REQUEST_FAIL = 'REQUEST_FAIL';

export const requestCurrencyAPIFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const fetchAPI = () => async (dispatch) => {
  try {
    // fetch api
    const data = await getAPIRequest();
    dispatch(setCurrencyAPIData(data));
  } catch (error) {
    dispatch(requestCurrencyAPIFail(error));
  }
};

export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveExpense = (payload) => async (dispatch) => {
  const data = await getAPIRequest();
  dispatch({
    type: SAVE_EXPENSE,
    payload: { ...payload, exchangeRates: data },
  });
};

export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const updateExpense = (newExpanseArr) => ({
  type: UPDATE_EXPENSE,
  newExpanseArr,
});

export const EDIT_TABLE = 'EDIT_TABLE';

export const editTable = (idToEdit) => ({
  type: EDIT_TABLE,
  idToEdit,
});

export const END_EDITING = 'END_EDITING';

export const endEditing = () => ({
  type: END_EDITING,
});
