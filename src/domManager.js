const domManager = (() => {
  let projectBody = document.querySelector(".project-body");
  let taskBody = document.querySelector(".task-body");

  const getProjectBody = () => projectBody;
  const getTaskBody = () => taskBody;
  const updateProjectBody = () => {
    projectBody = document.querySelector(".project-body");
  };
  const updateTaskBody = () => {
    taskBody = document.querySelector(".task-body");
  };
  return {
    getProjectBody,
    getTaskBody,
    updateProjectBody,
    updateTaskBody,
  };
})();

export default domManager;
