const express = require('express');
const app = express();
const Animal = require('../models/Animals')

const startServer = (port) => {
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

  app.delete('/api/:id', (req, res) => {
    Animal.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }));
  });

  app.put('/api/:id', (req, res) => {
    Animal.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }));
  });

  app.listen(port, () => console.log(`Server started on port: http://localhost:${port}/api`));
}

module.exports = startServer
