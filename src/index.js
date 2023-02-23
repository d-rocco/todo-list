import task from "./task";
import project from "./project";
import projectManager from "./projectManager";
import "./styles/main.css";
import { format, formatDistance, subDays } from "date-fns";

/***Project Related Code***/
function submitProject() {
  const textInput = document.getElementById("add-project-input");
  // makes sure there are no duplicated names
  const existingProjectNames = projectManager.projects.map(
    (project) => `${project.getName().toLowerCase()}`
  );
  if (
    textInput.value !== "" &&
    !existingProjectNames.includes(textInput.value.toLowerCase())
  ) {
    document.querySelector(".add-project-form").hidden = true;
    document.querySelector(".project-header").hidden = false;
    const addedProject = project(
      textInput.value,
      format(new Date(), "MMM dd, yyyy")
    );
    projectManager.projects.push(addedProject);
    projectManager.setRecentProject(addedProject);
    textInput.value = "";
    // testing
    for (let i = 0; i < projectManager.projects.length; i++)
      console.log(projectManager.projects[i].getName());
  } // prevents user from creating empty project name
  else {
    document.querySelector(".add-project-form").hidden = true;
    document.querySelector(".project-header").hidden = false;
    textInput.value = "";
  }
}

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

function submitTask() {
  const formData = document.querySelectorAll(".add-task-form");
  const existingTaskNames = projectManager
    .getRecentProject()
    .tasks.map((task) => `${task.getTitle().toLowerCase()}`);
  if (
    formData[0][0].value !== "" &&
    !existingTaskNames.includes(formData[0][0].value.toLowerCase())
  ) {
    if (formData[0][2].value !== "") {
      const year = formData[0][2].valueAsDate.getFullYear();
      const month = formData[0][2].valueAsDate.getMonth();
      const day = formData[0][2].valueAsDate.getUTCDate();
      document.querySelector(".add-task-btn").hidden = false;
      document.querySelector(".add-task-form").hidden = true;
      const addedTask = task(
        formData[0][0].value,
        formData[0][1].value,
        format(new Date(year, month, day), "MMM dd, yyyy"),
        formData[0][3].value
      );
      projectManager.getRecentProject().tasks.push(addedTask);
      for (let i = 0; i < 3; i++) {
        formData[0][i].value = "";
      }
    } // if due date is not filled out
    else {
      document.querySelector(".add-task-btn").hidden = false;
      document.querySelector(".add-task-form").hidden = true;
      const addedTask = task(
        formData[0][0].value,
        formData[0][1].value,
        "No Due Date",
        formData[0][3].value
      );
      projectManager.getRecentProject().tasks.push(addedTask);
      for (let i = 0; i < 3; i++) {
        formData[0][i].value = "";
      }
    }
  } else {
    document.querySelector(".add-task-btn").hidden = false;
    document.querySelector(".add-task-form").hidden = true;
  }
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
