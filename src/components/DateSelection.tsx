interface DateSelectionProps {
  value: string;
  onChange: (val: string) => void;
}

export default function DateSelection({ value, onChange }: DateSelectionProps) {
  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg mb-3">
      <label className="block text-gray-900 text-md font-bold mb-3">
        Select Order Date:
      </label>

      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-black text-md text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
      />
    </div>
  );
}
