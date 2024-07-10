interface orderDto {
  id: number,
  total: number,
  timeCreate: string,
  statusOrder: number,
  statusDelivery: number,
  paymentMethod: number,
  accountId: number,
  customerName: string,
}
export { orderDto }
