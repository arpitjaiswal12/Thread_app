export default function RightSidebar() {
  return (  
    // sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-10 pb-6 pt-28 max-xl:hidden
    <section className=" bg-slate-950 absolute right-0 top-[65px] z-20 flex h-screen w-fit px-4 pb-4 pt-4 max-xl:hidden ">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1 text-white">
          Suggested Communities
        </h3>

        {/* <div className="mt-7 flex w-[350px] flex-col gap-9"></div> */}
      </div>

      {/* <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Similar Minds</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10"></div>
      </div> */}
    </section>
  );
}
