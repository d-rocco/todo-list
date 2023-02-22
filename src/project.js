/*
Project:
    Name
    Date Created
    Array of tasks
    Completed boolean
 */

const project = (name, dateCreated) => {
  let tasks = [];
  let completed = false;
  const getName = () => name;
  const getDateCreated = () => dateCreated;
  const isCompleted = () => completed;
  const setName = (newName) => (name = newName);
  const setCompleted = (newCompleted) => (completed = newCompleted);
  return {
    tasks,
    getName,
    getDateCreated,
    isCompleted,
    setName,
    setCompleted,
  };
};

export default project;
