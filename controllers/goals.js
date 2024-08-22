const Goal = require('../models/Goal')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const { BadRequestError, NotFoundError } = require('../errors')

const getAllGoals = async (req, res) => {
    const goals = await Goal.find({ $or: [{ createdBy: req.user._id }, { assignedTo: req.user._id }] });
    res.status(StatusCodes.OK).json({ goals, count: goals.length })
}

const getGoal = async (req, res) => {
    const {
        user: { userId },
        params: { id: goalId },
      } = req
  
      const goal = await Goal.findOne({
        _id: goalId,
        createdBy: userId,
      })
      if (!goal) {
        throw new NotFoundError(`No goal with id ${goalId}`)
      }
      res.status(StatusCodes.OK).json({ goal })
}


const createGoal = async (req, res) => {
    req.body.createdBy = req.user.userId
    const {assignedToEmail} = req.body;
    console.log(`Body: ${JSON.stringify(req.body)}...`)

    let assignedTo = null;
    if (assignedToEmail) {
      // Find the user by email
      const user = await User.findOne({ email: assignedToEmail });
      console.log(`!!!user ${user}...`)
      if (!user) {
        return res.status(400).json({ message: 'Assigned user not found.' });
      }
      console.log(`user ${user._id}...`)
      assignedTo = user._id; 
    }

    req.body.assignedTo = assignedTo;

    try {
        const goal = await Goal.create(req.body);
        res.status(StatusCodes.CREATED).json({ goal });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}


const updateGoal = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: goalId },
      } = req
    
      if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
      }
      const goal = await Goal.findByIdAndUpdate(
        { _id: goalId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
      )
      if (!goal) {
        throw new NotFoundError(`No goal with id ${goalId}`)
      }
      res.status(StatusCodes.OK).json({ goal })
}

const deleteGoal = async (req, res) => {
    const {
        user: { userId },
        params: { id: goalId },
      } = req
    
      const goal = await Goal.findByIdAndDelete({
        _id: goalId,
        createdBy: userId,
      })
      if (!goal) {
        throw new NotFoundError(`No goal with id ${goalId}`)
      }
      res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllGoals,
    getGoal,
    createGoal,
    updateGoal,
    deleteGoal,
}