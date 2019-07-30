const db = require('_helpers/db');
const Vote = db.Vote;
const Pair = db.Pair;
const Top = db.Top;

module.exports = {
  create,
  catsList,
  topCatsCron
}

//function for create new Vote
async function create(voteParams) {
    // check if pair is in database
    Pair.findOne( { "cats": voteParams.cats }, function (err, result) {
      //promise for save new Pair
      const savePair = new Promise(function(resolve, reject) {
        if (err) reject(err);
        //Check result from findOne query
        if (!result) {
          //delete redundant values from object
          delete voteParams.cats[0].breeds;
          delete voteParams.cats[1].breeds;
          const pair = new Pair({ 'cats': voteParams.cats });
          //save new Pair
          pair.save(function(err, new_pair_id) {
            if (err) reject(err);
            voteParams.pair_id = new_pair_id._id;
            resolve('Pair saved');
          });
        } else {
          voteParams.pair_id = result._id;
          resolve('Pair id loaded');
        }
    });
    savePair
      .then(function saveVote(response) {
        //delete cats coz i dont need them in save action
        delete voteParams.cats;
        const vote = new Vote(voteParams);
        return vote.save()
      })
      .catch(function someProblem(err) {
        console.error(err)
      })
  });
}

//get top stats
async function catsList(order_by = 'count', order = '-1', skip = 0, limit = 9) {
  const orderby = {}
  orderby[order_by] = order;
  return await Top.find().sort(orderby).skip(skip).limit(limit)
}

//for better performance this function save top stats on backend
async function topCatsCron() {
  Top.remove({}, () => {
    Vote.aggregate([
      {'$group' : {_id:'$cat_id', count:{$sum:1}, cat_id: {$last: '$cat_id'}, cat_url: {$last: '$cat_url'}, created_at:{$max: '$created_at'}}}
    ], function (err, result) {
      result.forEach((vote) => {
        delete vote._id
        const top = new Top(vote);
        top.save();
      });
      return 'Stats saved';
    });
  });
}