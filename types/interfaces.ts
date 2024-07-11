export interface Product {
  id: string;
  name: string;
  description: string;
  imageLink: string;
  categoryId: string;
  variations: Variation[];
}

export interface Variation {
  id: string;
  length: number | null;
  curlType: string | null;
  price: number;
  stock: number;
  sales: number;
}

export interface CartItem {
  productId: string;
  variationId: string;
  quantity: number;
}

export interface Cart {
  cartItems: CartItem[];
  cartTotal: number;
}
