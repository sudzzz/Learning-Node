const Joi = require('joi');
const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authentication');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.set('view engine','pug');
app.set('views','./views'); //default

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

/*Routes calling*/

app.use('/',home);

//Any routes that start with '/api/courses' will be handeled by route which is
//imported from course.js
app.use('/api/courses',courses);

//"morgan" is a HTTP request logger middleware for node.js
//It logs every request made in the console
//Here we are checking the envoirment of node appilcation
//If it is in development enviorment then we are logging every request in console
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug("Morgan enabled...");
}


/*Configuration*/
console.log("Application Name : "+config.get('name'));
console.log("Mail Sever : "+config.get('mail.host'));
console.log("Mail Sever Password: "+config.get('mail.password'));

//Db work
//dbDebugger("Connected to Database...");

//PORT
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});