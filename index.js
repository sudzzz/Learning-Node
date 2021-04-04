const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(()=> console.log("Connected to MongoDb..."))
  .catch(err => console.error("Could not connect to MongoDb...",err));

const courseSchema = new mongoose.Schema({
    name : {type : String, required : true,minlength : 5},
    author : String,
    tags : {
        type : Array,
        //Custom Validator
        validate : {
            validator: function(v){
                return v && v.length > 0; 
            },
            message : "A course should have atleast one tag."
        }
    },
    date : { type: Date, default : Date.now},
    isPublished : Boolean,
    price : {
        type : Number,
        //arrow function i.e. "=>" is not valid as "this" keyword is not present.
        required : function(){return this.isPublished;},//If isPublished is true then price field is required.
        min : 10,
        max : 200
    }
});

const Course = mongoose.model('Course',courseSchema);

//CREATE
async function createCourse(){
    const course = new Course({
        name : "Angular Course",
        author : "Mosh",
        tags : ['angular','frontend'],
        isPublished : true,
        price : 15
    });
    try{
        const result = await course.save();
        console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
    
}
createCourse();


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

        //selects book with price between 10 and 20
        //.find({price : {$gte : 10, $lte : 20}})

        // select book with price either 10,15 or 20
        //.find({price : { $in : [10,15,20] } })

        //Logical or/and
        //.find()
        //.or([{author : "Mosh"},{isPublished : true}])//parameter is array of objects. If any of the object in array is true it returns true
        //.and([{name: "NodeJs Course"}])//array of filter objects, if all objects are true, it returns true
        
        //Regular expressions
        // syntax for representing regular expression -> "/pattern/"
        // represents strings that starts with  Mosh = "/^Mosh/"
        .find({author : /^Mosh/})

        // represents strings that ends with Hamedani = "/Hamedani$/"
        //If we append "i at the end then it becomes case sensitive"
        .find({author : /Hamedani$/i})

        // represents strings that contains the word Mosh = "/.*Mosh.*/"
        .find({author : /.*Mosh.*/})
        .limit(10)
        .sort({name : 1}) //Sorts name => 1 = ascending, -1 = descending
        .select({name : 1, tags : 1}) // selects the feild to display. 1=display,0=don't display

    
    
    console.log(courses);
    console.log(course1);
    console.log(course2);
}
//getCourses();


async function updateCourse(id){
    /*
    Approch - Query First
    1. findById()
    2. Modify Properties
    3. save() 
    */
   const course = await Course.findById(id);
   if(!course) return;
   //course.isPublished = true;
   //course.author = "Sudhir Daga"

   //OR

   /*course.set({
       isPublished : true,
       author : "Sudhir Daga"
   });

   const result = await course.save();
   console.log(result);*/

    /*
    Approach - Update First
    Update Directly
    Get the updated document(optional)
    */
   //Only updates the document
   
   /*const res = await Course.update({_id: id},{
       $set:{
        author : "Mosh",
        isPublished : "false"
       }
   });
   console.log(res);*/

   //Updates And Returns the document
   const res = await Course.findByIdAndUpdate({_id: id},{
    $set:{
     author : "Mosh",
     isPublished : true
    }
},{new: true});
console.log(res);
}
//updateCourse('6069abc0a2912d625034e1a2');

async function deleteCourse(id){
   const result = await Course.deleteOne({_id : id});
   console.log(result);

   //Similarly we can have Course.findByIdAndRemove()
}
//deleteCourse('6069abc0a2912d625034e1a2');