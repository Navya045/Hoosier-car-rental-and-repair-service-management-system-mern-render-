import mongoose from 'mongoose';

// Define a schema for your collection
const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
});

// Create a model based on the schema
const Person = mongoose.model('Person', personSchema);

// Establish a connection
const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://navyajyesta:Testdb987@cluster0.encha7k.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');
    
    // Insert data
    const newPerson = new Person({
      firstName: 'Niveditha',
      lastName: 'BP',
      age: 26,
    });

    await newPerson.save();
    console.log('Data inserted successfully');
    
    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

start();