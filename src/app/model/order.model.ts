interface orderDto {
  id: number,
  total: number,
  timeCreate: string,
  statusOrder: number,
  statusDelivery: number,
  namePaymentMethod: number,
  voucherId: number,
  customerName: string,
}

interface orderDetailDto {
  id: number,
  total: number,
  timeCreate: string,
  statusOrder: number,
  statusDelivery: number,
  namePaymentMethod: string,
  couponId: number,
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  customerAddress: string,
  itemOrder: [
    {
      quantity: number,
      productDetail: {
        id: number,
        size: number,
        price: number,
        nameProduct: string,
        imageUrl: string
      }
    }
  ]
}

interface orderCanelDto {
  id: number,
  total: number,
  timeCancel: string,
  statusOrder: number,
  statusDelivery: number,
  paymentMethodId: number,
  namePaymentMethod: number,
  voucherId: number,
  customerName: string,
  reasonCancel : reasonCancel
} 


interface orderCancelDetailDto {
  id: number;
  total: number;
  timeCreate: string;
  statusOrder: number;
  statusDelivery: number;
  namePaymentMethod: string;
  voucherId: number | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  itemOrder: OrderCancelItem[];
  reasonCancel : reasonCancel
}

interface OrderCancelItem {
  quantity: number;
  product: OderCancel_ProductDetail;
}

interface OderCancel_ProductDetail {
  id: number;
  size: number;
  price: number;
  nameProduct: string;
  imageUrl: string;
}

interface reasonCancel {
  title: string;
  content: string | null;
  timeCancel: string;
}

export { orderDto, orderDetailDto, orderCanelDto, reasonCancel, orderCancelDetailDto };
