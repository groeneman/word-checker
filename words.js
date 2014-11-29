fs = require('fs');

module.exports = function WordList(file) {
  var self = this;
  this.filePath = file;
  this.words = {};
  this.loadWords = function() {
    fs.readFile(this.filePath, 'utf8', function (err,wordFile) {
      if (err) { return console.log(err); }
      wordFile.split('\n')
        .map(function(word) { return word.trim(); })
        .forEach(function(word){ self.words[word] = true; })
    });
  };
  this.isAWord = function(word) {
    return (word.toUpperCase() in self.words);
  };
}