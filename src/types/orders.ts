export interface ProductMap {
    [key: string]: string[];
  }

export interface LineItem {
 lineId: number;
 productId: number;
 productName: string;
 price: number;
};

export interface Order {
 orderId: number;
 orderDate: string;
 orderTotal: number;
 customerName: string;
 customerEmail: string;
 shippingAddress: string;
 lineItems: LineItem[];
};
  
export type Orders = Order[];