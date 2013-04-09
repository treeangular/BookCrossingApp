'use strict';

describe('Controller: SignUpCtrl', function() {

    var scope;
    var ParseServiceMock;
    var SignInCtrl;

    // load the controller's module
    beforeEach(module('BookCrossingApp'));

    // define the mock Parse service
    beforeEach(function() {
        ParseServiceMock = {
            registerNewUser:function (user) {
            }
        };
    });
    // inject the required services and instantiate the controller
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        SignInCtrl = $controller('SignUpCtrl', {
            $scope: scope, DataService: ParseServiceMock
        });
    }));

    it('should call signUp Parse Service method', function () {

        var user = {username:"JavitoFoo", email:"javierhertfelderFoo@gmail.com", password:"123"};

        spyOn(ParseServiceMock, 'registerNewUser').andCallThrough();
        scope.registerNewUser(user);
        expect(ParseServiceMock.registerNewUser).toHaveBeenCalled();


    });

});
