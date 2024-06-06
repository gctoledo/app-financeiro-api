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
