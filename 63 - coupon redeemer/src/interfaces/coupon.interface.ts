export default interface ICoupon {
    code: string;
    img: string;
    valid_until: string;
    product: string;
}

export type Coupon = ICoupon | undefined;
