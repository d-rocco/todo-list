/*
Project Manager:
    Array of projects
*/
import project from "./project";

const projectManager = (() => {
  let projects = [];
  let recentProject = project("", "");
  const getRecentProject = () => recentProject;
  const setRecentProject = (newProject) => (recentProject = newProject);
  return {
    projects,
    getRecentProject,
    setRecentProject,
  };
})();

export default projectManager;
