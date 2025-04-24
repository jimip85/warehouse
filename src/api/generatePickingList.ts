import { ProductMap } from "@/types/orders";
import { Orders } from "../data/orders";

interface ProductCountMap {
  [key: string]: number;
}

interface PickingListItem {
  itemName: string;
  quantity: number;
}

export type PickingListItems = PickingListItem[];

export const generatePickingList = (
  orders: Orders,
  productMap: ProductMap,
  selectedDate: string
): PickingListItems => {

  const productOrderCountMap: ProductCountMap = {};
  const pickingListItems: PickingListItems = [];

  const ordersOnSelectedDate = orders.filter(
    (order) => order.orderDate === selectedDate
  );

  ordersOnSelectedDate.forEach(({ lineItems }) => {
    lineItems.forEach(({ productName }) => {
      productOrderCountMap[productName] = (productOrderCountMap[productName] || 0) + 1;
    });
  });

  Object.entries(productOrderCountMap).forEach(([productName, quantity]) => {
    const components = productMap[productName] || [];

    components.forEach((itemName) => {
      pickingListItems.push({ itemName, quantity });
    });
  });

  return pickingListItems;
};

