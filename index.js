//Asynchronus-Code

console.log("Before");
setTimeout(()=>{
    console.log("Reading a user form database...");
},2000);
console.log('After');

/* Output 
    Before
    After
    Reading a user form database...//after 2 seconds
*/

//Synchronus-Code

console.log("Before");
console.log('After');

/* Output 
    Before
    After
*/
