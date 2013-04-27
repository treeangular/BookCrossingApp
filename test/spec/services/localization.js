'use strict';

describe('Service: localization', function () {

  // load the service's module
  beforeEach(module('localization'));

  // instantiate service
  var localization;
  beforeEach(inject(function (_localize_) {
    localization = _localize_;
  }));

  it('should do something', function () {
    expect(!!localization).toBe(true);
  });

});
