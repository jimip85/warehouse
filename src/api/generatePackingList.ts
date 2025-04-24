import { formatReadableDate } from "@/util/formatDate";
import { Orders } from "../data/orders";
import { ProductMap } from "@/types/orders";

interface Component {
  itemName: string;
  quantity: number;
}

interface LineItem {
  lineId: number;
  productName: string;
  components: Component[];
}

interface ShipTo {
  customerName: string;
  customerAddress: string;
}

interface PackingList {
  orderId: number;
  orderDate: string;
  lineItems: LineItem[];
  shipTo: ShipTo;
}

export type PackingLists = PackingList[];

export const generatePackingList = (
  orders: Orders,
  productMap: ProductMap,
  selectedDate: string
): PackingLists => {
  return orders
    .filter((order) => order.orderDate === selectedDate)
    .map(({ orderId, orderDate, customerName, shippingAddress, lineItems }) => ({
      orderId,
      orderDate: formatReadableDate(orderDate),
      lineItems: lineItems.map(({ lineId, productName }) => ({
        lineId,
        productName,
        components: (productMap[productName] || []).map((itemName) => ({
          itemName,
          quantity: 1,
        })),
      })),
      shipTo: {
        customerName,
        customerAddress: shippingAddress,
      },
    }));
};
