type Props = {
  filter: "all" | "completed" | "pending";
  setFilter: (value: "all" | "completed" | "pending") => void;
};

export const TaskFilter = ({ filter, setFilter }: Props) => (
  <div className="flex justify-center gap-4 mt-4">
    {["all", "pending", "completed"].map((type) => (
      <button
        key={type}
        onClick={() => setFilter(type as any)}
        className={`px-4 py-2 border rounded-md ${
          filter === type
            ? type === "pending"
              ? "bg-yellow-400 text-white"
              : type === "completed"
              ? "bg-green-500 text-white"
              : "bg-blue-500 text-white"
            : "bg-white"
        }`}
      >
        {type[0].toUpperCase() + type.slice(1)}
      </button>
    ))}
  </div>
);