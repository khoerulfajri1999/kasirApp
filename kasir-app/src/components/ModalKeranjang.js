import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { rupiah } from "../utils/constants";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
  totalHarga,
  hapusPesanan,
}) => {
  if (showModal === false) return null;
  return (
    <div className="fixed top-0 left-0 py-[100%] px-[100%]  bg-black bg-opacity-5 backdrop-blur-sm ">
      <div className="fixed xl:top-36 xl:left-[35rem] lg:left-[18rem] sm:top-10 sm:left-[10rem] top-5 left-5 ">
        <div className="bg-white xl:w-[30rem] md:w-[27rem] w-[22rem] h-72 rounded-lg p-3 border-red-600">
          <div className="pb-2">
            <span className="font-medium text-yellow-700">
              {keranjangDetail.product.nama}{" "}
            </span>
            <span className="font-bold">
              {"("}
              {rupiah(keranjangDetail.product.harga)}
              {")"}
            </span>
          </div>
          <hr></hr>
          <form
            action=""
            id="checkoutForm"
            className=" relative"
            onSubmit={handleSubmit}
          >
            <label for="email" className="absolute top-6">
              <span>Total Harga :</span>
              <span className=" absolute left-24 font-bold">
                {rupiah(totalHarga)}
              </span>
            </label>
            <label for="email" className="absolute top-14 flex">
              <span>Jumlah :</span>
              <div className=" absolute left-20 font-bold flex">
                <button
                  className="w-5 h-5 m-auto bg-red-400 rounded-md hover:bg-red-500 active:bg-red-700"
                  onClick={(e) => {
                    e.preventDefault();
                    kurang();
                  }}
                >
                  <div className="text-sm">
                    <FontAwesomeIcon icon={faMinus} className="text-white" />
                  </div>
                </button>
                <span className="px-1">{jumlah}</span>
                <button
                  className="w-5 h-5 m-auto bg-red-400 rounded-md hover:bg-red-500 active:bg-red-700"
                  onClick={(e) => {
                    e.preventDefault();
                    tambah();
                  }}
                >
                  <div className="text-sm">
                    <FontAwesomeIcon icon={faPlus} className="text-white" />
                  </div>
                </button>
              </div>
            </label>
            <label for="teks" className="absolute top-[5.5rem]">
              <span>Keterangan : </span>
              <input
                type="textarea"
                name="keterangan"
                id="teks"
                autocomplete="off"
                placeholder="contoh: nasi setengah, pedas"
                value={keterangan}
                onChange={(event) => changeHandler(event)}
                className="absolute left-24 shadow-lg border-[1px] border-red-400 hover:bg-red-100 focus:border-none focus:border-red-400 active:shadow-sm active:shadow-red-500 xl:w-80 w-56 "
              />
            </label>
            <hr></hr>
            <button className="absolute top-32 bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 active:bg-red-700">
              Simpan
            </button>
          </form>
          <button
            className="absolute top-60 right-8 bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 active:bg-red-700"
            onClick={() => hapusPesanan(keranjangDetail.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className="pl-2">Hapus Pesanan</span>
          </button>
          <button
            onClick={handleClose}
            className="  w-9 h-9 rounded-full absolute -right-3 -top-3"
          >
            <span className="text-4xl ">
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: "#F87171" }}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalKeranjang;
