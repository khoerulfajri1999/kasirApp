import React from "react";
import { rupiah } from "../utils/constants";

export const ListProduct = ({ products, masukKeranjang }) => {
  return (
    <div className=" group text-center xl:border-2 p-5 inline-block rounded-lg shadow-md hover:scale-105 duration-300 hover:bg-red-400 hover:text-white origin-center cursor-pointer">
      <img
        src={
          "../../../assets/images/" +
          products.category.nama.toLowerCase() +
          "/" +
          products.gambar
        }
        alt={products.gambar}
        onClick={() => masukKeranjang(products)}
        className="w-full xl:h-40 h-24 object-cover rounded-lg group-hover:animate-[wiggle_1s_ease-in-out_infinite]"
      />

      <h3 className="mt-3 xl:text-base text-xs">{products.nama}</h3>
      <h3 className="text-slate-600 xl:text-base text-xs font-normal group-hover:text-white">
        ({products.kode})
      </h3>
      <h2 className="xl:text-base text-xs font-semibold text-yellow-700 group-hover:text-white">
        {rupiah(products.harga)}
      </h2>
    </div>
  );
};
