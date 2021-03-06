/**
 * Copyright (c) 2016 Chris Baker <mail.chris.baker@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

require('should');

const Hash = require('../../plugs/hash');
const ExpectUsernameAvailable = require('.');

describe('ExpectUsernameAvailable', function () {
  beforeEach(function () {
    this.usernameJack = new Hash();

    this.expectUsernameAvailable = new ExpectUsernameAvailable()
      .withUsernameJack(this.usernameJack)
      .withUsername('jdoe');
  });

  describe('when the username is undefined', function () {
    beforeEach(function () {
      this.expectUsernameAvailable.withUsername();
    });

    it('should throw a UsernameUndefinedError', function () {
      return this.expectUsernameAvailable.perform()
        .should.be.rejectedWith({
          name: 'UsernameUndefinedError',
          message: 'A username must be defined',
          status: 400
        });
    });
  });

  describe('when the username is available', function () {
    it('should return the username', function () {
      return this.expectUsernameAvailable.perform()
        .should.be.fulfilledWith('jdoe');
    });
  });

  describe('when the username is registered', function () {
    beforeEach(function () {
      return this.usernameJack.set('jdoe', '1234');
    });

    it('should throw a UsernameConflictError', function () {
      return this.expectUsernameAvailable.perform()
        .should.be.rejectedWith({
          name: 'UsernameConflictError',
          message: 'The specified username is taken',
          username: 'jdoe',
          status: 409
        });
    });
  });
});
