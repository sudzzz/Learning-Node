//Asynchronus Code

console.log("Before");
getUser(1,(user)=>{
    //console.log("User ",user);
    const name = user.gitHubUsername;
    getRepositories(name,(repos)=>{
        //console.log("Repositories ",repos);
        const repo = repos[0];
        getCommits(repo,(commits)=>{
            //CALLBACK HELL
            console.log("Commits",commits);
        });
    });
});
console.log('After');


//Synchronus Code
console.log("Before");
const user = getUser(1);
const repos = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);
console.log(commits);
console.log("After");



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

function getCommits(repo,callback){
    setTimeout(()=>{
        console.log("Fetching commits from github repositorty...")
        callback(['commit1','commit2','commit3']);
    },2000);
}