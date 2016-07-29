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

const validateUsername = require('.');

describe('validating a username', function () {
  it('should return usernames that are valid', function () {
    return validateUsername('jdoe').should.be.fulfilledWith('jdoe');
  });

  it('should reject usernames that are undefined', function () {
    return validateUsername().should.be.rejectedWith({
      name: 'UsernameUndefinedError',
      message: 'A username must be defined',
      status: 400
    });
  });

  it('should reject usernames that are not strings', function () {
    return validateUsername(0).should.be.rejectedWith({
      name: 'UsernameTypeError',
      message: 'The specified username is not a string',
      status: 400,
      username: 0
    });
  });

  it('should reject usernames that are too short', function () {
    return validateUsername('').should.be.rejectedWith({
      name: 'UsernameMinimumLengthError',
      message: 'The specified username is too short',
      status: 400,
      username: ''
    });
  });

  it('should reject usernames that are too long', function () {
    const username = '123456789012345678901234567890';

    return validateUsername(username).should.be.rejectedWith({
      name: 'UsernameMaximumLengthError',
      message: 'The specified username is too long',
      status: 400,
      username: username
    });
  });
});
