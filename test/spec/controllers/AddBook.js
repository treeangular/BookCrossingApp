'use strict';

describe('Controller: AddBookCtrl', function() {

    var scope;
    var ParseService;
    var AddBookCtrl;
    var q;
    var deferred;

//  // load the controller's module
  beforeEach(module('BookCrossingApp'));

    // define the mock people service
    beforeEach(function() {
        ParseService = {
            registerBook: function() {
            deferred = q.defer();
            return deferred.promise;
            },
            GetBookRegistrationId: function()
            {

            }

       };
    });
        // inject the required services and instantiate the controller
    beforeEach(inject(function($rootScope, $controller, $q) {
         scope = $rootScope.$new();
         q = $q;
        AddBookCtrl = $controller('AddBookCtrl', {
            $scope: scope, $DataService: ParseService
        });
        }));
    it('should call Parse Service method', function () {

        spyOn(ParseService, 'registerBook').andCallThrough();
    });
    it('Dummy test', function () {
        expect(true).toBe(true);
    });
});
