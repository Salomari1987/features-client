import AppDispatcher from '../dispatcher/app';
import AuthConstants from '../constants/AuthConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var setUser = function (user, token) {
  localStorage.setItem('user', user);
  localStorage.setItem('token', token);
};

var removeUser = function () {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

class AuthStoreClass extends EventEmitter {
  constructor() {
    super();
    this._errors = [];
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getUser() {
    return localStorage.getItem('user');
  }

  getJwt() {
    return localStorage.getItem('token');
  }

  parseErrors(errorMessages) {
    this._errors = Object.keys(errorMessages).map((key, i) => {
      return key + ': ' + errorMessages[key][0];
    });
  }
}

const AuthStore = new AuthStoreClass();

AuthStore.dispatchToken = AppDispatcher.register(action => {
  switch (action.actionType) {
  case AuthConstants.LOGIN_USER:
    setUser(action.user, action.token);
    AuthStore.emitChange();
    break;

  case AuthConstants.LOGOUT_USER:
    removeUser();
    AuthStore.emitChange();
    break;

  case AuthConstants.REGISTER_USER:
    setUser(action.user, action.token);
    AuthStore.emitChange();
    break;

  case AuthConstants.AUTH_ERROR:
    AuthStore.parseErrors(action.message);
    AuthStore.emitChange();
    break;

  default:
    break;
  }
});

export default AuthStore;