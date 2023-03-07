import project from "./project";
import projectManager from "./projectManager";
import task from "./task";
import domManager from "./domManager";
import {
  deleteProject,
  deleteTask,
  updateCompletedProject,
  updateCompletedTask,
} from "./storage";

function showActiveProjectTasks() {
  while (domManager.getTaskBody().lastChild) {
    domManager.getTaskBody().removeChild(domManager.getTaskBody().lastChild);
  }
  console.log(projectManager.getRecentProject().tasks.length);
  for (let i = 0; i < projectManager.getRecentProject().tasks.length; i++) {
    addTaskToDom(
      projectManager.getRecentProject().tasks[i],
      domManager.getTaskBody()
    );
  }
  domManager.updateTaskBody();
}

function makeProjectActive(e, activeProject) {
  if (projectManager.getRecentProject() !== activeProject) {
    domManager
      .getProjectBody()
      .querySelectorAll("button")
      .forEach((button) => {
        button.classList.remove("active");
      });
    e.classList.add("active");
    projectManager.setRecentProject(activeProject);
    showActiveProjectTasks();
  }
}

function createCheckBox(task) {
  const container = document.createElement("div");
  const label = document.createElement("label");
  label.setAttribute("for", "is-completed-check");
  label.textContent = "Complete";
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "is-completed-check");
  checkbox.classList.add("is-completed-check");
  if (task.isCompleted()) {
    checkbox.checked = true;
  }
  container.appendChild(label);
  container.appendChild(checkbox);

  return container;
}

function removeProject(project, e) {
  const projectNames = projectManager.projects.map((p) => `${p.getName()}`);
  const i = projectNames.indexOf(project.getName());
  projectManager.projects.splice(i, 1);
  deleteProject(project);
  e.target.parentElement.remove();
  domManager.updateProjectBody();
  if (domManager.getProjectBody().firstChild) {
    console.log(domManager.getProjectBody().childNodes[0].firstChild);
    makeProjectActive(
      domManager.getProjectBody().childNodes[0].firstChild,
      projectManager.projects[0]
    );
  } else {
    while (domManager.getTaskBody().lastChild) {
      domManager.getTaskBody().removeChild(domManager.getTaskBody().lastChild);
    }
    domManager.updateTaskBody();
  }
}

function removeTask(task, e) {
  const taskNames = projectManager
    .getRecentProject()
    .tasks.map((t) => `${t.getTitle()}`);
  const i = taskNames.indexOf(task.getTitle());
  projectManager.getRecentProject().tasks.splice(i, 1);
  deleteTask(projectManager.getRecentProject(), task);
  e.target.parentElement.remove();
  domManager.updateTaskBody();
}

function addProjectToDOM(addedProject, parentContainer) {
  domManager
    .getProjectBody()
    .querySelectorAll("button")
    .forEach((button) => {
      button.classList.remove("active");
    });
  const projectContainer = document.createElement("div");
  const projectName = document.createElement("button");
  const projectDateCreated = document.createElement("div");
  projectName.textContent = addedProject.getName();
  projectDateCreated.textContent = addedProject.getDateCreated();
  projectName.classList.add("project");
  projectName.classList.add("active");
  const removeBtn = document.createElement("i");
  removeBtn.classList.add("fa-regular");
  removeBtn.classList.add("fa-trash-can");
  removeBtn.classList.add("fa-xl");
  projectContainer.appendChild(projectName);
  projectContainer.appendChild(projectDateCreated);
  projectContainer.appendChild(removeBtn);
  parentContainer.appendChild(projectContainer);
  if (addedProject.isCompleted()) {
    projectName.classList.add("completed-project");
  } else {
    projectName.classList.remove("completed-project");
  }
  domManager.updateProjectBody();
  removeBtn.addEventListener("click", function (e) {
    removeProject(addedProject, e);
  });
  projectName.addEventListener("click", function (e) {
    makeProjectActive(e.target, addedProject);
  });
  showActiveProjectTasks();
}

function checkIfAllTasksCompleted() {
  for (let i = 0; i < projectManager.getRecentProject().tasks.length; i++) {
    if (!projectManager.getRecentProject().tasks[i].isCompleted()) {
      return false;
    }
  }
  return true;
}

function addTaskToDom(task, parentContainer) {
  const singleTaskContainer = document.createElement("div");
  parentContainer.appendChild(singleTaskContainer);
  const title = document.createElement("div");
  title.textContent = task.getTitle();
  const desc = document.createElement("div");
  desc.textContent = task.getDesc();
  const dueDate = document.createElement("div");
  if (task.getDueDate() === "No Due Date") {
    dueDate.textContent = task.getDueDate();
  } else {
    dueDate.textContent = `Due ${task.getDueDate()}`;
  }
  const priority = document.createElement("div");
  priority.textContent = `${task.getPriority()} Priority`;
  singleTaskContainer.appendChild(title);
  singleTaskContainer.appendChild(desc);
  singleTaskContainer.appendChild(dueDate);
  singleTaskContainer.appendChild(priority);
  singleTaskContainer.appendChild(createCheckBox(task));
  const removeBtn = document.createElement("i");
  removeBtn.classList.add("fa-regular");
  removeBtn.classList.add("fa-trash-can");
  removeBtn.classList.add("fa-xl");
  singleTaskContainer.appendChild(removeBtn);
  removeBtn.addEventListener("click", function (e) {
    removeTask(task, e);
  });
  if (task.isCompleted()) {
    singleTaskContainer.classList.add("completed-border");
  }
  domManager.updateTaskBody();
  if (!checkIfAllTasksCompleted()) {
    domManager
      .getProjectBody()
      .querySelector(".active")
      .classList.remove("completed-project");
  } else {
    domManager
      .getProjectBody()
      .querySelector(".active")
      .classList.add("completed-project");
  }
  document.querySelectorAll(".is-completed-check").forEach((box) => {
    box.addEventListener("click", function (e) {
      const checkBoxStatus = e.target.checked;
      const taskName =
        e.target.parentElement.parentElement.childNodes[0].textContent;
      for (let i = 0; i < projectManager.getRecentProject().tasks.length; i++) {
        if (
          projectManager.getRecentProject().tasks[i].getTitle() === taskName &&
          checkBoxStatus
        ) {
          projectManager
            .getRecentProject()
            .tasks[i].setCompleted(checkBoxStatus);
          updateCompletedTask(
            projectManager.getRecentProject(),
            projectManager.getRecentProject().tasks[i]
          );
          e.target.parentElement.parentElement.classList.add(
            "completed-border"
          );
        } else if (
          projectManager.getRecentProject().tasks[i].getTitle() === taskName &&
          !checkBoxStatus
        ) {
          projectManager
            .getRecentProject()
            .tasks[i].setCompleted(checkBoxStatus);
          updateCompletedTask(
            projectManager.getRecentProject(),
            projectManager.getRecentProject().tasks[i]
          );
          e.target.parentElement.parentElement.classList.remove(
            "completed-border"
          );
        }
      }
      domManager.updateTaskBody();
      if (checkIfAllTasksCompleted()) {
        projectManager.getRecentProject().setCompleted(true);
        updateCompletedProject(projectManager.getRecentProject());
        domManager
          .getProjectBody()
          .querySelector(".active")
          .classList.add("completed-project");
      } else {
        projectManager.getRecentProject().setCompleted(false);
        updateCompletedProject(projectManager.getRecentProject());
        domManager
          .getProjectBody()
          .querySelector(".active")
          .classList.remove("completed-project");
      }
      domManager.updateProjectBody();
    });
  });
}

export { addProjectToDOM, addTaskToDom, showActiveProjectTasks };
