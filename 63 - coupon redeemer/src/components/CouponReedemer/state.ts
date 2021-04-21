export interface State {
    inputCode: string;
    renderCode: string;
    errorMsg: string;
    product: string;
    product_img: string;
    show_product: boolean;
}

export const initialState: State = {
    inputCode: "",
    renderCode: "",
    errorMsg: "",
    product: "",
    product_img: "",
    show_product: false,
}

export enum STATE_ACTION {
    UPDATE_CODE,
    SHOW_ERROR,
    RESET_ERROR,
    SHOW_SUCCESS
}

interface actionReducer {
    type: STATE_ACTION;
    payload: any;
}


export default function reducer(state: State, action: actionReducer): State {
    const nextState: State = {...state};

    switch (+action.type) {
        case STATE_ACTION.UPDATE_CODE:
            const match = action.payload.split("-").join("").match(/.{1,4}/g);
            const renderCode = match ? match.join("-").toUpperCase() : action.payload;

            nextState.inputCode = action.payload;
            nextState.renderCode = renderCode;
            break;

        case STATE_ACTION.SHOW_ERROR:
            nextState.errorMsg = action.payload;
            break;

        case STATE_ACTION.RESET_ERROR:
            nextState.errorMsg = "";
            break;

        case STATE_ACTION.SHOW_SUCCESS:
            nextState.product_img = action.payload.product_img;
            nextState.product = action.payload.product;
            nextState.show_product = true;
            break;

        default:
            break;
    }

    return nextState;
}
