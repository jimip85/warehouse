interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant: "primary" | "secondary";
}

export default function ActionButton({
  label,
  onClick,
  variant = "primary",
}: ActionButtonProps) {
  const baseStyles =
    "px-8 py-3 text-lg rounded-lg shadow-xl transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50";

  const variantStyles =
    variant === "secondary"
      ? "bg-black text-white hover:from-gray-600 hover:to-gray-900 focus:ring-gray-500"
      : "bg-grey-300 text-black hover:from-gray-200 hover:to-gray-500 focus:ring-gray-400 border-2";

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles}`}>
      {label}
    </button>
  );
}
