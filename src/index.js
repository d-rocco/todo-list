import "./styles/main.css";
import {
  submitProject,
  submitTask,
  createDefaultProject,
  createDefaultTask,
} from "./create";
import {
  loadProjects,
  createAccount,
  logout,
  monitorAuthState,
  signAccountIn,
} from "./storage";
import { doc } from "firebase/firestore";

/***Project Related Code***/
monitorAuthState();

// createDefaultProject();

// provides text input for user to type name of new project
document
  .querySelector(".add-project-btn")
  .addEventListener("click", function (e) {
    document.querySelector(".add-project-btn").hidden = true;
    document.querySelector(".add-project-form").hidden = false;
  });

// creates a new project when user clicks '+' button
document
  .querySelector(".submit-new-project-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    submitProject();
    document.querySelector(".add-project-btn").hidden = false;
  });

// creates a new project when user hits enter
document
  .getElementById("add-project-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitProject();
      document.querySelector(".add-project-btn").hidden = false;
    }
  });

/***Task Related Code***/

// for (let i = 0; i < 3; i++) {
//   createDefaultTask(i + 1);
// }

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

const txtEmail = document.getElementById("email");
const txtPassword = document.getElementById("password");
const signForm = document.getElementById("sign-form");
const signOutForm = document.getElementById("sign-out-form");

document
  .getElementById("create-account")
  .addEventListener("click", function (e) {
    createAccount(txtEmail, txtPassword);
  });

document.getElementById("sign-in").addEventListener("click", function (e) {
  signAccountIn(txtEmail, txtPassword);
});

document.querySelector(".sign-out-btn").addEventListener("click", function (e) {
  logout(txtEmail, txtPassword);
});

function showSignForm() {
  signForm.style.display = "grid";
  signOutForm.style.display = "none";
}

function showSignOut() {
  signForm.style.display = "none";
  signOutForm.style.display = "grid";
}

export { showSignForm, showSignOut };
