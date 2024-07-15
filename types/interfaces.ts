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
  shape: string | null;
  price: number;
  stock: number;
  sales: number;
}

export interface CartItem {
  productId: string;
  variationId: string;
  name: string;
  imageLink: string;
  price: number;
  length: number | null;
  curlType: string | null;
  shape: string | null;
  quantity: number;
}

export interface OrderPayload {
  firstName: string;
  lastName: string;
  isStorePickup: boolean;
  streetAddress: string;
  apartmentUnit: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  email: string;
  phoneNumber: string;
  items: OrderItemPayload[];
  totalPrice: number;
  paymentId: string;
  status: string;
}

export interface OrderItemPayload {
  productId: string;
  variationId: string;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  streetAddress: string;
  apartmentUnit: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  email: string;
  phoneNumber: string;
}
