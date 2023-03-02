import project from "./project";
import projectManager from "./projectManager";
import task from "./task";
import { format, formatDistance, subDays } from "date-fns";
import { addProjectToDOM, addTaskToDom } from "./manage";

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
    const parentContainer = document.querySelector(".project-body");
    addProjectToDOM(addedProject, parentContainer);
  } // prevents user from creating empty project name
  else {
    document.querySelector(".add-project-form").hidden = true;
    document.querySelector(".project-header").hidden = false;
    textInput.value = "";
  }
}

function submitTask() {
  const formData = document.querySelectorAll(".add-task-form");
  const existingTaskNames = projectManager
    .getRecentProject()
    .tasks.map((task) => `${task.getTitle().toLowerCase()}`);
  if (
    formData[0][0].value !== "" &&
    !existingTaskNames.includes(formData[0][0].value.toLowerCase())
  ) {
    const parentContainer = document.querySelector(".task-body");
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
      addTaskToDom(addedTask, parentContainer);
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
      addTaskToDom(addedTask, parentContainer);
    }
  } else {
    document.querySelector(".add-task-btn").hidden = false;
    document.querySelector(".add-task-form").hidden = true;
  }
}

function createDefaultProject() {
  const defaultProject = project(
    "Sample Project",
    format(new Date(), "MMM dd, yyyy")
  );
  projectManager.projects.push(defaultProject);
  projectManager.setRecentProject(defaultProject);
  const parentContainer = document.querySelector(".project-body");
  addProjectToDOM(defaultProject, parentContainer);
}

function createDefaultTask() {
  const parentContainer = document.querySelector(".task-body");
  const defaultTask = task(
    "Sample Task",
    "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, ia",
    "No Due Date",
    "Medium"
  );
  projectManager.getRecentProject().tasks.push(defaultTask);
  addTaskToDom(defaultTask, parentContainer);
}

export { submitProject, submitTask, createDefaultProject, createDefaultTask };
