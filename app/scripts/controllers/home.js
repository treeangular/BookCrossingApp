'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService) {

	//Some test books. TODO: Remove them when we
	$scope.alerts = [
        {type:'book', title:'A Clockwork orange', content: 'has been released arround you by PersonName'
		, image:'styles/img/books/a_clockwork_orange.jpg', time:'1 min'},
		{type:'book', title:'Lords of the Rings', content: 'has been released arround you by PersonName'
		, image:'styles/img/books/lord_of_the_rings.jpg', time:'15 min'},
		{type:'ad', image:'styles/img/ads/amazon.jpg'},
		{type:'book', title:'A Clockwork orange', content: 'has been released arround you by PersonName'
		, image:'styles/img/books/a_clockwork_orange.jpg', time:'1 min'},
        {type:'book', title:'1Q84',  content: 'has been commented by PersonName'
		, image:'styles/img/books/1q84.jpg', time:'5 min'},
		{type:'ad', image:'styles/img/ads/mcdonalls.jpg'}
    ];
	
	dataService.getWholeActions(function (results) {
        $scope.$apply(function () {
            //TODO: Load only first page and then use paging in the NextPage function!
            $scope.actionList = results;
			for (var i=0;i<results.length;i++)
			{
			var action = results[i];
			var book = action.get('bookPointer');
			var actionType = action.get('actionTypePointer');
			var user = action.get('userPointer');
			
			var title = "not defined";
			var description = "not defined";
			var username = "not defined";
			
			if (book != null)
				title = book.get('title');
			if (actionType != null)
				description = actionType.get('Description');
			if (user != null)
				username = user.get('username');
			
			
			$scope.newalert = {
				type:'book', 
				title: title, 
				content: description,
				image:'styles/img/books/lord_of_the_rings.jpg',
				user: username,
				time:'2 days'
			};
			$scope.alerts.push($scope.newalert);
            console.log("Getting books from database!");
			}
        });
    });

  $scope.busy = false;

  $scope.nextPage  = function() {
    if ($scope.busy) return;
    $scope.busy = true;
    
	//TODO: Add here paging!
    
	$scope.busy = false;
  };
});