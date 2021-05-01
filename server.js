const mongoose = require('mongoose');
const config = require('config');
const animalApiServer = require('./animalApi/animalApiServer')
const chatServer = require('./chatServer/chatServer')

const db = config.get('mongoURI');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

mongoose
  .connect(db, connectionOptions)
  .then(() => console.log('MongoDB connected...'))
  .catch((error) => console.log(error))

  chatServer(3002)
  animalApiServer(3001)
