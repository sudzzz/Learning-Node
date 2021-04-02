const EventEmitter = require('events');



//Making a noise, producing a signal that an event has occured.
//Raise an event
//emitter.emit('messageLogged',{id: 1,url: 'https://www.google.com'});

const Logger = require('./logger');
const logger = new Logger();

//Register a listener
logger.on('messageLogged',function(arg){//e, eventArg
    console.log("Listener Called",arg);
});

logger.log('message');