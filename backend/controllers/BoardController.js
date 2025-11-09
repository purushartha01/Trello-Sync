const createBoard = (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}

const addTask = (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}

const updateTask = (req, res, next) => {
    try {
        const { taskId } = req.params;

    } catch (err) {
        next(err);
    }
}

const deleteTask = (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}


module.exports = {
    createBoard,
    addTask,
    updateTask,
    deleteTask
}