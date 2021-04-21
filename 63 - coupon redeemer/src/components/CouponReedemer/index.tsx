import React, {FunctionComponent, useEffect, useReducer, useRef} from "react";
import data from "../../data.json";
import moment from "moment";

import reducer, {initialState, STATE_ACTION} from "./state";
import throwError, {ERROR} from "../../libs/error.lib";

import InsertCouponLayout from "./layouts/insertCoupon.layout";
import ShowProduct from "./layouts/showProduct.layout";
import ICoupon, {Coupon} from "../../interfaces/coupon.interface";
import Card from "../../ui/card";
import styled from "styled-components";

const SpanTitle = styled.div`
  text-align: center;
  & > h1 {
    font-family: "Dancing Script", cursive;
  }
`;

const CouponReedemerComponent: FunctionComponent = function() {
   const [state, dispatch] = useReducer(reducer, initialState);
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
       if (inputRef.current) {
           inputRef.current.value = state.renderCode;
       }
   }, [state.renderCode])


    /**
    * @desc validates and updates the coupon
    * @return void
    */

   function validateAndUpdateCoupon(): void{
       ///@ts-ignore
       const value = inputRef.current.value;

       if ( value.length > 19 || value.length < 19) {
           dispatch({type: STATE_ACTION.SHOW_ERROR, payload: throwError(ERROR.COUPON_OUT_OF_RANGE).msg})
       }

       dispatch({
           type: STATE_ACTION.UPDATE_CODE,
           payload: value
       });
   }

   /**
   * @desc Search if the coupon exists or is expired.
   * @return void
   */
   function submitCoupon(): void {

       if (state.renderCode.length > 19) {
           dispatch({type: STATE_ACTION.SHOW_ERROR, payload: throwError(ERROR.COUPON_OUT_OF_RANGE).msg})
           return;
       }

       const coupon: Coupon = data.coupons.find((coupon: ICoupon) => coupon.code === state.renderCode);

       if (coupon)
       {

           /**
            * Check if the coupon has expired. If it has, we should dispatch an error alert.
            */
           const HAS_EXPIRED = moment(coupon.valid_until, 'DD/MM/YYYY').isBefore(moment());

           if (HAS_EXPIRED)
           {
                dispatch({
                    type: STATE_ACTION.SHOW_ERROR,
                    payload: throwError(ERROR.COUPON_EXPIRED).msg,
                });

                return;
           }

           /**
            * Clean the errors if the coupon is valid.
            */
           if (state.errorMsg !== null)
           {
               dispatch({
                   type: STATE_ACTION.RESET_ERROR,
                   payload: ""
               });
           }


           /**
            * Dispatch the SHOW_SUCCESS action. The coupon is valid.
            */
           dispatch({type: STATE_ACTION.SHOW_SUCCESS, payload: {product: coupon.product, product_img: coupon.img}})

           return;
       }

       /**
        * Dispatch the COUPON_NOT_FOUND error.
        */
       dispatch({
           type: STATE_ACTION.SHOW_ERROR,
           payload: throwError(ERROR.COUPON_NOT_FOUND).msg
       });

   }

   return(
       <Card>
           <SpanTitle>
               <h1>Generic Ecommerce Title</h1>
           </SpanTitle>
           {!state.show_product && (
               <InsertCouponLayout
                   submitCoupon={submitCoupon}
                   validateCoupon={validateAndUpdateCoupon}
                   inputRef={inputRef}
                   errorMsg={state.errorMsg}
               />
           )}
           {state.show_product && (
                <ShowProduct
                    product_img={state.product_img}
                    product={state.product}
                />
           )}
       </Card>
   );
}


export default CouponReedemerComponent;
