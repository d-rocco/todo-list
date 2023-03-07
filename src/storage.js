import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import {
  addProjectToDOM,
  addTaskToDom,
  showActiveProjectTasks,
} from "./manage";
import project from "./project";
import projectManager from "./projectManager";
import task from "./task";

const firebaseConfig = {
  apiKey: "AIzaSyB4IZsN8OJAAbk7LNAg91nTLicYjHQwkoY",
  authDomain: "a-basic-todo-list.firebaseapp.com",
  projectId: "a-basic-todo-list",
  storageBucket: "a-basic-todo-list.appspot.com",
  messagingSenderId: "650738691947",
  appId: "1:650738691947:web:2143565f7ade142415e62e",
  measurementId: "G-PF92BSBGNE",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function writeProject(project) {
  const projectData = {
    name: project.getName(),
    date: project.getDateCreated(),
    completed: project.isCompleted(),
  };
  setDoc(doc(db, "projects", project.getName()), projectData);
}

function writeTask(project, task) {
  const taskData = {
    title: task.getTitle(),
    desc: task.getDesc(),
    dueDate: task.getDueDate(),
    priority: task.getPriority(),
    completed: task.isCompleted(),
  };
  setDoc(
    doc(db, "projects", project.getName(), "tasks", task.getTitle()),
    taskData
  );
}

function deleteProject(project) {
  console.log(project);
  deleteDoc(doc(db, "projects", project.getName()));
  for (let i = 0; i < project.tasks.length; i++) {
    deleteTask(project, project.tasks[i]);
  }
  console.log(project.getName());
}

function deleteTask(project, task) {
  deleteDoc(doc(db, "projects", project.getName(), "tasks", task.getTitle()));
}

async function loadProjects() {
  const projects = await getDocs(collection(db, "projects"));
  projects.forEach((p) => {
    const storedProject = project(p.id, p.data().date);
    storedProject.setCompleted(p.data().completed);
    projectManager.projects.push(storedProject);
    projectManager.setRecentProject(storedProject);
    const parentContainer = document.querySelector(".project-body");
    addProjectToDOM(storedProject, parentContainer);
    loadTasks(projectManager.getRecentProject());
  });
}

async function loadTasks(project) {
  const tasks = await getDocs(
    collection(db, "projects", project.getName(), "tasks")
  );
  tasks.forEach((t) => {
    const storedTask = task(
      t.id,
      t.data().desc,
      t.data().dueDate,
      t.data().priority
    );
    storedTask.setCompleted(t.data().completed);
    project.tasks.push(storedTask);
  });
  showActiveProjectTasks();
}

function updateCompletedProject(project) {
  updateDoc(doc(db, "projects", project.getName()), {
    completed: project.isCompleted(),
  });
}

function updateCompletedTask(project, task) {
  updateDoc(doc(db, "projects", project.getName(), "tasks", task.getTitle()), {
    completed: task.isCompleted(),
  });
}

export {
  writeProject,
  writeTask,
  deleteProject,
  deleteTask,
  loadProjects,
  updateCompletedProject,
  updateCompletedTask,
};
