interface voucherDto {
    id: number;
    name: string;
    status: number;
    timeStart : string;
    timeEnd : string;
    min_Order_Value : number;
    max_Discount : number;
    stock : number;
    discount: number;
    discountType : string;
}
export {voucherDto};