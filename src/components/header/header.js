import "./header.css";
import {
  AiFillHome,
  AiOutlineUnorderedList,
  AiTwotoneHeart,
} from "react-icons/ai";
import { BiShoppingBag, BiUserCircle } from "react-icons/bi";
import { GiMeshBall } from "react-icons/gi";
import { IoIosExit } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useOnClickOutside } from "../giohang";

const Header = () => {
  const [openInfoUser, setOpenInfoUser] = useState(false);
  const [openInfoCart, setOpenInfoCart] = useState(false);
  const [scrollPage, setChangBg] = useState(false);
  const [info, setInfo] = useState();
  const [classBg, setClassBg] = useState(``);
  const navigate = useNavigate();
  const ref1 = useRef();
  const ref2 = useRef();
  useOnClickOutside(ref1, () => {
    setOpenInfoCart(false);
  });
  useOnClickOutside(ref2, () => {
    setOpenInfoUser(false);
  });
  const location = useLocation();

  useEffect(() => {
    localStorage.getItem("account") &&
      setInfo(JSON.parse(localStorage.getItem("account")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("account");
    window.location.href = "/";
    setInfo(null);
    toast.error("Đăng xuất tài khoản!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  window.addEventListener("scroll", function (event) {
    var scroll = this.scrollY;
    setChangBg(scroll > 100);
  });

  const resultClass = useMemo(() => {
    if (location.pathname === "/" && !scrollPage) {
      setClassBg(``);
    } else {
      setClassBg(`bg-dark-green box-shadow`);
    }
    return classBg;
  }, [classBg, location.pathname, scrollPage]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div
        className={`w-100 d-flex form-header align-items-center text-white ${resultClass}`}
      >
        <div className="d-flex align-items-center form-tilte-header">
          <GiMeshBall color="#eda766" className="me-2 icon-title" size={55} />
          <Link className="link-none-style" to="/">
            <h1 className="title-header fw-bold">OnThePitch</h1>
          </Link>
        </div>
        <div className="form-function-header">
          <Link className="link-none-style" to="/">
            <div className="item-function-header">
              <p className="d-flex gap-2 text-special align-items-center">
                <AiFillHome size={20} />
                Trang Chủ
              </p>
            </div>
          </Link>
          <div
            onClick={() => navigate("/san-bong")}
            className="item-function-header"
          >
            <p className="text-special">Đặt sân</p>
          </div>
          <div
            onClick={() => navigate("/giay")}
            className="item-function-header"
          >
            <p className="text-special">Sản phẩm thể thao</p>
          </div>
          <div onClick={() => navigate("/")} className="item-function-header">
            <p className="text-special">Giới thiệu</p>
          </div>
        </div>
        <div className="form-user-header2">
          {info && (
            <div
              onClick={() => setOpenInfoCart(!openInfoCart)}
              className="drop me-3"
              ref={ref1}
            >
              <div className="form-user-header form-cart-header align-items-center">
                <BiShoppingBag className="icon-cart-user" size={23} />
              </div>
              <div
                className={`${
                  openInfoCart ? `list-drop` : `list-drop close-drop`
                }`}
              >
                <p
                  onClick={() => navigate("/gio-hang")}
                  className="item-drop px-4"
                >
                  <FaShoppingCart className="me-1" />
                  Giỏ hàng
                </p>
                <p
                  onClick={() => navigate("/don-hang")}
                  className="item-drop px-4"
                >
                  <AiOutlineUnorderedList className="me-1" /> Đơn hàng
                </p>
                <p className="item-drop px-4">
                  <AiTwotoneHeart className="me-1" /> Yêu thích
                </p>
              </div>
            </div>
          )}
          <div
            ref={ref2}
            onClick={() => setOpenInfoUser(!openInfoUser)}
            className="drop"
          >
            <div className="form-user-header form-cart-header align-items-center">
              <BiUserCircle size={25} />
              <div className="form-user-name">
                {info ? (
                  <strong className="mx-2 text-special">{info.username}</strong>
                ) : (
                  <strong className="mx-2 text-special">Tài khoản</strong>
                )}
              </div>
            </div>
            <div
              className={`${
                openInfoUser ? `list-drop` : `list-drop close-drop`
              }`}
            >
              {info ? (
                <>
                  <p className="item-drop">
                    <FaUserCircle className="me-1" /> Thông tin người dùng
                  </p>
                  <p
                    onClick={handleLogout}
                    className="item-drop text-dang-xuat"
                  >
                    <IoIosExit className="me-1" />
                    Đăng xuất
                  </p>
                </>
              ) : (
                <>
                  <p onClick={() => navigate("/login")} className="item-drop">
                    <FaUserCircle className="me-1" /> Đăng Nhập
                  </p>
                  <p onClick={() => navigate("/sigin")} className="item-drop">
                    <TiUserAdd className="me-1" /> Đăng Ký
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
