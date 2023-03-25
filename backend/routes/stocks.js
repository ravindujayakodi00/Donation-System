const express = require('express');

const router = express.Router();

const {
    getAllStocks,
    getStock,
    createStock,
    deleteStock
} = require('../controllers/stockController');

router.get('/', getAllStocks);
router.get('/:id', getStock);
router.post('/', createStock);
router.delete('/:id', deleteStock);

module.exports = router;