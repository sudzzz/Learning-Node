console.log("Before");
getUser(1,(user)=>{
    const name = user.gitHubUsername;
    getRepositories(name,(repo)=>{
        console.log("Repositories ",repo);
    });
});
console.log('After');

function getUser(id,callback){
    setTimeout(()=>{
        console.log("Reading a user form database...");
        callback({id : id, gitHubUsername : "sudzzz"});
    },2000);
}

function getRepositories(username,callback){
    setTimeout(()=>{
        console.log("Fetching repositories from github...")
        callback(['repo1','repo2','repo3']);
    },2000);
}