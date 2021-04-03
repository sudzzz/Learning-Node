const p = Promise.resolve({id : 1});
p.then(result => console.log(result));

const q = Promise.reject(new Error("reason for Rejection..."));
q.catch(err => console.log(err.message));

const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("Async Operation 1...");
        resolve(1);
        //reject(new Error("Because something failed"))
    },2000);
});

const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log("Async Operation 2...");
        resolve(2);
    },2000);
});

//If one of the promise is rejected then Promise.all is also rejected
Promise.all([p1,p2])
  .then(result => console.log(result))
  .catch(err => console.log(err.message));

//As soon as one promise in this array is fulfilled,the promise that is
//returned from race method is considered fullfilled.
Promise.race([p1,p2])
 .then(result => console.log(result))
 .catch(err => console.log(err.message));