class customError extends Error{
   constructor(status,msg){
       super();
       this.status=status;
       this.message=msg;
   }

    static alreadyExist(message) {
        return new customError(409, message);
    }

    static wrongCredentials(message = 'email or password is wrong!') {
        return new customError(401, message);
    }

    static unAuthorized(message = 'unAuthorized') {
        return new customError(401, message);
    }

    static notFound(message = '404 Not Found') {
        return new customError(404, message);
    }

    static serverError(message = 'Internal server error') {
        return new customError(500, message);
    }
}

module.exports=customError;