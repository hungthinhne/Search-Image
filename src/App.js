import "./App.css";
// import Body from "./components/body/Body";
// import Search from "./components/search/Search";
// import Image from "./components/image/Image";
// import useAxios from "./hooks/useAxios";
import { createContext, useEffect } from "react";
import TrangChu from "./components/trangchu";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import ListSanBong from "./components/san";
import ListGiay from "./components/giay";
import Login from "./components/loginSigin/login";
import Sigin from "./components/loginSigin/sigin";
import GioHang from "./components/giohang";
import "react-toastify/dist/ReactToastify.css";
import DonHang from "./components/donHang";
import ListChildSan from "./components/san/list-child-san-bong";
import OrderSanBong from "./components/san/order-san-bong";
import HomePage from "./admin/homePage";
import HeaderAdmin from "./admin/headerAdmin";

export const ImageContext = createContext();

function BasicLayout() {
  return (
    <>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <div>
        <HeaderAdmin />
        <Outlet />
      </div>
    </>
  );
}

function App() {
  const dataUser = JSON.parse(localStorage.getItem("account"));
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!dataUser?.isAdmin ? (
            <Route path="/" element={<BasicLayout />}>
              <Route index element={<TrangChu />} />
              <Route path="/san-bong" element={<ListSanBong />} />
              <Route path="/giay" element={<ListGiay />} />
              <Route path="/gio-hang" element={<GioHang />} />
              <Route path="/don-hang" element={<DonHang />} />
              <Route
                path="/list-child-san-bong/:id"
                element={<ListChildSan />}
              />
              <Route path="/order-san-bong/:id" element={<OrderSanBong />} />
            </Route>
          ) : (
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<HomePage />} />
            </Route>
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/sigin" element={<Sigin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
