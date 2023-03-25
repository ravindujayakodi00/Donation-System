const mongoose = require('mongoose');
const Stock = require('../models/stocksModel');

getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.status(200).json(stocks);
    } catch (err) {
        res.status(500).json(err);
    }
}

getStock = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json(err);
    }
}

createStock = async (req, res) => {
    try {
        const newStock = new Stock(req.body);
        const stock = await newStock.save();
        res.status(201).json(stock);
    } catch (err) {
        res.status(500).json(err);
    }
}

deleteStock = async (req, res) => {
    try {
        const stock = await Stock.findByIdAndDelete(req.params.id);
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAllStocks,
    getStock,
    createStock,
    deleteStock

}