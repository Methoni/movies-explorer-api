const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  editUserData,
  getMyUser,
} = require('../controllers/users');

router.get('/me', getMyUser);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email(),
      name: Joi.string().min(2).max(30),
    }),
  }),
  editUserData,
);

module.exports = router;
