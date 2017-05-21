import AppDispatcher from '../dispatcher/app';
import AuthConstants from '../constants/AuthConstants';
import AuthAPI from '../services/Auth';

var BASE_URL = 'https://stark-woodland-34890.herokuapp.com/api/';

export default {

  logUserIn: (user) => {
    AuthAPI
      .login(BASE_URL + 'users/login/', user)
      .then((data) => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.LOGIN_USER,
          user: data.username,
          token: data.token
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.AUTH_ERROR,
          message: message
        });
      });
  },

  logUserOut: () => {
    AuthAPI
      .logout(BASE_URL + 'users/logout/')
      .then((data) => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.LOGOUT_USER
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.AUTH_ERROR,
          message: message
        });
      });
  },

  register: (user) => {
    AuthAPI
      .register(BASE_URL + 'users/register/', user)
      .then((data) => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.REGISTER_USER,
          user: data.username,
          token: data.token
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.AUTH_ERROR,
          message: message
        });
      });
  }
};

