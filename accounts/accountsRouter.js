const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.json(accounts);
  } catch (error) {
    res.status(500).json({
      message: 'Your request could not be processed ' + error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const account = await db('accounts').where({ id: req.params.id });
    res.json(account);
  } catch (error) {
    res.status(500).json({
      message: 'Your request could not be processed ' + error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const newAccount = await db('accounts').insert({
      name: req.body.name,
      budget: req.body.budget
    });
    res.json('New account successfully created with an id of ' + newAccount[0]);
  } catch (error) {
    res.status(500).json({
      message: 'Your request could not be processed ' + error.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedAccount = await db('accounts')
      .where({ id: req.params.id })
      .update({ name: req.body.name, budget: req.params.budget });
    res.json(updatedAccount + ' Account was updated');
  } catch (error) {
    res.status(500).json({
      message: 'Your request could not be processed ' + error.message
    });
  }
});

module.exports = router;
