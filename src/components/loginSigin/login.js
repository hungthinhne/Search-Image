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

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!accounts.account.email || !accounts.account.password) {
      toast.error(
        <div>
          <strong>Bạn chưa nhập đủ thông tin!</strong>
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
        <div className="bg-login">
          <div className="body-login">
            <div className="form-login-left">
              <div className="body-form-login-left p-5 bg-white">
                <div className="w-100 d-flex form-header p-0 align-items-center">
                  <Link className="link-none-style" to="/">
                    <div className="d-flex align-items-center m-0 p-0 form-tilte-header">
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
                <div className="mt-5 pt-2">
                  <h3 className="mt-5 text-brown">Đăng Nhập</h3>
                  <p className="text-special">
                    Trang web đặt sân bóng tại thành phố Quy Nhơn.
                  </p>
                  <div className="form-input-login mt-4 w-100">
                    <input
                      className="input-login"
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
                  <div className="form-input-login w-100">
                    <input
                      className="input-login"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
