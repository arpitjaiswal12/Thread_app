import { sidebarLinks } from "../constants";

export default function LeftSidebar() {
  return (
    <section className=" bg-slate-950 text-white sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r-dark-4 bg-dark-2 pb-5 pt-6 max-md:hidden  ">
      <div className="flex w-full flex-1 flex-col gap-6 px-4">
        {sidebarLinks.map((link) => {
          return (
            <a
              href={link.route}
              key={link.label}
              className="relative flex justify-start gap-4 rounded-lg p-2 hover:bg-violet-900"
            >
              <img src={link.imgURL} alt={link.label} width={24} height={24} />

              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </a>
          );
        })}
      </div>

      <div className=" px-4">
        <div className="relative flex justify-start gap-4 rounded-lg p-2 cursor-pointer hover:bg-red-600">
          <img src="/assets/logout.svg" alt="logout" width={24} height={24} />
          <p className="text-light-1 max-lg:hidden">Logout</p>
        </div>
      </div>
    </section>
  );
}
