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
        const { firstName, lastName, email, phone, address } = req.body;

        // Validate phone number has 10 digits
        if (phone.length !== 10) {
            return res.status(400).json({ error: 'Phone number must have 10 digits.' });
        }

        // Validate email contains '@' symbol
        if (!email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        const newDonor = new Donor({
            firstName,
            lastName,
            email,
            phone,
            address
        });

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

