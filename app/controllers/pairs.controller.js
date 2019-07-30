const express = require('express');
const router = express.Router();
const pairService = require('../services/pair.service');

router.get('/onepair', onepair);
router.get('/statisticscron', statisticscron);
router.get('/getstats', getstats);

module.exports = router;

function onepair(req, res, next) {
  pairService.getRandOne(req.query.sub_id)
    .then(vote => vote ? res.json(vote[0].cats) : res.sendStatus(404))
    .catch(err => next(err))
}

function getstats(req, res, next) {
  pairService.getSatistics()
    .then(stats => stats ? res.json(stats) : res.sendStatus(404))
    .catch(err => next(err))
}

function statisticscron(req, res, next) {
  pairService.statisticsCron()
    .then(pairs => '')
    .catch(err => next(err))
}
