//Asynchronus Code
console.log("Before");
/*getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
      getCommits(repos[0], (commits) => {
        console.log(commits);
      });
    });
});*/


/*getUser(1).then(
    user => getRepositories(user.gitHubUsername).then(
        repos => getCommits(repos[0]).then(
            commits => console.log("Commits",commits)
        )
    )
);*/

/*getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log("Commits",commits))
  .catch(err => console.log("Error",err.message));*/

//Async and Await
async function displayCommits(){
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }
  displayCommits()

console.log('After');


function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Reading a user form database...");
            resolve({id : id, gitHubUsername : "sudzzz"});
        },2000);
    }); 
}

function getRepositories(username){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Fetching repositories from github...")
            resolve(['repo1','repo2','repo3']);
        },2000);
    });
}

function getCommits(repo){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Fetching commits from github repositorty...")
            resolve(['commit1','commit2','commit3']);
        },2000);
    });  
}