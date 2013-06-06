'use strict';

describe('Service: localStorage', function () {

  // load the service's module
  beforeEach(module('BookCrossingAppApp'));

  // instantiate service
  var localStorage;
  beforeEach(inject(function (_localStorage_) {
    localStorage = _localStorage_;
  }));

  it('should do something', function () {
    expect(!!localStorage).toBe(true);
  });

});
