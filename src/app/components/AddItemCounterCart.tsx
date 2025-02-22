export default function AddItemCounterCart({
  handleChange,
  count,
}: {
  handleChange: (cant: number) => void;
  count: number;
}) {
  return (
    <div className="flex w-32 gap-2">
      <button
        className={
          "bg-purple-600 text-slate-200 w-8 rounded font-bold hover:scale-110 transition-transform"
        }
        onClick={() => handleChange(-1)}
        type="button"
      >
        -
      </button>
      <div className="flex-1 text-center bg-purple-600 rounded text-slate-200">
        {count}
      </div>
      <button
        className={
          "bg-purple-600 text-slate-200 w-8 rounded font-bold hover:scale-110 transition-transform"
        }
        onClick={() => handleChange(1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}
