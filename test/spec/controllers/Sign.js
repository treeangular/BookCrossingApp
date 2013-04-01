'use strict';

describe('Controller: SignCtrl', function() {

  // load the controller's module
  beforeEach(module('BookCrossingApp'));

  var SignCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    SignCtrl = $controller('SignCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
