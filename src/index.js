import "./styles/main.css";
import {
  submitProject,
  submitTask,
  createDefaultProject,
  createDefaultTask,
} from "./create";

/***Project Related Code***/

createDefaultProject();

// provides text input for user to type name of new project
document
  .querySelector(".add-project-btn")
  .addEventListener("click", function (e) {
    document.querySelector(".project-header").hidden = true;
    document.querySelector(".add-project-form").hidden = false;
  });

// creates a new project when user clicks '+' button
document
  .querySelector(".submit-new-project-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    submitProject();
  });

// creates a new project when user hits enter
document
  .getElementById("add-project-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitProject();
    }
  });

/***Task Related Code***/

for (let i = 0; i < 3; i++) {
  createDefaultTask(i + 1);
}

// provides form for inputting new task
document.querySelector(".add-task-btn").addEventListener("click", function (e) {
  document.querySelector(".add-task-btn").hidden = true;
  document.querySelector(".add-task-form").hidden = false;
});

// creates new task when user clicks '+' button
document
  .querySelector(".submit-new-task-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    submitTask();
  });

document
  .querySelector(".add-task-form")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
