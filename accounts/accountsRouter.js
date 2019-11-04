const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await db('accounts');
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Your request could not be processed ' + error.message
    });
  }
});

module.exports = router;
