var scrabbleApp = angular.module('scrabbleApp', []);

scrabbleApp.controller('WordController', function($scope, $http) {

  $scope.word = "";
  $scope.wordChecked = false;
  $scope.isAWord = null;
    
  $scope.checkWord = function(){
      $http.get('/words/' + $scope.word)
        .success(function(result){
            $scope.wordChecked = true;
            $scope.isAWord = result.is_a_word;
        })
        .error(function(result){
            alert(result)
        });
  }
  
  $scope.clear = function(){
      $scope.wordChecked = false;
      $scope.isAWord = null;
  }
  
  $scope.resultString = function(){
      if($scope.isAWord) {
          return "is a word";
      }
      else {
          return "is not a word";
      }
  }
  
  $scope.resultStyle = function(){
      if($scope.isAWord) {
          return {color:'green'};
      }
      else {
          return {color:'red'};
      }
  }
});