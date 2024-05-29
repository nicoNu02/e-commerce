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
        className={"bg-zinc-900 text-slate-200 w-8 rounded font-bold"}
        onClick={() => handleChange(-1)}
        type="button"
      >
        -
      </button>
      <div className="flex-1 text-center bg-zinc-900 rounded text-slate-200">
        {count}
      </div>
      <button
        className={"bg-zinc-900 text-slate-200 w-8 rounded font-bold"}
        onClick={() => handleChange(1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}
