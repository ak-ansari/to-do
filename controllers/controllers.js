const Tasks = require("../model/model");
const asyncWraper = require("../middlewares/asyncWraper");
const { createCustomError } = require("../errors/customError");

//get all task
const getAllTasks = asyncWraper(async (req, res) => {
  const tasks = await Tasks.find({});
  res.status(201).json({ tasks });
});

//get a single task
const getTask = asyncWraper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Tasks.findOne({ _id: taskId });
  if (task == false) {
    return next(createCustomError(`no task found with id: ${taskId}`, 404));
  }

  res.status(200).json({ task });
});

// create task
const createTask = asyncWraper(async (req, res) => {
  const task = await Tasks.create(req.body);
  res.status(201).json({ task });
});

//update task
const updateTask = asyncWraper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Tasks.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (task == false) {
    return next(createCustomError(`no task found with id: ${taskId}`, 404));
  }
  res.status(200).json({ id: taskId, data: req.body });
});

//delete task
const deleteTask = asyncWraper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Tasks.findOneAndDelete({ _id: taskId });
  if (task == false) {
    return next(createCustomError(`no task found with id: ${taskId}`, 404));
  }
  res.status(200).json({ task });
});
module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
