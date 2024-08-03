interface StatisticalDto{
  totalUser: number;
  totalProductSell: number;
  totalOrder: number;
  totalStatistical: number;
}

interface RatioOrderDto{
  orderComplete: number[];
  orderCancel: number[]
}

interface StatisticalReponse{
  map(arg0: (item: any) => any): any;
  length: number;
  month: string[];
  quantitySold: number[];
  revenue: number[];
}

interface TopProductDto{
  productId: number;
  productName: string;
  imageLink: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

export {
  StatisticalDto,
  StatisticalReponse,
  TopProductDto,
  RatioOrderDto
}
