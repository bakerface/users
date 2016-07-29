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

class UsernameUndefinedError extends Error {
  constructor() {
    super();

    this.name = 'UsernameUndefinedError';
    this.message = 'A username must be defined';
    this.status = 400;
  }
}

function expectDefined(username) {
  if (typeof username === 'undefined') {
    throw new UsernameUndefinedError();
  }

  return username;
}

class UsernameTypeError extends Error {
  constructor(username) {
    super();

    this.name = 'UsernameTypeError';
    this.message = 'The specified username is not a string';
    this.status = 400;
    this.username = username;
  }
}

function expectString(username) {
  if (typeof username !== 'string') {
    throw new UsernameTypeError(username);
  }

  return username;
}

module.exports = function (username) {
  return Promise.resolve(username)
    .then(expectDefined)
    .then(expectString);
};
