export enum statusCode{
    //success request (200-299)
    OK=200,
    CREATED=201,
    NO_CONTENT=204,

    //client error request (400-499)
    BAD_REQUEST=400,
    UNAUTHORIZED=401,
    FORBIDDEN=403,
    NOT_FOUND=404,
    CONFLICT=409,

    //server error request (500-599)
    INTERNAL_SERVER_ERROR=500,
    BAD_GATEWAY=502,
    SERVER_ANAILABLE=503

}