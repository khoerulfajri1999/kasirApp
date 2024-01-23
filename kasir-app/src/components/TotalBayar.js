import React, { Component } from "react";
import { rupiah } from "../utils/constants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import withNavigateHook from "./withNavigateHook";

export class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      products: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.navigation("/sukses");
    });
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce((result, item) => {
      return (result += item.total_harga);
    }, 0);
    return (
      <>
        <div className="xl:fixed lg:fixed bottom-8 justify-end xl:pl-10 lg:pr-6 xl:pr-0 text-center pt-9">
          <div className="pb-4 lg:flex">
            <span className="font-semibold">Total Bayar : </span>
            <span className="pl-32 lg:pl-20 xl:pl-32 text-yellow-700">
              {rupiah(totalBayar)}
            </span>
          </div>
          <Link
            className=" lg:px-[30%]  xl:px-[7.1rem] px-[35%] bg-red-400 text-white p-2 rounded-lg hover:bg-red-600 active:bg-red-700"
            onClick={() => this.submitTotalBayar(totalBayar)}
          >
            <span>
              <FontAwesomeIcon icon={faShoppingCart} />
            </span>
            <span className="pl-1 text-lg font-semibold">BAYAR</span>
          </Link>
        </div>
      </>
    );
  }
}

export default withNavigateHook(TotalBayar);
