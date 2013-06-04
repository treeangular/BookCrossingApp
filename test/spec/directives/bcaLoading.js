'use strict';

describe('Directive: bcaLoading', function () {
  beforeEach(module('BookCrossingAppApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<bca-loading></bca-loading>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the bcaLoading directive');
  }));
});
