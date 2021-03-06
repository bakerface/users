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

const ExpectUsernameValid = require('../expect-username-valid');

class UsernameNotFoundError extends Error {
  constructor(username) {
    super();

    this.name = 'UsernameNotFoundError';
    this.message = 'The specified username could not be found';
    this.username = username;
    this.status = 404;
  }
}

module.exports = class {
  withUsernameJack(usernameJack) {
    this.usernameJack = usernameJack;
    return this;
  }

  withUsername(username) {
    this.username = username;
    return this;
  }

  checkValidUsername() {
    return new ExpectUsernameValid()
      .withUsername(this.username)
      .perform();
  }

  checkRegisteredId(id) {
    if (id) {
      return id;
    }

    throw new UsernameNotFoundError(this.username);
  }

  checkRegisteredUsername() {
    return this.usernameJack.get(this.username)
      .then(this.checkRegisteredId.bind(this));
  }

  perform() {
    return Promise.resolve()
      .then(this.checkValidUsername.bind(this))
      .then(this.checkRegisteredUsername.bind(this));
  }
};
