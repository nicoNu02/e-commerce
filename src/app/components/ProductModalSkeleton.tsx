export default function ProductModalSkeleton() {
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-[30] flex flex-col items-center justify-center backdrop-blur-sm color">
      <div className="box-border z-[90] bg-white h-[60%] w-3/4 flex flex-col p-4 md:p-8 overflow-scroll lg:h-[90%] md:h-[90%] sm:h-[70%]">
        {/* image */}
        <div className="w-[50vw] h-[65vh] place-self-center flex justify-center items-center relative mb-4 md:w-1/2 md:h-[95%] lg:w-1/2 lg:h-[95%] sm:w-1/2 sm:h-[70%] bg-zinc-200 rounded-lg"></div>
        <div className=" size-[15vw] h-[15vh] md:size-20 mb-4 bg-zinc-200 rounded-lg"></div>
        <div className="skeleton relative">
          {/* title */}
          <h2 className="  text-2xl font-bold mb-2 md:text-4xl bg-zinc-200 text-zinc-200 rounded-lg">
            aslkdjalksjda
          </h2>
          <h3 className="text-xl font-bold md:text-2xl bg-zinc-200 text-zinc-200 w-24 rounded-lg">
            999.99
          </h3>
          {/* color */}
          <div className="flex">
            <div className="flex flex-col items-center justify-left my-2">
              <button className=" w-8 h-8 rounded-full border-2 bg-zinc-200"></button>
              <div className="text-sm font-bold bg-white w-8 h-2"></div>
            </div>
          </div>
          {/* counter */}
          <div className="flex w-full h-12 gap-2 md:w-64">
            <button
              className={"bg-zinc-200 text-white w-16 rounded font-bold "}
              type="button"
            ></button>
            <div className="w-24 text-center bg-zinc-200 rounded flex justify-center items-center"></div>
            <button
              className={
                "bg-black text-white w-16 rounded font-bold bg-zinc-200 text-zinc-200"
              }
              type="button"
            >
              +
            </button>
          </div>
          {/* add to cart */}
          <div className="flex flex-col justify-center items-center my-4 relative w-full ">
            <button
              type="button"
              className="bg-zinc-200 text-zinc-200 text-white px-9 py-4 rounded-lg w-full md:w-1/2"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
