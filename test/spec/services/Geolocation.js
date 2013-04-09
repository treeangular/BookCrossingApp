'use strict';

describe('Service: Geolocation', function () {

  // load the service's module
  beforeEach(module('BookCrossingAppApp'));

  // instantiate service
  var Geolocation;
  beforeEach(inject(function (_Geolocation_) {
    Geolocation = _Geolocation_;
  }));

  it('should do something', function () {
    expect(!!Geolocation).toBe(true);
  });

});
