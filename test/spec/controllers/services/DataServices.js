'use strict';

describe('Service: DataServices', function () {

  // load the service's module
  beforeEach(module('BookCrossingAppYeomanApp'));

  // instantiate service
  var DataServices;
  beforeEach(inject(function(_DataServices_) {
    DataServices = _DataServices_;
  }));

  it('should do something', function () {
    expect(!!DataServices).toBe(true);
  });

});
