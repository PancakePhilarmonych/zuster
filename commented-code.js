// animals.forEach(animal => {
//   const newAnimal = new Animal({
//     name: animal,
//     isEndangered: Math.random() < 0.5
//   })

//   newAnimal
//     .save()
//     .then((item) => console.log(item))
//     .catch((err) => console.log(err));
// })

// Animal.find()
//   .sort({ date: -1 })
//   .then(items => console.log(items));

// Animal
//   .findOneAndUpdate(
//     { _id: '608458b47b859c34df08900a' },
//     { isEndangered: false }
//   )
//   .then(item => console.log(item));