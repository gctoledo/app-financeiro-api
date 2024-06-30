export class BalanceNotFoundError extends Error {
  constructor() {
    super(`The balance was not found.`);
    this.name = "BalanceNotFoundError";
  }
}

export class BalanceAuthError extends Error {
  constructor() {
    super(`The balance id and user id do not match.`);
    this.name = "BalanceAuthError";
  }
}

export class MissingParamsError extends Error {
  constructor(params: string) {
    super(`The following params are required: ${params}.`);
    this.name = "MissingParamsError";
  }
}
