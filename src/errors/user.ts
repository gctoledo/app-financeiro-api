export class EmailAlreadyInUseError extends Error {
  constructor(email: string) {
    super(`The e-mail ${email} is already in use.`);
    this.name = "EmailAlreadyInUseError";
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super(`The user was not found.`);
    this.name = "UserNotFoundError";
  }
}

export class AuthenticationError extends Error {
  constructor() {
    super(`The email or password is invalid.`);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor() {
    super(`Authentication is not provided.`);
    this.name = "AuthorizationError";
  }
}

export class InvalidIdError extends Error {
  constructor() {
    super(`The provided id is not valid.`);
    this.name = "InvalidIdError";
  }
}
