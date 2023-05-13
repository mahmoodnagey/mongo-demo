const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')   // local host will be changed to the server database in production, should use Configurations
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
  
// creating a schema
const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   tags: [String],
   date: {type: Date, default: Date.now()},
   isPublished: Boolean 
});

// compile the schema into a model to have a class
const Course = mongoose.model('Course', courseSchema);

// create a new instance / object / document from the Course Class

// To save our document in the database => we use .save() method
// save method returns a promise and it's a synchronous operation
// so to use await, we need to wrap our code in async function

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mahmoud',
        tags: ['angular', 'frontend'],
        isPublished: true 
     });
     
     const result = await course.save();
     console.log(result);
}

// Function to get courses
async function getCourses() {
    const courses = await Course
        .find()
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1, author: 1});
    console.log(courses);
}

// Update course
async function updateCourse(id) {
    const course = await Course.findById(id);
    if(!course) return;
    
    course.isPublished = true;
    course.author = 'Another Author';
    
    const result = await course.save();
    console.log(result);
}

// updateCourse('645f529d1b3b0472ee1e1445');

getCourses();



