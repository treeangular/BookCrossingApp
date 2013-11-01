'use strict';

angular.module('localization', []).
    factory('localize', ['$http','$rootScope', '$window', '$filter', function ($http, $rootScope, $window, $filter) {

    var localize = {

        // use the $window service to get the language of the user's browser
        language: $window.navigator.userLanguage || $window.navigator.language,
        // array to hold the localized resource string entries
        dictionary:[],
        // flag to indicate if the service hs loaded the resource file
        resourceFileLoaded:false,

        successCallback:function (data) {
            // store the returned array in the dictionary
            localize.dictionary = data;
            // set the flag that the resource are loaded
            localize.resourceFileLoaded = true;
            // broadcast that the file has been loaded
            $rootScope.$broadcast('localizeResourcesUpdates');
        },

        initLocalizedResources:function() {
            if (typeof navigator.globalization != 'undefined')
            {
                navigator.globalization.getPreferredLanguage(
                    function (language) {
                        alert(language.value);
                        var url = 'resources/resource.' + language.value + '.js';
                        $rootScope.language = language.value;

                        // request the resource file
                        $http({ method:"GET", url:url, cache:false }).success(localize.successCallback).error(function () {
                            // the request failed set the url to the default resource file
                            var url = 'resources/resource.default.js';
                            // request the default resource file
                            $http({ method:"GET", url:url, cache:false }).success(localize.successCallback);
                        });
                    },
                    function () {alert('Error getting language\n');}
                );
            }
            else
            {
                var url = 'resources/resource.' + 'en' + '.js';
                $rootScope.language = 'en';

                // request the resource file
                $http({ method:"GET", url:url, cache:false }).success(localize.successCallback).error(function () {
                    // the request failed set the url to the default resource file
                    var url = 'resources/resource.default.js';
                    // request the default resource file
                    $http({ method:"GET", url:url, cache:false }).success(localize.successCallback);
                });

            }


        },

        getLocalizedString:function (value) {

            // default the result to an empty string
            var result = '';
            // check to see if the resource file has been loaded
            if (!localize.resourceFileLoaded) {
                // call the init method
                localize.initLocalizedResources();
                // set the flag to keep from looping in init
                localize.resourceFileLoaded = true;
                // return the empty string
                return result;
            }
            // make sure the dictionary has valid data
            if ((localize.dictionary !== []) && (localize.dictionary.length > 0)) {
                // use the filter service to only return those entries which match the value
                // and only take the first result
                var entry = $filter('filter')(localize.dictionary, {key:value})[0];
                // check to make sure we have a valid entry
                if ((entry !== null) && (entry != undefined)) {
                    // set the result
                    result = entry.value;
                }
            }
            // return the value to the call
            return result;

        }
    };
    return localize;
}]).
    filter('localizeIt', ['localize', function (localize) {
    return function (input) {
        return localize.getLocalizedString(input);
    };
}])
    // translation directive that can handle dynamic strings
    // updates the text value of the attached element
    // usage <span data-localize-it="TOKEN" ></span>
    // or
    // <span data-localize-it="TOKEN|VALUE1|VALUE2" ></span>
    .directive('localizeIt', ['localize', function(localize){
    var localizeItDirective = {
        restrict:"EAC",
        updateText:function(elm, token){
            var values = token.split('|');
            if (values.length >= 1) {
                // construct the tag to insert into the element
                var tag = localize.getLocalizedString(values[0]);
                // update the element only if data was returned
                if ((tag !== null) && (tag !== undefined) && (tag !== '')) {
                    if (values.length > 1) {
                        for (var index = 1; index < values.length; index++) {
                            var target = '{' + (index - 1) + '}';
                            tag = tag.replace(target, values[index]);
                        }
                    }
                    // insert the text into the element
                    elm.text(tag);
                };
            }
        },

        link:function (scope, elm, attrs) {
            scope.$on('localizeResourcesUpdates', function() {
                localizeItDirective.updateText(elm, attrs.localizeIt);
            });

            attrs.$observe('localizeIt', function (value) {
                localizeItDirective.updateText(elm, attrs.localizeIt);
            });
        }
    };

    return localizeItDirective;
}]).
    // translation directive that can handle dynamic strings
    // updates the attribute value of the attached element
    // usage <span data-localize-it-attr="TOKEN|ATTRIBUTE" ></span>
    // or
    // <span data-localize-it-attr="TOKEN|ATTRIBUTE|VALUE1|VALUE2" ></span>
    directive('localizeItAttr', ['localize', function (localize) {
    var localizeItAttrDirective = {
        restrict: "EAC",
        updateText:function(elm, token){
            var values = token.split('|');
            // construct the tag to insert into the element
            var tag = localize.getLocalizedString(values[0]);
            // update the element only if data was returned
            if ((tag !== null) && (tag !== undefined) && (tag !== '')) {
                if (values.length > 2) {
                    for (var index = 2; index < values.length; index++) {
                        var target = '{' + (index - 2) + '}';
                        tag = tag.replace(target, values[index]);
                    }
                }
                // insert the text into the element
                elm.attr(values[1], tag);
            }
        },
        link: function (scope, elm, attrs) {
            scope.$on('localizeResourcesUpdated', function() {
                localizeItAttrDirective.updateText(elm, attrs.localizeItAttr);
            });

            attrs.$observe('localizeItAttr', function (value) {
                localizeItAttrDirective.updateText(elm, value);
            });
        }
    };

    return localizeItAttrDirective;
}]);