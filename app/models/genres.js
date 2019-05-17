const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  id: Number,
  name: String,
  isRated: Boolean
})

const Genre = new mongoose.model('Genre', genreSchema)

const get = async () => {
  const genres = await Genre
    .find()
    .sort({ id: 1 })
  return genres
}

const create = async (payload) => {
  const genre = new Genre(payload)
  const result = await genre.save()
  return result
}

const update = async (id, payload) => {
  const genre = Genre.updateOne(
    { 'id': id },
    { $set: payload },
    { returnNewDocument: true,
      upsert: true }
  )
  return genre
}

const del = async (id) => {
  const genre = Genre.deleteOne({ 'id': id })
  return genre
}

module.exports.get = get
module.exports.create = create
module.exports.update = update
module.exports.del = del
