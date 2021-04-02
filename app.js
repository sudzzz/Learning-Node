const fs = require('fs');

const files = fs.readdirSync('./');
console.log(files);

fs.readdir('./',function(err,filesAsync){
    if(err)
    {
        console.log(`Error : ${err}`);
    }
    else
    {
        console.log(`Result : ${filesAsync}`);
    }
});