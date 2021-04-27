const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const path = require('path');

const app = express();
const db = config.get('mongoURI');
const Animal = require('./models/Animals')
const port = 3001;

const animals = [
  'Lion',
  'Monkey',
  'Leopard',
  'Elephant',
  'Pig',
  'Horse',
  'Cat',
  'Dog'
]

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

app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));

app.use(express.json());

app.get('/api', (req, res) => {
  Animal.find()
    .sort({ date: -1 })
    .then(items => console.log(res.json(items)));
});

app.post('/api', (req, res) => {
  const newAnimal = new Animal({
    name: req.body.name,
    isEndangered: Boolean(req.body.isEndangered),
  })

  newAnimal
    .save()
    .then(item => res.json(item));
});

// Delete an entry
app.delete('/api/:id', (req, res) => {
  Animal.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

// Update an entry
app.put('/api/:id', (req, res) => {
  Animal.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});
