import request from 'superagent/lib/client';
import AuthStore from '../stores/AuthStore';

export default {

  login: (url, user) => {
    return new Promise((resolve, reject) => {
      request
        .post(url)
        .send({username: user.username, password: user.password})
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            reject(JSON.parse(response.text));
          } else {
            resolve(JSON.parse(response.text));
          }
        });
    });
  },

  logout: (url) => {
    return new Promise((resolve, reject) => {
      request
        .post(url)
        .set('Authorization', 'Token ' + AuthStore.getJwt())
        .end((err, response) => {
          if (err) {
            reject(JSON.parse(response.text));
          } else {
            resolve('success');
          }
        });
    });
  },

  register: (url, user) => {
    return new Promise((resolve, reject) => {
      /*eslint-disable camelcase*/
      request
        .post(url)
        .send({username: user.username, password: user.password, email: user.email, confirm_password: user.confirm_password})
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) {
            reject(JSON.parse(response.text));
          } else {
            resolve(JSON.parse(response.text));
          }
        });
      /*eslint-enable camelcase*/
    });
  }
};
