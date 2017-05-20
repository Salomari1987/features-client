import AppDispatcher from '../dispatcher/app';
import AuthConstants from '../constants/AuthConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

function setUser(user, token) {
  localStorage.setItem('user', user);
  localStorage.setItem('token', token)
}

function removeUser() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

class AuthStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
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
}

const AuthStore = new AuthStoreClass();

AuthStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case AuthConstants.LOGIN_USER:
      setUser(action.user, action.token);
      AuthStore.emitChange();
      break;

    case AuthConstants.LOGOUT_USER:
      removeUser();
      AuthStore.emitChange();
      break;

    default:
       break;
  }

});

export default AuthStore;
