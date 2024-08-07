interface QLUser {
    id: number;
    fullName?: string;
    email?:string;
    userName?: string;
    address?:string;
    phone?:string;
    dateCreate?:string;
    status:boolean;
    linkAvatar?:string;
  }
  interface GetUserId{
    id: number;
    fullName?: string;
    email?:string;
    userName?: string;
    address?:string;
    phone?:string;
    dateCreate?:string;
    status:boolean;
    linkAvatar?:string;
    totalOrder?: number;
    totalPrice?: number;
    totalOrderFail?: number;
    totalOrderSuc?: number;
    totalOrderpay?: number;
    totalOrderShip?: number;
  }
  export{QLUser , GetUserId};