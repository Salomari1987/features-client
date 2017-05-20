import AppDispatcher from '../dispatcher/app';
import AuthConstants from '../constants/AuthConstants';
import AuthAPI from '../services/Auth';

export default {

  logUserIn: (user) => {
    AuthAPI
      .login('http://localhost:8000/api/users/login/', user)
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
      .logout('http://localhost:8000/api/users/logout/')
      .then((data) => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.LOGOUT_USER
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.LOGOUT_ERROR,
          message: message
        });
      });
  }
}
