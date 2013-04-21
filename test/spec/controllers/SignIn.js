'use strict';
describe('Controller: SignInCtrl', function() {

    var scope;
    var parseServiceMock;
    var SignInCtrl;

    // load the controller's module
    beforeEach(module('BookCrossingApp'));

    // define the mock Parse service
    beforeEach(function() {
        parseServiceMock = {
            signIn:function (email, password, callback) {
            }
        };
    });
    // inject the required services and instantiate the controller
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        SignInCtrl = $controller('SignInCtrl', {
            $scope: scope, dataService: parseServiceMock
        });
    }));
    it('should Facebook not be null', function(){

    })

    it('should call signIn Parse Service method', function () {

        var user = {username:"JavitoFoo", email:"javierhertfelderFoo@gmail.com", password:"123"};

        spyOn(parseServiceMock, 'signIn').andCallThrough();
        scope.signInUser(user);
        expect(parseServiceMock.signIn).toHaveBeenCalled();


    });
});
