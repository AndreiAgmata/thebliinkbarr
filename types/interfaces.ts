export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
  lengthId: string | null;
  curlTypeId: string | null;
}
