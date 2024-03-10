import { sidebarLinks } from "../constants";

export default function Bottombar() {
  return (
    <section className='fixed bg-slate-950  bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden'>
      <div className='flex items-center text-yellow-50 justify-between gap-3 xs:gap-5'>
        {sidebarLinks.map((link) => {
        //   const isActive =
        //     (pathname.includes(link.route) && link.route.length > 1) ||
        //     pathname === link.route;

          return (
            <a
              href={link.route}
              key={link.label}
              className="relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 hover:bg-violet-900"
            >
              <img
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className='object-contain'
              />

              <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                {link.label.split(/\s+/)[0]}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  )
}
