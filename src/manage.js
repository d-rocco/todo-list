import project from "./project";
import projectManager from "./projectManager";
import task from "./task";
import domManager from "./domManager";

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
}

function makeProjectActive(e, activeProject) {
  domManager
    .getProjectBody()
    .querySelectorAll("button")
    .forEach((button) => {
      button.classList.remove("active");
    });
  e.target.classList.add("active");
  projectManager.setRecentProject(activeProject);
  showActiveProjectTasks();
}

function addProjectToDOM(addedProject, parentContainer) {
  domManager
    .getProjectBody()
    .querySelectorAll("button")
    .forEach((button) => {
      button.classList.remove("active");
    });
  const projectName = document.createElement("button");
  const projectDateCreated = document.createElement("div");
  projectName.textContent = addedProject.getName();
  projectDateCreated.textContent = addedProject.getDateCreated();
  projectName.classList.add("project");
  projectName.classList.add("active");
  parentContainer.appendChild(projectName);
  parentContainer.appendChild(projectDateCreated);
  domManager.updateProjectBody();
  projectName.addEventListener("click", function (e) {
    makeProjectActive(e, addedProject);
  });
  showActiveProjectTasks();
}

function addTaskToDom(task, parentContainer) {
  const singleTaskContainer = document.createElement("div");
  parentContainer.appendChild(singleTaskContainer);
  const title = document.createElement("div");
  title.textContent = task.getTitle();
  const desc = document.createElement("div");
  desc.textContent = task.getDesc();
  const dueDate = document.createElement("div");
  dueDate.textContent = task.getDueDate();
  const priority = document.createElement("div");
  priority.textContent = task.getPriority();

  singleTaskContainer.appendChild(title);
  singleTaskContainer.appendChild(desc);
  singleTaskContainer.appendChild(dueDate);
  singleTaskContainer.appendChild(priority);
  domManager.updateTaskBody();
}

export { addProjectToDOM, addTaskToDom };
