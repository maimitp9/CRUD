var Auth = require('../controllers/authController');
module.exports = (router) => {
  router.post('/login', Auth.login)
  router.post('/user', Auth.getUserByAuth)
}