const mongoose = require('mongoose');
const Business = require('../models/businessModel');

getAllBusiness = async (req, res) => {
    try {
        const business = await Business.find();
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json(err);
    }
}

getBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json(err);
    }
}

createBusiness = async (req, res) => {
    try {
        const newBusiness = new Business(req.body);
        const business = await newBusiness.save();
        res.status(201).json(business);
    } catch (err) {
        res.status(500).json(err);
    }
}

updateBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json(err);
    }
}

deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        res.status(200).json(business);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAllBusiness,
    getBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness
}

