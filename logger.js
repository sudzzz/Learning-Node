
console.log(__filename);
console.log(__dirname);
var url = "http://mylogger.io/log";

function log(message){
    //Send an HTTP request
    console.log(message);
}

//Exports log function
module.exports = log;

//exports variable url
//module.exports.endPointUrl = url;