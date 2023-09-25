const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(
          `Фильм с указанным _id: ${req.params._id} не найден`,
        );
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('У вас нет прав для удаления данного фильма');
      } else {
        Movie.deleteOne(movie)
          .then((deleteMovie) => {
            res.status(200).send(deleteMovie);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(
                new BadRequestError(
                  `Передан некорректный _id: ${req.params._id}`,
                ),
              );
            } else {
              next(err);
            }
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(`Передан некорректный _id: ${req.params._id}`),
        );
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
