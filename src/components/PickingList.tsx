import { PickingListItems } from "@/api/generatePickingList";

interface PickingListProps {
  items: PickingListItems;
}

export default function PickingList({ items }: PickingListProps) {
  if (!items?.length) {
    return (
      <div className="text-center text-gray-700 mt-4">
        <p>No orders for the selected date.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2 mt-4 w-full max-w-xl">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-center justify-between px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <span className="text-black font-medium">{item.itemName}</span>
          <span className="text-gray-600">x{item.quantity}</span>
        </li>
      ))}
    </ul>
  );
}
