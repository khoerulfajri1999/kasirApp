import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Sukses from "./pages/Sukses";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/sukses" Component={Sukses} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
