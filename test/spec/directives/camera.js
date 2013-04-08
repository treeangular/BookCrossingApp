'use strict';

describe('Directive: camera', function () {
  beforeEach(module('BookCrossingAppApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<camera></camera>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the camera directive');
  }));
});
