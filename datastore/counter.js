const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

// Thomas Notes:
// replace the counter by creating a datastore
// const count = require("./datastore/counter.txt");
// delete this!!!
var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

exports.zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = exports.zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  // do something with data, which is counter
  // Thomas Notes:
  // getNextUniqueId takes in a callback! (add it to the input)
  // create a callback function that console.logs an error but returns data if no assign
  // assign the counter variable to the data from readCounter
  // var count = readCounter(>our callback function>);
  // increment the count by 1
  // write the counter variable to the file system
  // return writeCounter(count, <our callback function>
  // return count (should this be zeroPadded???)

  // if (err) {
  //   throw ('error getting next unique id');
  // }
  // var count = readCounter(callback);
  // count++;
  // var counterString = writeCounter(count, callback);
  // return count;

  // counter = counter + 1;
    // return zeroPaddedNumber(counter);
    // return counter;

    readCounter((error, counter) => {
      counter++;
      writeCounter(counter, (err, counterString) => {
        if (err) {
          throw ("Could not write counter to file");
        }
        callback(null, counterString);
      });
    });

};

// var callback = function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     return data;
//   }
// };

// Thomas Notes:
// getNextUniqueId takes in a callback! (add it to the input)
// create a callback function that console.logs an error but returns data if no assign
// assign the counter variable to the data from readCounter
  // var count = readCounter(>our callback function>);
// increment the count by 1
// write the counter variable to the file system
  // return writeCounter(count, <our callback function>
// return count (should this be zeroPadded???)

// Callback Function:
// function callback(err, data) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   return data;
// }

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////
exports.counterFile = path.join(__dirname, 'counter.txt');
