interface orderDto {
  id: number,
  total: number,
  timeCreate: string,
  statusOrder: number,
  statusDelivery: number,
  paymentMethod: number,
  couponId: number
}
export { orderDto }
