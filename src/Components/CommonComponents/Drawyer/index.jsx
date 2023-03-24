import React from "react";
import CrossIcon from "../../../assets/icons/CrossIcon";

function Drawyer({ children, isOpen, setIsOpen, header }) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-sm right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-sm pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <div>
            <div className="flex my-4 justify-between mx-6 text-xl text-primary_color">
              <header className=" font-bold text-5lg">
                {header ? header : "Filter Used By"}
              </header>
              <div
                onClick={() => {
                  setIsOpen(false);
                }}
                className="mt-2 cursor-pointer "
              >
                <CrossIcon />
              </div>
            </div>
            <div className="divider"></div>
          </div>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}

export default Drawyer;
