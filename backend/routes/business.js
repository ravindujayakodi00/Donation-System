const express = require('express');

const router = express.Router();
const {
    getAllBusiness,
    getBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness
} = require('../controllers/businessController');


const requireAuth = require('../middleware/requireAuth');

//requireAuth middleware will run on all routes below this line

// get all business
router.get('/', getAllBusiness);

// get a business
router.get('/:id', getBusiness);

// create a business
router.post('/', createBusiness);

// update a business
router.patch('/:id', updateBusiness);

// delete a business
router.delete('/:id', deleteBusiness);

module.exports = router;