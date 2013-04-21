'use strict';

describe('Controller: AddBookCtrl', function() {

    var scope;
    var parseServiceMock;
    var AddBookCtrl;

  // load the controller's module
  beforeEach(module('BookCrossingApp'));

    // define the mock Parse service
    beforeEach(function() {
        parseServiceMock = {

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
            $scope: scope, dataService: parseServiceMock
        });
        }));

    it('should call registerBook Parse Service method', function () {

        var book = {title:"Hola que ase!"};

        spyOn(parseServiceMock, 'registerBook').andCallThrough();
        //spyOn(ParseServiceMock, 'getBookRegistrationId').andCallThrough();
        scope.registerNewBook(book);

        expect(parseServiceMock.registerBook).toHaveBeenCalled();
        //expect(ParseServiceMock.getBookRegistrationId).toHaveBeenCalled();

    });

    it('Dummy test', function () {
        expect(true).toBe(true);
    });
});
