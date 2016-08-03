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

const ExpectUsernameValid = require('.');

describe('ExpectUsernameValid', function () {
  beforeEach(function () {
    this.validateUsername = new ExpectUsernameValid();
  });

  describe('when the username is undefined', function () {
    it('should throw a UsernameUndefinedError', function () {
      return this.validateUsername.perform()
        .should.be.rejectedWith({
          name: 'UsernameUndefinedError',
          message: 'A username must be defined',
          status: 400
        });
    });
  });

  describe('when the username is not a string', function () {
    beforeEach(function () {
      this.validateUsername.withUsername(0);
    });

    it('should throw a UsernameTypeError', function () {
      return this.validateUsername.perform()
        .should.be.rejectedWith({
          name: 'UsernameTypeError',
          message: 'The specified username is not a string',
          username: 0,
          status: 400
        });
    });
  });

  describe('when the username is too short', function () {
    beforeEach(function () {
      this.validateUsername.withUsername('');
    });

    it('should throw a UsernameMinimumLengthError', function () {
      return this.validateUsername.perform()
        .should.be.rejectedWith({
          name: 'UsernameMinimumLengthError',
          message: 'The specified username is too short',
          username: '',
          status: 400
        });
    });
  });

  describe('when the username is too long', function () {
    beforeEach(function () {
      this.validateUsername
        .withUsername('1234567890123456789012345678901234567890');
    });

    it('should throw a UsernameMaximumLengthError', function () {
      return this.validateUsername.perform()
        .should.be.rejectedWith({
          name: 'UsernameMaximumLengthError',
          message: 'The specified username is too long',
          username: '1234567890123456789012345678901234567890',
          status: 400
        });
    });
  });

  describe('when the username is not alphanumeric', function () {
    beforeEach(function () {
      this.validateUsername.withUsername('john-doe');
    });

    it('should throw a UsernameAlphanumericError', function () {
      return this.validateUsername.perform()
        .should.be.rejectedWith({
          name: 'UsernameAlphanumericError',
          message: 'The specified username is not alphanumeric',
          username: 'john-doe',
          status: 400
        });
    });
  });

  describe('when the username is valid', function () {
    beforeEach(function () {
      this.validateUsername.withUsername('jdoe');
    });

    it('should return the username', function () {
      return this.validateUsername.perform()
        .should.be.fulfilledWith('jdoe');
    });
  });
});
