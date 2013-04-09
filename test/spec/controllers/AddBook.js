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
        //TODO hev: missing call to our method registerNewBook of the Controller
        //Visit http://evanhahn.com/how-do-i-jasmine/ to get a clear explanation about jasmine!!
        //We need to get the injector from angular
        var $injector = angular.injector([ 'DataServices' ]);
        //We get the service from the injector that we have called
        var mockService = $injector.get( 'ParseService' );
        //With this call we SPY the method registerBook of our mockservice
        spyOn(mockService, "registerBook");
        //we have to make sure that the register book have been called after the call of our Controller

        expect(mockService.registerBook).toHaveBeenCalled();
        //Dummy test
        expect(true).toEqual(true);
    });
    it('Dummy test', function () {
        expect(true).toBe(true);
    });
});
