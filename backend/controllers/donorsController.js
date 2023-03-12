const mongoose = require('mongoose');
const Donor = require('../models/donorsModel');

getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.status(200).json(donors);
    } catch (err) {
        res.status(500).json(err);
    }
}

getDonor = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        res.status(200).json(donor);
    } catch (err) {
        res.status(500).json(err);
    }
}

createDonor = async (req, res) => {
    try {
        const newDonor = new Donor(req.body);
        const donor = await newDonor.save();
        res.status(201).json(donor);
    } catch (err) {
        res.status(500).json(err);
    }
}

updateDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(donor);
    } catch (err) {
        res.status(500).json(err);
    }
}

deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndDelete(req.params.id);
        res.status(200).json(donor);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAllDonors,
    getDonor,
    createDonor,
    updateDonor,
    deleteDonor
}

