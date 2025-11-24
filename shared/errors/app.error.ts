
class AppError extends Error{
    statusCode:number
    error:object

    constructor(msg:string,statusCode:number, error?:object){
        super(msg)
        this.statusCode=statusCode
        this.error=error||{}
    }
}

export default AppError