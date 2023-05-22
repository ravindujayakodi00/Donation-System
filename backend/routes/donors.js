const express = require('express');

const router = express.Router();

const {
    getAllDonors,
    getDonor,
    createDonor,
    updateDonor,
    deleteDonor
} = require('../controllers/donorsController');

const requireAuth = require('../middleware/requireAuth');

//requireAuth middleware will run on all routes below this line

// get all donors 
router.get('/', getAllDonors);

// get a donor
router.get('/:id', getDonor);

// create a donor
router.post('/', createDonor);

// update a donor
router.patch('/:id', updateDonor);

// delete a donor
router.delete('/:id', deleteDonor);

module.exports = router;