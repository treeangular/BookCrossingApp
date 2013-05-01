'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService) {

    $scope.alerts = [];
	//Some test books. TODO: Remove them when we
	//$scope.alerts = [
    //    {type:'book', title:'A Clockwork orange', content: 'has been released arround you by PersonName'
	//	, image:'styles/img/books/a_clockwork_orange.jpg', time:'1 min'},
	//	{type:'book', title:'Lords of the Rings', content: 'has been released arround you by PersonName'
	//	, image:'styles/img/books/lord_of_the_rings.jpg', time:'15 min'},
	//	{type:'ad', image:'styles/img/ads/amazon.jpg'},
	//	{type:'book', title:'A Clockwork orange', content: 'has been released arround you by PersonName'
	//	, image:'styles/img/books/a_clockwork_orange.jpg', time:'1 min'},
     //   {type:'book', title:'1Q84',  content: 'has been commented by PersonName'
	//	, image:'styles/img/books/1q84.jpg', time:'5 min'},
	//	{type:'ad', image:'styles/img/ads/mcdonalls.jpg'}
    //];
	
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
			var time;
			//TODO: Move in a directive?
		
			var seconds = Math.round((new Date()-action.createdAt)/1000);
			var minutes = Math.round(seconds/60);
			var hours = Math.round(minutes/60);
			var days = Math.round(hours/24);
			
			if(seconds < 60)
				time = seconds + ' sec';
			else if(minutes < 60)
				time = minutes + ' min';
			else if(hours < 24)
				time = hours + ' hours';
			else
				time = days + ' days';
			
			if (book != null)
				title = book.get('title');
			if (actionType != null)
				description = actionType.get('description');
			if (user != null)
				username = user.get('username');
			
			
			$scope.newalert = {
				type:'book', 
				title: title, 
				//TODO: Add localization
				content: description,
				image:'styles/img/books/a_clockwork_orange.jpg',
				user: username,
				time:time
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