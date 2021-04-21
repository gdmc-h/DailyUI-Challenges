export enum ERROR {
    COUPON_NOT_FOUND,
    COUPON_EXPIRED,
    COUPON_OUT_OF_RANGE
}

export interface IError {
    code: ERROR;
    msg: string;
}

function throwError(code: ERROR): IError {

    const returnError: IError = {
        code,
        msg: ""
    };

    switch (+code) {
        case ERROR.COUPON_EXPIRED:
            returnError.msg = "This coupon has expired.";
            break;
        case ERROR.COUPON_OUT_OF_RANGE:
            returnError.msg = "The coupon should have a length of 19 characters.";
            break;
        case ERROR.COUPON_NOT_FOUND:
            returnError.msg = "This coupon does not exists.";
            break;
    }

    return returnError;

}

export default throwError;
