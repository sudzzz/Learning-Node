const Joi = require('joi');
const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const authenticate = require('./authentication');
const app = express();

console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
//If process.env.NODE_ENV is undefined the by default app.get('env') returns development.
console.log(`app : ${app.get('env')}`);

/*Built-In Middleware*/

//This method returns a middleware function. It's job is to read the request
//and if there is a json object in the body of the request, the it will parse
//it to json object and will set "req.body" property.
app.use(express.json());

//Parses the body with key-value pair and populates "req.body" like a json object.
//With extended:true we can pass arrays and complex objects uring url-encoded format.
app.use(express.urlencoded({ extended: true }));   //key=value&key=value

//Public is the name of the folder. In this folder we put all our static assets
//like css, images etc inside this folder.
app.use(express.static('public'));


/*Custom-Middleware*/

//Custom Middleware - next() is used to pass control to next middlewae function in pipeline.
//Whenever we create custom middleware, keep it in seperate files/modules for clean coding practices.
app.use(logger);

app.use(authenticate);

/*Third-Party Middleware*/

app.use(helmet());

//"morgan" is a HTTP request logger middleware for node.js
//It logs every request made in the console
//Here we are checking the envoirment of node appilcation
//If it is in development enviorment then we are logging every request in console
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log("Morgan enabled...");
}


const courses = [
    {
        id : 1,
        name : "course1"
    },
    {
        id : 2,
        name : "course2"
    },
    {
        id : 3,
        name : "course3"
    },
]

app.get('/',(req,res)=>{
    res.send("Hello World");
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with given id is not found");
    res.send(course);
});

app.post('/api/courses',(req,res)=>{
   /* const schema = {
        name : Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body,schema);
    //console.log(result);
    if(!req.body.name || req.body.name.length<3){
        //400 Bad Request
        res.status(400).send("Name is required and should be minimum 3 charachters");
        return;
    }
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }*/
    const { error } = validateCourse(req.body);//Equivalent to result.error

    if(error) return res.status(400).send(error.details[0].message);
    const course = {
        id : courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id',(req,res)=>{
    //Look up the course
    //If not existing, return 404 - Not Found
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with given id is not found");
    
    //Validate
    //If invalid, return 400 - Bad Request
    /*const schema = {
        name : Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body,schema)*/

    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);//Equivalent to result.error


    if(error) return res.status(400).send(error.details[0].message);

    //Update course
    //Return the updated course
    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id',(req,res)=>{
    //Look up the course
    //Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with given id is not found"); 

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //Return the same course
    res.send(course);
})

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(course,schema)
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});