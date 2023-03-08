import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addProjectToDOM, showActiveProjectTasks } from "./manage";
import project from "./project";
import projectManager from "./projectManager";
import task from "./task";
import { showSignForm, showSignOut } from "./index";
import domManager from "./domManager";

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
const auth = getAuth(app);

async function createAccount(txtEmail, txtPassword) {
  const email = txtEmail.value;
  const password = txtPassword.value;

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential;
      console.log(user);
    })
    .catch((error) => {
      console.log("MAYDAY");
    });
}

async function signAccountIn(txtEmail, txtPassword) {
  const email = txtEmail.value;
  const password = txtPassword.value;

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential;
      console.log(user);
    })
    .catch((error) => {
      console.log("MAYDAY");
    });
}

async function monitorAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(auth.currentUser);
      showSignOut();
      loadProjects();
    } else {
      showSignForm();
    }
  });
}

async function logout(email, password) {
  email.value = "";
  password.value = "";
  while (domManager.getProjectBody().lastChild) {
    domManager
      .getProjectBody()
      .removeChild(domManager.getProjectBody().lastChild);
  }
  while (domManager.getTaskBody().lastChild) {
    domManager.getTaskBody().removeChild(domManager.getTaskBody().lastChild);
  }
  await signOut(auth);
}

function writeProject(project) {
  if (auth.currentUser !== null) {
    const projectData = {
      name: project.getName(),
      date: project.getDateCreated(),
      completed: project.isCompleted(),
    };
    setDoc(
      doc(db, "users", auth.currentUser.uid, "projects", project.getName()),
      projectData
    );
  }
}

function writeTask(project, task) {
  if (auth.currentUser !== null) {
    const taskData = {
      title: task.getTitle(),
      desc: task.getDesc(),
      dueDate: task.getDueDate(),
      priority: task.getPriority(),
      completed: task.isCompleted(),
    };
    setDoc(
      doc(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        project.getName(),
        "tasks",
        task.getTitle()
      ),
      taskData
    );
  }
}

function deleteProject(project) {
  if (auth.currentUser !== null) {
    console.log(project);
    deleteDoc(
      doc(db, "users", auth.currentUser.uid, "projects", project.getName())
    );
    for (let i = 0; i < project.tasks.length; i++) {
      deleteTask(project, project.tasks[i]);
    }
    console.log(project.getName());
  }
}

function deleteTask(project, task) {
  if (auth.currentUser !== null) {
    deleteDoc(
      doc(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        project.getName(),
        "tasks",
        task.getTitle()
      )
    );
  }
}

async function loadProjects() {
  if (auth.currentUser !== null) {
    const projects = await getDocs(
      collection(db, "users", auth.currentUser.uid, "projects")
    );
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
}

async function loadTasks(project) {
  if (auth.currentUser !== null) {
    const tasks = await getDocs(
      collection(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        project.getName(),
        "tasks"
      )
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
}

function updateCompletedProject(project) {
  if (auth.currentUser !== null) {
    updateDoc(
      doc(db, "users", auth.currentUser.uid, "projects", project.getName()),
      {
        completed: project.isCompleted(),
      }
    );
  }
}

function updateCompletedTask(project, task) {
  if (auth.currentUser !== null) {
    updateDoc(
      doc(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        project.getName(),
        "tasks",
        task.getTitle()
      ),
      {
        completed: task.isCompleted(),
      }
    );
  }
}

export {
  writeProject,
  writeTask,
  deleteProject,
  deleteTask,
  loadProjects,
  updateCompletedProject,
  updateCompletedTask,
  createAccount,
  logout,
  monitorAuthState,
  signAccountIn,
};
