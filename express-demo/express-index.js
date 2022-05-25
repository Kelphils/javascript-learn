const Joi = require("joi");
const helmet = require("helmet");
const express = require("express");
const app = express();
const config = require("config");

// adding a middleware in request processing
app.use(express.json()); // parses req.body if it is a json file
app.use(express.urlencoded({ extended: true })); // parses urlencoded requests
app.use(express.static("public")); // reads static content or assets like css, image or txt which are stored in the public folder in the root of the project and served on the root of the site e.g in the browser localhost:5000/readme.txt

console.log(`NODE ENV: ${process.env.NODE_ENV}`); // This will return undefined if the evironment has not been set by using export NODE_ENV=development in the terminal
if (app.get("env") == "development") {
  app.use(helmet()); // this is a third party middleware to set headers
  console.log("Third party Middleware helmet in use");
}

// Get configuration based on based on environment set, to be used after using npm i config
console.log("Application Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));
console.log("Mail Password:" + config.get("mail.password")); // It is exported as an environment variable

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// making requests with id's, example localhost:port/api/courses/12
app.get("api/courses/:id", (req, res) => {
  res.send(req.params);
});

// making query requests, example localhost:port/api/posts/2018/1?sortBy=name
app.get("api/posts/:month/:year", (req, res) => {
  res.send(req.query);
});

app.get("api/courses/", (req, res) => {
  res.send(courses);
});

app.get("api/courses/:id", (req, res) => {
  // logic to find a specific course that matches a given criteria as it converts the inputed string to a number
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with given Id does not exist");
    return;
  } else {
    res.send(course);
  }
});

// update the values of the courses array by adding an incremented id and name of course
app.post("api/courses", (res, req) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  // "Joi" is a package used to validate input whether is an email or name or password, In this case am using it to validate that the name input is up to 3 characters and that it is also a string
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with given Id does not exist");
    return;
  }
  const { error } = validateCourse(req.body); // destructuring result.error as it 2 properties error and value which is result but we need the error property
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  // update the value with the input of the put request
  course.name = req.body.name;
  res.send(course);
});

app.delete("api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with given Id does not exist");
    return;
  }
  const index = courses.indexOf(course); // find the index of the course in the courses array
  courses.slice(index, 1); //remove course based on the index of the course

  res.send(course);
});

function validateCourse(course) {
  // This function validates each course
  const schema = {
    name: Joi.string().min(3).required(),
  };
  // "Joi" is a package used to validate input whether is an email or name or password, In this case am using it to validate that the name input is up to 3 characters and that it is also a string
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on ${port}...`));
