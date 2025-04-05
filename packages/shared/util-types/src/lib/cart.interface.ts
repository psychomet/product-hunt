export interface Cart {
  id: string;
  code: string;
  state: string;
  totalQuantity: number;
  subTotal: number;
  subTotalWithTax: number;
  total: number;
  totalWithTax: number;
  shipping: number;
  shippingWithTax: number;
  lines: Array<CartLine>;
  discounts: Array<CartDiscount>;
}

export interface CartLine {
  id: string;
  unitPrice: number;
  unitPriceWithTax: number;
  quantity: number;
  linePriceWithTax: number;
  discountedLinePriceWithTax: number;
  productVariant: {
    id: string;
    name: string;
    sku: string;
    price: number;
    priceWithTax: number;
    featuredAsset?: {
      id: string;
      preview: string;
    };
  };
  discounts: Array<CartDiscount>;
}

export interface CartDiscount {
  description: string;
  amount: number;
  amountWithTax: number;
  adjustmentSource: string;
  type: string;
} 