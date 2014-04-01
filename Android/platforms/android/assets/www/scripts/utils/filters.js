angular.module('filters', [])

    .filter('roundedTime', [function () {
        return function (input) {
           return getRoundedTime(input)
        }
    }])
    .filter('truncateString', [function(){
        return function(input){
            return truncateString(input)
        }

    }]);
