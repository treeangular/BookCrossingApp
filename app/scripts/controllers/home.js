'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope) {
	$scope.alerts = [
        {type:'book', title:'A Clockwork orange', content: 'has been released arround you by PersonName'
		, image:'styles/img/books/a_clockwork_orange.jpg', time:'1 min'},
		{type:'book', title:'Lords of the Rings', content: 'has been released arround you by PersonName'
		, image:'styles/img/books/lord_of_the_rings.jpg', time:'15 min'},
		{type:'ad', image:'styles/img/ads/amazon.jpg'},
        {type:'book', title:'1Q84',  content: 'has been commented by PersonName'
		, image:'styles/img/books/1q84.jpg', time:'5 min'},
		{type:'book', title:'Lords of the Rings',  content: 'has been hunted by PersonName'
		, image:'styles/img/books/lord_of_the_rings.jpg' , time:'10 hours'},
		{type:'ad', image:'styles/img/ads/mcdonalls.jpg'}
    ];

  $scope.busy = false;

  $scope.nextPage  = function() {
    if ($scope.busy) return;
    $scope.busy = true;
    
	$scope.newalert = {
		type:'book', 
		title:'Lords of the Rings', 
		content: 'has been released arround you by PersonName', 
		image:'styles/img/books/lord_of_the_rings.jpg', 
		time:'2 days'
	};
		   
	for(var i = 1; i <= 3; i++) {
      $scope.alerts.push($scope.newalert);
    }
    
	$scope.busy = false;
  };
});