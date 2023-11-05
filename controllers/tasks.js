const Task = require('../models/Task');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors/errors');

const getAllTasks = async (req, res) => {
    const tasks = await Task.find({});
    res.status(StatusCodes.OK).json({ tasks });
}

const createTask = async (req, res) => {
    const tasks = await Task.create(req.body);
    res.status(StatusCodes.OK).json({ tasks });
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const tasks = await Task.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
    if (!tasks) {
        throw new NotFoundError(`No such job with id : ${id}`);
    }
    res.status(StatusCodes.OK).json({ tasks });
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete({ _id: id });
    if (!task) {
        throw new NotFoundError(`No such job with id : ${id}`);
    }
    res.status(StatusCodes.OK).json({ task });
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
}