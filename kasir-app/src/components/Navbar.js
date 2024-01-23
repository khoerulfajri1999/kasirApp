import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="bg-red-400 text-white 2xl:py-4 py-1 2xl:px-72 px-4 flex ">
      <h1 className="2xl:text-3xl text-xl font-bold relative w-72">
        <FontAwesomeIcon icon={faDesktop} />
        <span className="absolute  2xl:left-11 left-8 uppercase">
          Aplikasi Kasir!
        </span>
      </h1>
    </nav>
  );
};
