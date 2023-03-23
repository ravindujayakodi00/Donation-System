const mongoose = require('mongoose');
const Request = require('../models/requestModel');

getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json(err);
    }
}

getRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json(err);
    }
}

createRequest = async (req, res) => {
    try {
        const newRequest = new Request(req.body);
        const request = await newRequest.save();
        res.status(201).json(request);
    } catch (err) {
        res.status(500).json(err);
    }
}

updateRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json(err);
    }
}

deleteRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAllRequests,
    getRequest,
    createRequest,
    updateRequest,
    deleteRequest
}

