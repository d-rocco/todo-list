import task from "./task";
import project from "./project";
import projectManager from "./projectManager";
import "./styles/main.css";
import { format, formatDistance, subDays } from "date-fns";

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
