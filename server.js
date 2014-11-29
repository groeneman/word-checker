var express = require('express');
var app = express();

var WordList = require('./words');
var wordList = new WordList('TWL06.txt');
wordList.loadWords();

app.use(express.static(__dirname + '/public'));

app.get('/words/:word', function(req, res) {
  res.type('application/json');
  res.json({
    "isAWord": wordList.isAWord(req.params.word),
    "stringChecked": req.params.word
  });
});

app.listen(process.env.PORT || 4730);
