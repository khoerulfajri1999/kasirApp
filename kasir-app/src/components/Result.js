import React, { Component } from "react";
import { API_URL, rupiah } from "../utils/constants";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import axios from "axios";
import swal from "sweetalert";

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleshow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Update Pesanan",
          text: "Berhasil mengupdate pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Hapus Pesanan",
          text:
            "Berhasil menghapus pesanan " +
            this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    console.log(keranjangs);
    return (
      <>
        <h4 className="mb-3 pt-9 xl:pt-0 lg:pt-0 text-slate-500">
          Produk di keranjang :
        </h4>
        <div className="xl:overflow-auto lg:overflow-auto no-scrollbar xl:max-h-[31rem] lg:max-h-[28rem] xl:border-b-8 lg:border-b-8 border-t-8">
          {keranjangs.length !== 0 && (
            <>
              {keranjangs.map((menuKeranjang) => (
                <>
                  <hr></hr>
                  <main className=" lg:text-sm flex py-1 font-semibold mt-2 cursor-pointer">
                    <button
                      className="text-red-400 hover:text-red-600 pr-3"
                      onClick={() => this.handleshow(menuKeranjang)}
                    >
                      edit
                    </button>
                    <div className="w-6 m-auto text-center text-white bg-red-400 rounded-[50%] ">
                      <div>{menuKeranjang.jumlah}</div>
                    </div>
                    <div className="w-3/5 ml-6">
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p className="text-yellow-700">
                        {rupiah(menuKeranjang.product.harga)}
                      </p>
                    </div>
                    <div className="w-1/5 m-auto text-yellow-700">
                      {rupiah(menuKeranjang.total_harga)}
                    </div>
                    <ModalKeranjang
                      handleClose={this.handleClose}
                      {...this.state}
                      tambah={this.tambah}
                      kurang={this.kurang}
                      changeHandler={this.changeHandler}
                      handleSubmit={this.handleSubmit}
                      hapusPesanan={this.hapusPesanan}
                    />
                  </main>
                </>
              ))}
            </>
          )}
          <TotalBayar keranjangs={keranjangs} {...this.props} />
        </div>
      </>
    );
  }
}
