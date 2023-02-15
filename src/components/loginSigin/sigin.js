import { useEffect, useState } from "react";
import { GiMeshBall } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Sigin = () => {
  const navigate = useNavigate();
  const [checkPassword, setCheckPassword] = useState();
  const [showWarning, setShowWarning] = useState(false);

  const [accounts, setAccount] = useState({
    account: {
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      username: "",
      status: true,
      gioHang: [],
      donHang: [],
    },
  });

  useEffect(() => {
    if (checkPassword && accounts.account.password !== checkPassword) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [accounts.account.password, checkPassword]);

  const handelSigin = () => {
    if (
      !accounts.account.email ||
      !accounts.account.password ||
      !accounts.account.lastName ||
      !accounts.account.firstName ||
      !accounts.account.username ||
      !checkPassword
    ) {
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
    } else if (accounts.account.password !== checkPassword) {
      toast.error(
        <div>
          <strong>Xin hãy xác nhận lại mật khẩu!</strong>
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
      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accounts.account),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.href = "/login";
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
              <div className="body-form-login-left px-5 pt-3 bg-white">
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
                <div className="mt-3 pt-2">
                  <h3 className="mt-5 text-brown">Đăng Ký</h3>
                  <p className="text-special">
                    Trang web đặt sân bóng tại thành phố Quy Nhơn.
                  </p>
                  <div className="form-right-detail form-body-sigin">
                    <div className="form-input-sigin mt-2 w-100">
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
                    <div className="form-input-sigin w-100">
                      <input
                        className="input-login"
                        type="text"
                        placeholder="Tên"
                        onChange={(e) =>
                          setAccount((prevState) => ({
                            account: {
                              ...prevState.account,
                              lastName: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="form-input-sigin w-100">
                      <input
                        className="input-login"
                        type="text"
                        placeholder="Họ và Tên đệm"
                        onChange={(e) =>
                          setAccount((prevState) => ({
                            account: {
                              ...prevState.account,
                              firstName: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="form-input-sigin w-100">
                      <input
                        className="input-login"
                        type="text"
                        placeholder="Tên hiển thị"
                        onChange={(e) =>
                          setAccount((prevState) => ({
                            account: {
                              ...prevState.account,
                              username: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="form-input-sigin w-100">
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
                    <div className="form-input-sigin w-100">
                      <input
                        className="input-login"
                        type="text"
                        placeholder="Xác nhận mật khẩu"
                        onChange={(e) => setCheckPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      {showWarning ? (
                        <p className="text-check-password">
                          Xác nhận mật khẩu chưa chính xác
                        </p>
                      ) : (
                        <br />
                      )}
                    </div>

                    <div className="form-btn-login mb-3">
                      <button
                        onClick={() => handelSigin()}
                        className="btn-form-detail btn-main text-special"
                      >
                        Đăng Ký
                      </button>
                    </div>
                    <div className="form-btn-login">
                      <p>
                        Nếu đã có tài khoản thì bạn có thể
                        <strong
                          className="btn-page-login ms-1"
                          onClick={() => navigate("/login")}
                        >
                          Đăng Nhập
                        </strong>
                      </p>
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
};

export default Sigin;
