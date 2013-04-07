'use strict';

describe('Controller: AddBookCtrl', function() {

//  // load the controller's module
  beforeEach(module('BookCrossingApp'));


  var AddBookCtrl, scope, book;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    book = {title: "fooTitle"};
    AddBookCtrl = $controller('AddBookCtrl', {
      $scope: scope
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

        AddBookCtrl.registerNewBook(book);
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
