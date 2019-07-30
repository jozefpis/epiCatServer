const db = require('_helpers/db');
const Pair = db.Pair;
const Vote = db.Vote;
const Statistic = db.Statistic;

module.exports = {
  getRandOne,
  statisticsCron,
  getSatistics
}
async function getRandOne(sub_id) {
  //get random cats pair
  return await Pair.aggregate([
    { $sample: { size: 1 } }
  ]);
}

async function getSatistics() {
  return await Statistic.find()
}


//for better performance save aggreged statistics to new collection
async function statisticsCron(){
  Statistic.remove({}, () => { //wipe statistic collection
    Pair.find(function(err, result) { //call all saved pairs
      result.forEach(pair => {
        const stats_obj = {}
        Vote.find({pair_id: pair._id} //find votes by actual pair
        ,function(err, result) {
          //prepare new object for save to collection
          stats_obj.cats = pair.cats;
          stats_obj.votes = result;
          const statistic = new Statistic(stats_obj);
          statistic.save(); // save pair with votes
        });
      });
    });
  });
}