import { PackingLists } from "@/api/generatePackingList";

interface PackingListProps {
  orders: PackingLists;
}

export default function PackingList({ orders }: PackingListProps) {
  if (!orders?.length) {
    return (
      <div className="text-center text-gray-700 mt-4">
        <p>No orders for the selected date.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2 mt-4 w-full max-w-xl">
      {orders.map((order, orderIndex) => (
        <li
          key={orderIndex}
          className="border p-4 rounded-xl shadow-md bg-white space-y-3"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            📦 Order #{order.orderId}
          </h2>
          <p className="text-sm text-gray-800">🗓️ {order.orderDate}</p>

          <div className="ml-4 space-y-4">
            {order.lineItems.map((lineItem, lineIndex) => (
              <div key={lineIndex}>
                <h3 className="font-medium text-gray-700">
                  🎁 {lineItem.productName}
                </h3>
                <ul className="ml-6 list-disc text-sm text-gray-600">
                  {lineItem.components.map((comp, compIndex) => (
                    <li key={compIndex}>
                      {comp.itemName} × {comp.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-700 mt-3">
            <p>
              🚚 <strong>Ship To:</strong> {order.shipTo.customerName}
            </p>
            <p>
              📍 <strong>Address:</strong> {order.shipTo.customerAddress}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
