const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, res) => {
    res.send('get all jobs')
}

const getJob = async (req, res) => {
    res.send('get job')
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    console.log(`Body: ${JSON.stringify(req.body)}...`)
    // const job = await Job.create(req.body)
    // res.status(StatusCodes.CREATED).json({ job })
    try {
        const job = await Job.create(req.body);
        res.status(StatusCodes.CREATED).json({ job });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
    // res.send('create job')
}

const updateJob = async (req, res) => {
    res.send('update job')
}

const deleteJob = async (req, res) => {
    res.send('delete job')
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}