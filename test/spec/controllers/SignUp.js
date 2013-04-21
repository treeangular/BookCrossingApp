'use strict';

describe('Controller: SignUpCtrl', function() {

    var scope;
    var parseServiceMock;
    var SignInCtrl;

    // load the controller's module
    beforeEach(module('BookCrossingApp'));

    // define the mock Parse service
    beforeEach(function() {
        parseServiceMock = {
            registerNewUser:function (user) {
            }
        };
    });
    // inject the required services and instantiate the controller
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        SignInCtrl = $controller('SignUpCtrl', {
            $scope: scope, dataService: parseServiceMock
        });
    }));

    it('should call signUp Parse Service method', function () {

        var user = {username:"JavitoFoo", email:"javierhertfelderFoo@gmail.com", password:"123"};

        spyOn(parseServiceMock, 'registerNewUser').andCallThrough();
        scope.registerNewUser(user);
        expect(parseServiceMock.registerNewUser).toHaveBeenCalled();


    });

});
