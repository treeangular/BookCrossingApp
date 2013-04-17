'use strict';

describe('Service: facebookService', function () {

  // load the service's module
  beforeEach(module('BookCrossingApp'));

  // instantiate service
  var facebookService;
  beforeEach(inject(function (_facebookService_) {
    facebookService = _facebookService_;
  }));

  it('should do something', function () {
    expect(!!facebookService).toBe(true);
  });

});
