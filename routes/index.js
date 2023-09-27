const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const signup = require('./signup');
const signin = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', signup);
router.use('/signin', signin);
router.use(auth);
router.use('/users', users);
router.use('/movies', movies);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
