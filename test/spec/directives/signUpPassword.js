'use strict';

describe('Directive: signUpPassword', function () {

  beforeEach(module('BookCrossingApp'));

  var element;

  it('Dummy Test!!', inject(function ($rootScope, $compile) {

    element = angular.element('<signUpPassword></signUpPassword>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the signUpPassword directive');

      //expect(true).toBe(true);
  }));
});
