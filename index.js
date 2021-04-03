//Asynchronus Code

console.log("Before");
getUser(1,getRepositories);
console.log('After');

function getRepositories(user){
    const name = user.gitHubUsername;
    getRepositories(name,getCommits);
}

function getCommits(repos){
    const repo = repos[0];
    getCommits(repo,displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}

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