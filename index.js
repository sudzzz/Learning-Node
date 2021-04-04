const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(()=> console.log("Connected to MongoDb..."))
  .catch(err => console.error("Could not connect to MongoDb...",err));

const courseSchema = new mongoose.Schema({
    name : String,
    author : String,
    tags : [ String ],
    date : { type: Date, default : Date.now},
    isPublished : Boolean
});

const Course = mongoose.model('Course',courseSchema);

//CREATE
async function createCourse(){
    const course = new Course({
        name : "Angular Course",
        author : "Mosh",
        tags : ['angular','frontend'],
        isPublished : true
    });
    
    const result = await course.save();
    console.log(result);
}
//createCourse();


//READ
async function getCourses(){
    //Comparison Operators
    /*
    eq (equal to)
    ne (not equal to)
    gt (greater than)
    gte (greater than or equal to)
    lt (less than)
    lte (less than or equal to)
    in
    nin (not in)
    */

    //Logical Operators
    /*
    or
    and
     */

    //Display every document
    const courses = await Course.find();
    //Display document with filter
    const course1 = await Course.find({name : "NodeJs Course"});
    //Display document with filter and other stuffs
    const course2 = await Course
        //.find({author : "Mosh", isPublished : true})
        //.find({price : {$gte : 10, $lte : 20}})//selects book with price between 10 and 20
        //.find({price : { $in : [10,15,20] } })// select book with price either 10,15 or 20
        .find()
        .or([{author : "Mosh"},{isPublished : true}])//parameter is array of objects. If any of the object in array is true it returns true
        .and([{name: "NodeJs Course"}])//array of filter objects, if all objects are true, it returns true
        .limit(10)
        .sort({name : 1}) //Sorts name => 1 = ascending, -1 = descending
        .select({name : 1, tags : 1}) // selects the feild to display. 1=display,0=don't display

    
    
    console.log(courses);
    console.log(course1);
    console.log(course2);
}
getCourses();
