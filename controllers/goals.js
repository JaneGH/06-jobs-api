const Goal = require('../models/Goal')
const { StatusCodes } = require('http-status-codes')

const getAllGoals = async (req, res) => {
    res.send('get all goals')
}

const getGoal = async (req, res) => {
    res.send('get goal')
}

const createGoal = async (req, res) => {
    req.body.createdBy = req.user.userId
    console.log(`Body: ${JSON.stringify(req.body)}...`)
    // const goal = await Goal.create(req.body)
    // res.status(StatusCodes.CREATED).json({ goal })
    try {
        const goal = await Goal.create(req.body);
        res.status(StatusCodes.CREATED).json({ goal });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
    // res.send('create goal')
}

const updateGoal = async (req, res) => {
    res.send('update goal')
}

const deleteGoal = async (req, res) => {
    res.send('delete goal')
}


module.exports = {
    getAllGoals,
    getGoal,
    createGoal,
    updateGoal,
    deleteGoal
}