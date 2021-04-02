const EventEmitter = require('events');

var url = "https://www.google.com";

class Logger extends EventEmitter {
    log(message){
        console.log(message);
        //Raise an event
        this.emit('messageLogged',{id: 1,url: 'https://www.google.com'});
    }
}

module.exports = Logger;