const express = require('express');
const router = express.Router();
const voteService = require('../services/vote.service');

router.post('/', createVote);
router.get('/catslist', catsList);
router.get('/topcatscron', topCatsCron);

module.exports = router;

function createVote(req, res, next) {
  voteService.create(req.body)
    .then(() => res.json())
    .catch(err => next(err));
}

function catsList(req, res, next) {
  voteService.catsList(req.query.order_by, req.query.order, parseInt(req.query.skip), parseInt(req.query.limit))
    .then(results => res.json(results))
    .catch(err => console.log(err))
}

function topCatsCron(req, res, next) {
  voteService.topCatsCron()
    .then(results => res.json(results))
    .catch(err => console.log(err))
}