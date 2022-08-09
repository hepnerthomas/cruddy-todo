const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// Thomas Notes:
// replace items with a datastore, datastore/data/
// dataDir = index.js/id.txt
// const count = require("./datastore/counter.txt");

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      throw ('create error');
    }
    newTodoListDataFile = id + '.txt';
    newTodoListDataFileDir = path.join(exports.dataDir, newTodoListDataFile);
    // console.log(newTodoListDataFileDir);

    fs.writeFile(newTodoListDataFileDir, text, (err) => {
      if (err) {
        throw ('Error in writing new todo item');
      } else {
        // callback(null, text);
        callback(null, { id, text });
      }
    });
  });


};

exports.readAll = (callback) => {
  // identify the path to the chosen folder (exports.dataDir)
  // fs.readdir (directoryPath, (err, files))
  fs.readdir(exports.dataDir, (err, files) => {
    // check err
    if (err) {
      throw ('Failed to read files from data directory.');
    }
    // files.forEach, create an object that contains key id, key text
    // (suggestion: we may need to log out (file) to see what's in it)
    // where id is the name of the file (without .txt)
    // and text is also the name of the file (without .txt)
    var data = _.map(files, (fileName) => {
      // console.log({ id: id, text: id });
      let id = fileName.replace('.txt', '');
      return { id: id, text: id };
    });
    callback(null, data);
  });

};

exports.readOne = (id, callback) => {
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
  const filename = id + '.txt';
  const chosenFile = path.join(exports.dataDir, filename);
  fs.readFile(chosenFile, (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, {id: id, text: fileData.toString()});
    }
  });
};

exports.update = (id, text, callback) => {
  let fileDir = path.join(exports.dataDir, id + '.txt');
  fs.readFile(fileDir, (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(fileDir, text, (err) => {
        if (err) {
          throw ('Error in updating file.');
        }
        callback(null, { id, text });
      });
    }
  });
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {

  // construct the filePath with dataDir and id using path.join
  // remote the file with fs.unlink
    // if err, throw error like in readOne
    // otherwise, call the callback function without any inputs

    let fileDir = path.join(exports.dataDir, id + '.txt');
    fs.unlink(fileDir, (err) => {
      if (err) {
        callback(new Error(`No item with id: ${id}`));
      } else {
        callback();
      }
    });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
