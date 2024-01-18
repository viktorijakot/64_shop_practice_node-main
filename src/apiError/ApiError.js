class ApiError extends Error {
  constructor(message, status = 500, type = '') {
    super(message);
    this.status = status;
    this.type = type;
  }
}

// const rez = new ApiError('ivyko klaida', 400, 'validation');
// console.log(rez)

module.exports = ApiError;
