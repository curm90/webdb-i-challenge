const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { sortby, sortdir, limit } = req.query;
    const accounts = await db('accounts')
      .orderBy(sortby || 'id', sortdir || 'asc')
      .limit(limit || 50);
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const account = await db('accounts').where({ id: req.params.id });
    res.json(account);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, budget } = req.body;
    const newAccount = await db('accounts').insert({
      name,
      budget
    });
    res.json('New account successfully created with an id of ' + newAccount[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedAccount = await db('accounts')
      .where({ id: req.params.id })
      .update({ name: req.body.name, budget: req.params.budget });
    res.json(updatedAccount + ' Account was updated');
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedAccount = await db('accounts')
      .where({ id: req.params.id })
      .del();
    res.json(deletedAccount + ' rows deleted');
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res
    .status(500)
    .json({ message: 'Your request could not be processed. ' + err.message });
});

module.exports = router;
