const router = require('express').Router();
const mw = require('./accounts-middleware.js');
const Acc = require('./accounts-model.js');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Acc.getAll()
    res.json(accounts);
  } catch (err) {
    next(err)
  }
});

router.get('/:id', mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account);
});

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Acc.create({name: req.body.name.trim(), budget: req.body.budget, })
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
});

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const updated = await Acc.updateById(req.params.id, req.body)
  try {
    res.json(updated);
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Acc.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({message: err.message});
});

module.exports = router;
