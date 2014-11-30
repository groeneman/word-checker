angular.module('scrabbleApp', []).controller('WordController', function($scope, wordChecker) {

  $scope.data = {
    word: "",
    wordChecked: false,
    isAWord: null,
  }

  $scope.checkWord = function() {
      wordChecker.checkWord($scope.data.word).then(function(result){
          $scope.data.wordChecked = true;
          $scope.data.isAWord = result.isAWord;
      })
  }

  $scope.clear = function(){
      $scope.data.wordChecked = false;
      $scope.data.isAWord = null;
  }

  $scope.resultString = function(){
      if($scope.data.isAWord) {
          return "is a word";
      }
      else {
          return "is not a word";
      }
  }

  $scope.definitionUrl = function(){
    return "https://www.google.com/search?q=define " + $scope.data.word
  }

  $scope.resultStyle = function(){
      if($scope.data.isAWord) {
          return {color:'green'};
      }
      else {
          return {color:'red'};
      }
  }
}).factory('wordChecker', function($http, $q){
    return {
        checkWord: function(word){
            var d = $q.defer();
            $http.get('/words/' + word)
              .success(function(result){
                  d.resolve(result);
              })
              .error(function(result){
                  alert(result)
              });
              return d.promise;
        }
     }
})
