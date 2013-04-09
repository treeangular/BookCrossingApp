'use strict';

describe('Controller: AddBookCtrl', function() {

    var scope;
    var ParseServiceMock;
    var AddBookCtrl;

  // load the controller's module
  beforeEach(module('BookCrossingApp'));

    // define the mock Parse service
    beforeEach(function() {
        ParseServiceMock = {

            registerBook: function(book) {


            },
            getBookRegistrationId: function()
            {

            }

       };
    });
        // inject the required services and instantiate the controller
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        AddBookCtrl = $controller('AddBookCtrl', {
            $scope: scope, DataService: ParseServiceMock
        });
        }));

    it('should call registerBook Parse Service method', function () {

        var book = {title: "Hola que ase!"}

        spyOn(ParseServiceMock, 'registerBook').andCallThrough();
        //spyOn(ParseServiceMock, 'getBookRegistrationId').andCallThrough();
        scope.registerNewBook(book);

        expect(ParseServiceMock.registerBook).toHaveBeenCalled();
        //expect(ParseServiceMock.getBookRegistrationId).toHaveBeenCalled();

    });

    it('Dummy test', function () {
        expect(true).toBe(true);
    });
});
