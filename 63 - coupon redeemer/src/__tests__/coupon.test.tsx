import {fireEvent, queryByText, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import throwError, {ERROR} from "../libs/error.lib";

describe("Coupon Tests", () => {
    const CODE_INPUT = "abcdefghilmnopqr";
    const CODE_OUTPUT = "abcd-efgh-ilmn-opqr";

    const CODE_WRONG = "thatiswrong";
    const CODE_EXPIRED = "1234123412341234";
    const CODE_OUT_OF_RANGE = "1111111111111111111111111111111111111111111111111111111111"

    it("should parse input correctly", () => {
        const {getByTestId} = render(<App/>);
        const input = getByTestId("input-coupon");

        expect(input).toBeInTheDocument();

        userEvent.type(input, CODE_INPUT);
        ///@ts-ignore
        expect(input.value).toBe(CODE_OUTPUT.toUpperCase());
    });

    it("should submit the code correctly and render the ShowProduct layout", () => {
        const {getByTestId, queryByTestId} = render(<App/>);

        const input = getByTestId("input-coupon");
        const submitButton = getByTestId("submit-coupon");

        expect(input).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        userEvent.type(input, CODE_INPUT);
        userEvent.click(submitButton);

        ///@ts-ignore
        const alert = queryByTestId("alert")
        expect(alert).toBe(null);

        const showLayoyt = queryByTestId("show-layout");
        expect(showLayoyt).toBeInTheDocument();
    });

    it("should throw ERROR.COUPON_NOT_FOUND",  () => {
        const {getByTestId, queryByText} = render(<App/>);
        const input = getByTestId("input-coupon");
        const submitButton = getByTestId("submit-coupon");

        expect(input).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        userEvent.type(input, CODE_WRONG);
        userEvent.click(submitButton);


        const alert = queryByText(throwError(ERROR.COUPON_NOT_FOUND).msg);
        expect(alert).toBeInTheDocument();

    });

    it("should throw ERROR.COUPON_EXPIRED", () => {

        const {getByTestId, queryByText} = render(<App/>);
        const input = getByTestId("input-coupon");
        const submitButton = getByTestId("submit-coupon");

        expect(input).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        userEvent.type(input, CODE_EXPIRED);
        userEvent.click(submitButton);


        const alert = queryByText(throwError(ERROR.COUPON_EXPIRED).msg);
        expect(alert).toBeInTheDocument();
    });
    it("should throw ERROR.COUPON_OUT_OF_RANGE", () => {

        const {getByTestId, queryByText} = render(<App/>);
        const input = getByTestId("input-coupon");

        expect(input).toBeInTheDocument();

        userEvent.type(input, CODE_OUT_OF_RANGE);

        const alert = queryByText(throwError(ERROR.COUPON_OUT_OF_RANGE).msg);
        expect(alert).toBeInTheDocument();
    });
})
