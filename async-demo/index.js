console.log("Before");
console.log("After");

let firstFunction = () => {
  return new Promise((resolve, reject) => {
    resolve("Your cat is ");
  });
};

let secondFunction = (dataFromFirstFunction) => {
  return new Promise((resolve, reject) => {
    resolve(dataFromFirstFunction + "Crazy");
  });
};

firstFunction()
  .then((data) => {
    return secondFunction(data);
  })
  .then((data) => console.log(data))
  .catch((error) => console.log("error", error));

const p = new Promise((resolve, reject) => {
  // Kickoff async work
  setTimeout(() => {
    resolve(1); // pending => resolved or rejected
    reject(new Error("message")); // pending => rejected
  }, 2000);
});

p.then((result) => console.log("Result", result)).catch((err) =>
  console.log(err.message)
);

function getUser(id) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Reading user from database....");
      resolve({ id: id, githubUsername: "Kelvin" }); // pending => resolved or rejected
    }, 2000)
  );
}

function getRepositories(username) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Getting Repositories from github API....");
      //reject(new Error("could not get repos"));
      resolve(["repo1", "repo2", "repo3", "repo4"]); // pending => resolved or rejected
    }, 2000)
  );
}

function getCommits(repo) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Getting Commits from github repos....");
      resolve(["Commit1"]); // pending => resolved or rejected
    }, 2000)
  );
}

const printPromise = getUser(12);
printPromise
  .then((user) => getRepositories(user.githubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log(commits))
  .catch((err) => console.log(err.message));

const p1 = new Promise((resolve, reject) => {
  console.log("Async event running first task...");
  resolve({ id: 2 });
});

const p2 = new Promise((resolve, reject) => {
  console.log("Async event running second task...");
  resolve({ age: 33 });
});

// run promises in parallel
Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));
