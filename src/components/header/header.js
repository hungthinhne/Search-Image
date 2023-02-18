import "./header.css";
import {
  AiFillHome,
  AiOutlineUnorderedList,
  AiTwotoneHeart,
  AiTwotoneShopping,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
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
          <Link className="link-none-style d-flex me-3" to="/">
            <GiMeshBall color="#eda766" className="me-1 icon-title" size={35} />
            <h3 className="title-header fw-bold mb-1">OnThePitch</h3>{" "}
          </Link>
          <h3>|</h3>
          <strong className="ms-3 d-flex text-special">
            Website Booking Football
          </strong>
        </div>
        <div className="form-function-header">
          <Link className="link-none-style" to="/">
            <div className="item-function-header">
              <p className="d-flex gap-2  align-items-center text-special">
                <AiFillHome size={20} />
                Trang Chủ
              </p>
            </div>
          </Link>
          <div
            onClick={() => navigate("/san-bong")}
            className="item-function-header"
          >
            <p className="text-special">Đặt Sân</p>
          </div>
          <div
            onClick={() => navigate("/giay")}
            className="item-function-header"
          >
            <p className="text-special">Sản Phẩm Thể Thao</p>
          </div>
          <div onClick={() => navigate("/")} className="item-function-header">
            <p className="text-special">Giới Thiệu</p>
          </div>
        </div>
        <div className="form-user-header2">
          {info && (
            <div
              onClick={() => setOpenInfoCart(!openInfoCart)}
              className="drop me-3"
              ref={ref1}
            >
              <div className="d-flex align-items-center">
                <AiTwotoneShopping className="icon-cart-user" size={34.5} />
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
              <BiUserCircle size={27} />
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
