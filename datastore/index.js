const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// Thomas Notes:
// replace items with a datastore, dataDir
// dataDir = index.js/id.txt
// const count = require("./datastore/counter.txt");

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  var id = counter.getNextUniqueId();
  items[id] = text;
  callback(null, { id, text });
};

// Thomas Notes:
// replace items using fs
// use fs.writeFile() to write text to with the id in the name of the file
  // fs.writeFile(exports.counterFile, counterString, (err) => {
  //   if (err) {
  //     throw ('error writing counter');
  //   } else {
  //     callback(null, counterString);
  //   }
  // });

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
