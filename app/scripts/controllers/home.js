'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService) {

    $scope.alerts = [];
    $scope.currentPage = 0;

    $scope.getActPage = function (pageNumber) {
	dataService.getActionsPage(pageNumber, function (results) {
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
            var image = "not defined";
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
            {
                title = book.get('title');
                image = book.get('image');
            }
			if (actionType != null)
				description = actionType.get('description');

			if (user != null)
				username = user.get('nick');

            if (actionType != null){
                var typeId = actionType.get('description');

                //TODO: User localization here!!!!
                switch(typeId){
                    case 'registered':
                        description= "has been registered by ";
                        break;
                    case 'joined':
                        description= "has been joined by ";
                        break;
                    case 'locked':
                        description= "has been locked by ";
                        break;
                    case 'released':
                        description= "has been released around you by ";
                    default:
                        description= typeId + " " + username;
                        break;
                }
            }
			
			
			$scope.newalert = {
				type:'book',
                id: book.id,
				title: title, 
				//TODO: Add localization
				content: description,
				image: image,
				user: username,
				time:time
			};
			$scope.alerts.push($scope.newalert);
            console.log("Getting books from database! Page number: " + pageNumber + " BookId: " + book.id);
			}
        });
    });
    };

  $scope.busy = false;

  $scope.nextPage  = function() {
    if ($scope.busy) return;
    $scope.busy = true;

      $scope.getActPage($scope.currentPage);
      $scope.currentPage = $scope.currentPage + 1

	$scope.busy = false;
  };

});