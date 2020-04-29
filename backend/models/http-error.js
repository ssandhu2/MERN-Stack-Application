class httpError extends Error {
  //based on built in error
  constructor(message, errorCode) {
    //allows us to run whenever we instantiate
    super(message); // add a message property
    this.code = errorCode; //adds a code property
  }
}

module.exports = httpError;
