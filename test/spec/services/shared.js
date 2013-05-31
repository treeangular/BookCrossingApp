'use strict';

describe('Service: shared', function () {

  // load the service's module
  beforeEach(module('BookCrossingAppApp'));

  // instantiate service
  var shared;
  beforeEach(inject(function (_shared_) {
    shared = _shared_;
  }));

  it('should do something', function () {
    expect(!!shared).toBe(true);
  });

});
