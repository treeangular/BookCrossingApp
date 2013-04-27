'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope) {
	$scope.alerts = [
        {content: 'BookName released arround you by PersonName'
		, image:'http://3.bp.blogspot.com/-arafgNLf0uM/UGjecgi0-vI/AAAAAAAAAFQ/YLq4YY1B1cs/s1600/Lord+of+the+Rings.jpg'},
		{content: 'BookName released arround you by PersonName', image:'http://3.bp.blogspot.com/-arafgNLf0uM/UGjecgi0-vI/AAAAAAAAAFQ/YLq4YY1B1cs/s1600/Lord+of+the+Rings.jpg'},
        {content: 'BookName released arround you by PersonName', image:'http://3.bp.blogspot.com/-arafgNLf0uM/UGjecgi0-vI/AAAAAAAAAFQ/YLq4YY1B1cs/s1600/Lord+of+the+Rings.jpg'},
		{content: 'BookName released arround you by PersonName', image:'http://3.bp.blogspot.com/-arafgNLf0uM/UGjecgi0-vI/AAAAAAAAAFQ/YLq4YY1B1cs/s1600/Lord+of+the+Rings.jpg'},
        {content: 'BookName released arround you by PersonName', image:'http://3.bp.blogspot.com/-arafgNLf0uM/UGjecgi0-vI/AAAAAAAAAFQ/YLq4YY1B1cs/s1600/Lord+of+the+Rings.jpg'}
    ];

  $scope.busy = false;

  $scope.nextPage  = function() {
    if ($scope.busy) return;
    $scope.busy = true;
    
	$scope.newalert = {
		content: 'BookName released arround you by PersonName', 
		image:'http://3.bp.blogspot.com/-arafgNLf0uM/UGjecgi0-vI/AAAAAAAAAFQ/YLq4YY1B1cs/s1600/Lord+of+the+Rings.jpg'
	};
		   
	for(var i = 1; i <= 3; i++) {
      $scope.alerts.push($scope.newalert);
    }
    
	$scope.busy = false;
  };
});