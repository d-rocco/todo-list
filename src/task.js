/*
Task:
    Title: Maxed at certain amount of characters
    Description: Maxed at certain amount of characters
    Due date
    Past due date warning
    priority: selection of low, medium, high
    Completed check mark
 */

const task = (title, desc, dueDate, priority) => {
  let completed = false;
  const getTitle = () => title;
  const getDesc = () => desc;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const isCompleted = () => completed;
  const setTitle = (newTitle) => (title = newTitle);
  const setDesc = (newDesc) => (desc = newDesc);
  const setDueDate = (newDueDate) => (dueDate = newDueDate);
  const setPriority = (priorityLevel) => (priority = priorityLevel);
  const setCompleted = (newCompleted) => completed;
  return {
    getTitle,
    getDesc,
    getDueDate,
    getPriority,
    isCompleted,
    setTitle,
    setDesc,
    setDueDate,
    setPriority,
    setCompleted,
  };
};

export default task;
