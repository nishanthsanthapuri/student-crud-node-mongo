const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

// Route to list all students
router.get("/", (req, res) => {
  res.render("student/addOrEdit", {
    viewTitle: "Insert Student",
  });
});

// Route to handle form submission for adding or updating a student
router.post("/", async (req, res) => {
  if (req.body._id == "") {
    await insertRecord(req, res);
  } else {
    await updateRecord(req, res);
  }
});

// Function to insert a new student record
async function insertRecord(req, res) {
  try {
    var student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;

    await student.save();
    res.redirect("/student/list");
  } catch (err) {
    console.log("Error during record insertion:", err);
  }
}

// Function to update an existing student record
async function updateRecord(req, res) {
  try {
    await Student.findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
    });
    res.redirect("/student/list");
  } catch (err) {
    console.log("Error during record update:", err);
  }
}

// Route to list all students
router.get("/list", async (req, res) => {
  try {
    const docs = await Student.find();
    res.render("student/list", {
      list: docs,
    });
  } catch (err) {
    console.log("Error in retrieving student list:", err);
  }
});
// Route to get a student by ID for editing
router.get("/:id", async (req, res) => {
  try {
    const doc = await Student.findById(req.params.id);
    res.render("student/addOrEdit", {
      viewTitle: "Update Student",
      student: doc,
    });
  } catch (err) {
    console.log("Error in retrieving student:", err);
  }
});

// Route to delete a student by ID
router.get("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/student/list");
  } catch (err) {
    console.log("Error in student delete:", err);
  }
});

module.exports = router;
