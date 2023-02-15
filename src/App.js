import "./App.css";
// import Body from "./components/body/Body";
// import Search from "./components/search/Search";
// import Image from "./components/image/Image";
// import useAxios from "./hooks/useAxios";
import { createContext } from "react";
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

export const ImageContext = createContext();

function BasicLayout() {
  return (
    <>
      <div className="pb-5">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<TrangChu />} />
            <Route path="/san-bong" element={<ListSanBong />} />
            <Route path="/giay" element={<ListGiay />} />
            <Route path="/gio-hang" element={<GioHang />} />
            <Route path="/don-hang" element={<DonHang />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/sigin" element={<Sigin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
