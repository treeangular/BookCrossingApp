'use strict';

describe('Service: isbn', function () {

  // load the service's module
  beforeEach(module('BookCrossingAppApp'));

  // instantiate service
  var isbn;
  beforeEach(inject(function (_isbn_) {
    isbn = _isbn_;
  }));

  it('should do something', function () {
    expect(!!isbn).toBe(true);
  });

});
