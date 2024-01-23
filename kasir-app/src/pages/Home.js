import React, { Component } from "react";
import ListCategories from "../components/ListCategories";
import { ListProduct } from "../components/ListProduct";
import Result from "../components/Result";
import axios from "axios";
import { API_URL } from "../utils/constants";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryAwal: "Cemilan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryAwal)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error", error);
      });
    this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch((error) => {
  //         console.log("Error", error);
  //       });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      categoryAwal: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Berhasil masuk keranjang",
                text: "Berhasil masuk keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Berhasil masuk keranjang",
                text: "Berhasil masuk keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  render() {
    const { menus, categoryAwal, keranjangs } = this.state;
    return (
      <div>
        <div className="xl:flex lg:flex px-6 py-3 font-bold ">
          <div className="xl:w-2/12 lg:w-[13%] ">
            <h1 className="text-center xl:text-lg mb-3 text-slate-500 uppercase">
              List Kategori
            </h1>
            <ListCategories
              changeCategory={this.changeCategory}
              categoryAwal
              {...categoryAwal}
            />
          </div>
          <div className="inline-block xl:flex lg:flex xl:w-10/12 lg:w-[87%] sm:w-full lg:m-auto">
            <div className="xl:w-[70%] lg:w-[70%] w-full  ">
              <h1 className="sm:pt-6 xl:pt-0 pt-0 lg:pt-0 text-center xl:text-lg mb-3 text-slate-500 uppercase">
                Daftar produk
              </h1>
              <div className="px-3 xl:border-l-4 xl:overflow-auto no-scrollbar xl:no-scrollbar xl:h-[36rem]">
                <div className="grid xl:grid-cols-3 grid-cols-2 sm:grid-cols-3 gap-3 ">
                  {menus.map((products) => (
                    <ListProduct
                      key={products.id}
                      products={products}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="xl:w-[30%] lg:w-[30%] w-full">
              <Result
                keranjangs={keranjangs}
                {...this.props}
                getListKeranjang={this.getListKeranjang}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
