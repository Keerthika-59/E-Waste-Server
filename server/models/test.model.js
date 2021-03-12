
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is not Specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

//creating model
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "badam",
    rating: 9,
    review: "dry fruit"
});

//create
fruit.save();

const papaya = new Fruit({
    name: "papaya",
    rating: 8,
    review: "tastes good"
});
const watermelon = new Fruit({
    name: "watermelon",
    rating: 6,
    review: "tastes sour"
});


//read

const dragon = new Fruit({
    name: "tomato",
    rating: 9,
    review: "tomato"
});

dragon.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "anurag",
    age: 25,
    favFruit: dragon
});
person.save();