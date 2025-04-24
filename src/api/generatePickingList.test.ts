import { generatePickingList } from "@/api/generatePickingList";
import { Orders, ProductMap } from "@/types/orders"; 

describe("generatePickingList", () => {

  const mockOrders: Orders = [
    {
        orderId: 1,
        orderDate: '2025-04-24',
        orderTotal: 500,
        customerName: 'Alice Doe',
        customerEmail: 'alice@example.com',
        shippingAddress: '123 Test Lane',
        lineItems: [
          { lineId: 101, productId: 1, productName: 'Birthday Box', price: 200 },
          { lineId: 102, productId: 2, productName: 'Client Gift Box', price: 300 }
        ]
      },
      {
        orderId: 2,
        orderDate: '2025-04-23',
        orderTotal: 200,
        customerName: 'Bob Smith',
        customerEmail: 'bob@example.com',
        shippingAddress: '456 Sample Street',
        lineItems: [
          { lineId: 103, productId: 3, productName: 'Valentines Box', price: 200 }
        ]
      },
      {
        orderId: 3,
        orderDate: '2025-04-23',
        orderTotal: 200,
        customerName: 'Martha Smith',
        customerEmail: 'martha@example.com',
        shippingAddress: '456 Sample Street',
        lineItems: [
          { lineId: 103, productId: 3, productName: 'Valentines Box', price: 200 }
        ]
      }
  ];

  const mockProductMap: ProductMap = {
    "Birthday Box": ["Component A1", "Component A2"],
    "Client Gift Box": ["Component B1"],
    "Valentines Box": ["Component C1"]
  };

  it("should return an empty picking list if no orders match the selected date", () => {
    const result = generatePickingList(mockOrders, mockProductMap, "2025-04-21");
    expect(result).toEqual([]);
  });

  it("should generate a picking list for orders on the selected date", () => {
    const result = generatePickingList(mockOrders, mockProductMap, "2025-04-24");
    expect(result).toEqual([
      { itemName: "Component A1", quantity: 1 },
      { itemName: "Component A2", quantity: 1 },
      { itemName: "Component B1", quantity: 1 }
    ]);
  });

  it("should handle multiple orders with the same products", () => {
    const result = generatePickingList(mockOrders, mockProductMap, "2025-04-23");
    expect(result).toEqual([
      { itemName: "Component C1", quantity: 2 }
    ]);
  });

  it("should handle products with no components in the productMap", () => {
    const productMapWithMissingComponent: ProductMap = {
      "Birthday Box": ["Component A1", "Component A2"],
      "Client Gift Box": []
    };
    const result = generatePickingList(mockOrders, productMapWithMissingComponent, "2025-04-24");
    expect(result).toEqual([
      { itemName: "Component A1", quantity: 1 },
      { itemName: "Component A2", quantity: 1 }
    ]);
  });

});
