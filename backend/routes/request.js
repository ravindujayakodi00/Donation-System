const express = require('express');

const router = express.Router();

const {
    getAllRequests,
    getRequest,
    createRequest,
    updateRequest,
    deleteRequest
} = require('../controllers/requestController');

// get all requests 
router.get('/', getAllRequests);

// get a request
router.get('/:id', getRequest);

// create a request
router.post('/', createRequest);

// update a request
router.patch('/:id', updateRequest);

// delete a request
router.delete('/:id', deleteRequest);

module.exports = router;