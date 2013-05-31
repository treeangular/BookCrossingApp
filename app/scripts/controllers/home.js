'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService, $rootScope) {

    $scope.alerts = [];
    $scope.currentPage = 0;

    if($rootScope.currentUser == undefined)
    {
        dataService.isCurrentUser(function (result, currentUser) {
            if (result) {
                $rootScope.currentUser = currentUser;
            }
        });
    }


    $scope.getActPage = function (pageNumber) {
	dataService.getActionsForHomePage(pageNumber, function (results) {
        $scope.$apply(function () {
            //TODO: Load only first page and then use paging in the NextPage function!
            $scope.actionList = results;
			for (var i=0;i<results.length;i++)
			{
			var action = results[i];
			var book = action.get('book');
			var actionType = action.get('actionType');
			var user = action.get('user');
			var title = "not defined";
			var description = "not defined";
			var username = "not defined";
            var image = "not defined";
			var time;
			//TODO: Move in a directive?

            time = getRoundedTime(action.createdAt);

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
                var typeId = actionType.get('objectId');

                //TODO: User localization here!!!!
                switch(typeId){
                    case ActionTypesConst.Registered:
                        description= "has been registered by ";
                        break;
                    case ActionTypesConst.Joined:
                        description= "has been joined by ";
                        break;
                    case ActionTypesConst.Locked:
                        description= "has been locked by ";
                        break;
                    case ActionTypesConst.Released:
                        description= "has been released around you by ";
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
				username: username,
				time:time,
                user: user

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