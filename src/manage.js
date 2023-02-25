import project from "./project";
import projectManager from "./projectManager";
import task from "./task";

function addProjectToDOM(project, parentContainer) {
  const projectName = document.createElement("button");
  const projectDateCreated = document.createElement("div");
  projectName.textContent = project.getName();
  projectDateCreated.textContent = project.getDateCreated();
  projectName.classList.toggle("project");
  parentContainer.appendChild(projectName);
  parentContainer.appendChild(projectDateCreated);
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
}

export { addProjectToDOM, addTaskToDom };
