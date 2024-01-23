import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  render() {
    return (
      <div className="text-center">
        <img
          src="assets/images/sukses.png"
          className="xl:w-1/4 sm:w-[40%] md:w-[60%] lg:w-[50%] w-[80%] m-auto"
        />
        <h1 className="text-3xl pb-2">Sukses</h1>
        <h4 className="pb-5 text-xl">Terimakasih telah memasan</h4>
        <Link
          to="/"
          className="bg-red-400 text-white p-2 rounded-lg hover:bg-red-600 active:bg-red-700"
        >
          Kembali
        </Link>
      </div>
    );
  }
}
