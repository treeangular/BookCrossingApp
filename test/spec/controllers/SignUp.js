'use strict';

describe('Controller: SignUpCtrl', function() {

  // load the controller's module
  beforeEach(module('BookCrossingAppYeomanApp'));

  var SignUpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    SignUpCtrl = $controller('SignUpCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
