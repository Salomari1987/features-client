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
            alert(err)
          } else {
            resolve(JSON.parse(response.text));
          }
        })
    });
  },

  logout: (url) => {
    return new Promise((resolve, reject) => {
      request
        .post(url)
        .set('Authorization', 'Token ' + AuthStore.getJwt())
        .end((err, response) => {
          if (err) {
            alert(err);
          } else {
            resolve('success')
          }
        })
    });
  },
}
