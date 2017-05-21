import keyMirror from 'keymirror';
var BASE_URL = 'localhost:8000/api/users/';

export default keyMirror({
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  REGISTER_USER: 'REGISTER_USER',
  AUTH_ERROR: 'AUTH_ERROR'
});