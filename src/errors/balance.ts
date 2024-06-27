export class BalanceNotFoundError extends Error {
  constructor() {
    super(`The balance was not found.`);
    this.name = "UserNotFoundError";
  }
}

export class BalanceAuthError extends Error {
  constructor() {
    super(`The balance id and user id do not match.`);
    this.name = "BalanceAuthError";
  }
}
