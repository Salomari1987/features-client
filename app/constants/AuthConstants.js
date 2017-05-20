import keyMirror from 'keymirror';
var BASE_URL = 'localhost:8000/api/users/';

export default keyMirror({
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  UPDATE_USERNAME: 'UPDATE_USERNAME',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD'
});