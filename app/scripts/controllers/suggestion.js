/**
 * Created with JetBrains WebStorm.
 * User: Javito
 * Date: 2/11/13
 * Time: 18:15
 * To change this template use File | Settings | File Templates.
 */
BookCrossingApp.controller('SuggestionCtrl', function ($scope, $rootScope, dataService, $q) {

    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"Suggestion");

    $scope.suggestion = {
        content: ""
    }

    function saveSuggestion(suggestion)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        dataService.addSuggestion(suggestion, function (isSuccess, result) {

            $scope.$apply(function(){
                if(isSuccess)
                {
                    deferred.resolve(result);
                }
                else
                {
                    deferred.reject(result);
                }
            });
        });

        return deferred.promise;
    }

    $scope.sendSuggestion = function (suggestion) {

        $scope.clicked = true;
        var promise = saveSuggestion(suggestion)
        promise.then(function(suggestion) {

            $rootScope.$broadcast(loadingRequestConst.Stop);
            $scope.clicked = false;
            $scope.goTo('views/home.html');
        }, function(reason) {

            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
        });


    }

});
