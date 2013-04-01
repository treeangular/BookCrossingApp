'use strict';

describe('Controller: AddBookCtrl', function() {

  // load the controller's module
  beforeEach(module('BookCrossingAppYeomanApp'));

  var AddBookCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    AddBookCtrl = $controller('AddBookCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
