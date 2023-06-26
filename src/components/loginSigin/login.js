import { Link, useNavigate } from "react-router-dom";
import { GiMeshBall } from "react-icons/gi";
import "./css.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [accounts, setAccount] = useState({
    account: { email: "", password: "" },
  });

  const dataUser = JSON.parse(localStorage.getItem("account"));

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!accounts.account.email || !accounts.account.password) {
      toast.error(
        <div className="d-flex align-content-center h-100 p-2">
          <h5 className="mt-1">Bạn chưa nhập đủ thông tin</h5>
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else {
      fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accounts.account),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            toast.error(
              <div>
                <strong>Bạn đã nhập sai thông tin!</strong>
              </div>,
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              }
            );
          } else {
            window.location.href = "/";
            localStorage.setItem("account", JSON.stringify(data));
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  if (!dataUser) {
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
        <div className="outline-bg-login">
          <div className="outline-login">
            <div className="bg-login">
              <div className="body-login">
                <div className="form-login-left">
                  <div className="d-flex">
                    <Link className="link-none-style" to="/">
                      <div className="d-flex align-items-center m-0 p-0 form-tilte-header form-tilte-header-login">
                        <GiMeshBall
                          color="#eda766"
                          className="ms-0 me-2 icon-title text-green"
                          size={55}
                        />
                        <h1 className="title-header fw-bold text-green">
                          OnThePitch
                        </h1>
                      </div>
                    </Link>
                  </div>
                  <div className="body-form-login-left">
                    <div>
                      <h3 className="text-green">Đăng Nhập</h3>
                      <p className="text-special">
                        Trang web đặt sân bóng tại thành phố Quy Nhơn.
                      </p>
                      <div className="form-input-login mt-4">
                        <input
                          className="input-login text-special"
                          type="text"
                          placeholder="Số điện thoại (Tài khoản)"
                          onChange={(e) =>
                            setAccount((prevState) => ({
                              account: {
                                ...prevState.account,
                                email: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="form-input-login">
                        <input
                          className="input-login text-special"
                          type="text"
                          placeholder="Mật khẩu"
                          onChange={(e) =>
                            setAccount((prevState) => ({
                              account: {
                                ...prevState.account,
                                password: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="form-luu-mat-khau d-flex mb-3">
                        <input type="checkbox" className="me-2" />
                        <p>Lưu mật khẩu</p>
                      </div>
                      <div className="form-btn-login mb-3">
                        <button
                          onClick={() => handleLogin()}
                          className="btn-form-detail btn-main text-special"
                        >
                          Đăng nhập
                        </button>
                      </div>
                      <div className="form-btn-login">
                        <button
                          onClick={() => navigate("/sigin")}
                          className="btn-form-detail btn-add-cart text-special"
                        >
                          Đăng ký
                        </button>
                      </div>
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
                <div className="form-login-right text-white d-flex p-3">
                  <div className="mt-auto title-login-right">
                    <h4>
                      Sẽ luôn cố gắng cải thiện chất lượng sản phẩm, chăm sóc
                      khách hàng để trở thành trang web Booking Sport hàng đầu.
                    </h4>
                    <div className="d-flex">
                      <div className="d-block">
                        {/* <h1>OnThePitch</h1> */}
                        <p>Website Booking Sport</p>
                      </div>
                      <div className="ms-auto mt-auto me-0">
                        <div className="d-flex align-items-center me-0 form-tilte-header">
                          <GiMeshBall
                            color="#eda766"
                            className="ms-0 me-2 icon-title"
                            size={55}
                          />
                          <h1 className="title-header fw-bold">OnThePitch</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Login;
