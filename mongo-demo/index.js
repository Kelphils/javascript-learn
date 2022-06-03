const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/learndb")
  .then(() => console.log("Connected to Mongodb...."))
  .catch((err) => console.error("Error connecting to Mongodb....", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "Ruby Course",
    author: "Kelvin",
    tags: ["node", "frontend"],
    isPublished: false,
    price: 20,
  });
  const result = await course.save();
  console.log(result);
};

// filter courses
async function getCourse() {
  // const courses = await Course.find({ author: "Kelvin", isPublished: true })
  const courses = await Course.find()
    .or([{ author: "Kelvin" }, { isPublished: true }])
    // const courses = await Course.find({ price: { $gt: 5, $lte: 10 } })
    // const courses = await Course.find({ price: { $in: [5, 10, 14.99] } })
    // const courses = await Course.find({ price: { $in: [5, 10, 14.99] } })
    .limit(5)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function testGetCourse() {
  // query based on author starting with Kelvin using regex
  const courses = await Course.find({ author: /^Kelvin/ })
    // query based on author ending with phillip and case insensitive using regex
    // .find({ author: /Phillip$/i })
    // query based on author that contains kelvin and case insensitive using regex
    // .find({ author: /^.*kelvin.*/i })
    .sort({ name: 1 })
    // get no of courses that match the query
    .count();
  console.log(courses);
}
testGetCourse();

// Query strings
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in
// nin (not in)

// query operators
// or
// and

// add two numbers
// const add = (a, b) => a + b;
