interface categoryDtos {
  id: number;
  name: string;
}
interface createcategoryDtos {
  name: string;
}
interface variant {
  id: string;
  size: string;
  price: string;
  quantity: string;
}
interface variantResponse {
  id: number;
  size: number;
  price: number;
  quantity: number;
  status: boolean;
}

class shared {
  static getRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
}

export { categoryDtos, variant, shared, variantResponse,createcategoryDtos };
