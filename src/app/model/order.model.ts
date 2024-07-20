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

interface reasonDto {
  reasonCancel: string
}

export { orderDto, orderDetailDto, reasonDto };
