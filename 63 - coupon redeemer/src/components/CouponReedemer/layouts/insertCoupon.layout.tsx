import React, {Ref,FunctionComponent} from "react";
import InputUI from "../../../ui/input";
import ButtonUI from "../../../ui/button";
import AlertUI from "../../../ui/alert";
import styled from "styled-components";

interface Props {
    submitCoupon(): void;
    validateCoupon(): void;
    inputRef: Ref<HTMLInputElement>;
    errorMsg: string;
}

const InputCouponUI= styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
`;

const SpanInput = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    align-content: center;
`;


const InsertCouponLayout: FunctionComponent<Props> = function(props) {
    return(
        <InputCouponUI data-testid={'insert-layout'}>
            <SpanInput>
                <p>Insert your Coupon Code to claim your free product on your next order 🔥</p>
                    <p>Coupon Code</p>
                    <InputUI
                        onInput={props.validateCoupon}
                        data-testid="input-coupon"
                        placeholder={'XXXX-XXXX-XXXX-XXXX'}
                        ref={props.inputRef}
                    />
                    {props.errorMsg && (
                        <AlertUI message={props.errorMsg}/>
                    )}

            </SpanInput>
            <ButtonUI data-testid="submit-coupon" onClick={props.submitCoupon} title={'Submit!'}/>
        </InputCouponUI>
    );
}


export default InsertCouponLayout;
