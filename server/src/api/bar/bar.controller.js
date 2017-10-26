'use strict';

const yelp = require('yelp-fusion');
const {
  token
} = require('../../config/yelp');
const Bar = require('./bar.model');

let client = token.then((accessToken) => {
  return yelp.client(accessToken);
});

function find (item) {
  let bar = Bar.findOne({
    bar_id: item.id
  }).then(doc => {
    if (!doc) {
      let b = {
        bar_id: item.id,
        name: item.name,
        image_url: item.image_url,
        votes: 0,
        voters: []
      };
      let bar = new Bar(b);
      bar.save();
      return bar;
    } else {
      return doc;
    }
  });
  return bar;
}

function getBars (businesses) {
  let bars = [];
  return new Promise((resolve, reject) => {
    businesses.forEach((item, index) => {
      let bar = find(item);
      bar.then(b => {
        bars.push(b);
        if (index === 19) {
          resolve(bars);
        }
      });
    });
  });
}

const search = (req, res) => {
  const location = req.query.location || '';
  client.then(c => {
    c.search({
      categories: 'bar',
      location
    }).then(response => {
      let bars = getBars(response.jsonBody.businesses);
      bars.then(docs => {
        res.send(docs);
      });
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
  });
};

const vote = (req, res) => {
  const { bar_id } = req.body;
  Bar.findOne({ bar_id }).populate('voters').then(bar => {
    let user = bar.voters.filter(u => u._user.toString() === req.user._id.toString());
    let action = {'$push': { 'voters': { '_user': req.user._id } }};
    if (user.length > 0) {
      action = {'$pull': { 'voters': { '_user': req.user._id } }};
    }
    Bar.findOneAndUpdate({ bar_id }, action, {new: true}).then(bar => {
      if (!bar) {
        return res.status(404).send();
      }
      res.send({ bar });
    }).catch(e => res.status(400).send(e));
  });
};

module.exports = {
  search,
  vote
};
