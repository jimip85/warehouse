import { generatePackingList } from './generatePackingList';
import { Orders, ProductMap } from '@/types/orders';

jest.mock('@/util/formatDate.ts', () => ({
  formatReadableDate: jest.fn((date: string) => `Formatted(${date})`),
}));

describe('generatePackingList', () => {
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
    }
  ];

  const mockProductMap: ProductMap = {
    'Birthday Box': ['Cake', 'Balloon'],
    'Client Gift Box': ['Mug'],
    'Valentines Box': ['Chocolate', 'Rose']
  };

  it('returns packing list only for selected date', () => {
    const result = generatePackingList(mockOrders, mockProductMap, '2025-04-24');

    expect(result).toHaveLength(1);
    expect(result[0].orderId).toBe(1);
    expect(result[0].shipTo.customerName).toBe('Alice Doe');
    expect(result[0].orderDate).toBe('Formatted(2025-04-24)');
  });

  it('maps lineItems with components from productMap', () => {
    const result = generatePackingList(mockOrders, mockProductMap, '2025-04-24');

    const [birthdayItem, giftItem] = result[0].lineItems;

    expect(birthdayItem.components).toEqual([
      { itemName: 'Cake', quantity: 1 },
      { itemName: 'Balloon', quantity: 1 }
    ]);

    expect(giftItem.components).toEqual([
      { itemName: 'Mug', quantity: 1 }
    ]);
  });

  it('returns empty array if no order matches the selected date', () => {
    const result = generatePackingList(mockOrders, mockProductMap, '2025-04-30');
    expect(result).toEqual([]);
  });

  it('handles products not found in productMap', () => {
    const productMapWithMissingEntry: ProductMap = {
      'Birthday Box': ['Cake']
    };

    const result = generatePackingList(mockOrders, productMapWithMissingEntry, '2025-04-24');
    const giftBox = result[0].lineItems.find(i => i.productName === 'Client Gift Box');
    expect(giftBox?.components).toEqual([]);
  });
});
