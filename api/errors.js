class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends DomainError { }

class ResourceNotFoundError extends NotFoundError {
  constructor(resource, id) {
    super(`Resource ${resource}::${id} was not found.`);
  }
}

class RouteNotFoundError extends NotFoundError {
  constructor(method, route) {
    super(`[${method}] ${route} was not found.`);
  }
}

class FormValidationError extends DomainError {
  constructor(errors) {
    super('Validation failed.');
    this.violations = errors;
  }
}

module.exports = {
  NotFoundError,
  ResourceNotFoundError,
  RouteNotFoundError,
  FormValidationError,
};
