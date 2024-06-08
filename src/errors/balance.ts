export class BalanceNotFoundError extends Error {
  constructor() {
    super(`The balance was not found.`);
    this.name = "UserNotFoundError";
  }
}
