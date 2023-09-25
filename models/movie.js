const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
    },
    director: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
    },
    duration: {
      type: Number,
      required: [true, 'Необходимо заполнить поле'],
    },
    year: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
    },
    description: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
    },
    image: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Необходимо заполнить поле'],
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Необходимо заполнить поле'],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Необходимо заполнить поле'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true],
    },
    movieId: {
      type: Number,
      required: [true, 'Необходимо заполнить поле'],
    },
    nameRU: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
    },
    nameEN: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
