class expressError extends Error{
    constructor(statusCode,message){
        super();       //super() inside a constructor invokes the constructor of the parent (superclass).
        this.statusCode = statusCode;
        this.message = message;

    }
}

module.exports = expressError;