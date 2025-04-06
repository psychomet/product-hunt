export interface Cart {
  id: string;
  code: string;
  state: string;
  totalQuantity: number;
  subTotal: number;
  subTotalWithTax: number;
  shipping: number;
  shippingWithTax: number;
  total: number;
  totalWithTax: number;
  customer?: {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
  };
  shippingAddress?: {
    fullName: string;
    company?: string;
    streetLine1: string;
    streetLine2?: string;
    city: string;
    province: string;
    postalCode: string;
    countryCode: string;
  };
  lines: Array<CartLine>;
  discounts: Array<CartDiscount>;
}

export interface CartLine {
  id: string;
  productVariantId: string;
  quantity: number;
  unitPrice: number;
  unitPriceWithTax: number;
  linePrice: number;
  linePriceWithTax: number;
  discountedLinePrice: number;
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
  adjustmentSource: string;
  amount: number;
  amountWithTax: number;
  description: string;
  type: string;
} 