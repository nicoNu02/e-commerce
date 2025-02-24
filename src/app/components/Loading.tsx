export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div
      className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
    </div>
  );
}
