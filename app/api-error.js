class ApiError extends Error {
    constructor(statuscode, message){
    super();
    this.statuscode = statuscode;
    this.message = message;
    }
}
module.exports = ApiError;