import { useEffect, useState } from "react";
import Tabs, { Tab } from "react-best-tabs";
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
      fetch("http://localhost:8000/register", {
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
        <div className="outline-login">
          <div className="bg-login bg-sigin">
            <div className="body-sigin">
              <div></div>
              <div className="form-sigin-right">
                <div className="d-flex">
                  <Link className="link-none-style ms-auto" to="/">
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
                {/* <div className="body-form-login-left d-block">
                  <div className="d-block">
                    <h3 className="text-brown">Đăng Ký</h3>
                    <p className="text-special">Hãy là thành viên mới của</p>
                  </div>
                  <div className="d-flex">
                    <div className="form-body-sigin">
                      <div className="form-grid-sigin-name">
                        <div className="form-input-login">
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
                        <div className="form-input-login">
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
                        <div className="form-input-login">
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
                      </div>
                      <div className="form-input-login">
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
                      <div className="form-input-login">
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
                      <div className="form-input-login">
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
                </div> */}
                <div className="form-right-body-order ms-2 rounded-bottom">
                  <div className="d-flex">
                    <div className="d-block">
                      <h3 className="text-green">Đăng Ký</h3>
                      <p className="text-secondary">
                        Hãy là thành viên mới của OnThePitch.
                      </p>
                    </div>
                  </div>
                  <br />
                  <div className="form-body-right-order">
                    <div className="item-form-right-order">
                      <p className="text-special">Số Điện Thoại(Tài Khoản):</p>
                      <div className="form-input-order">
                        <input
                          className="border-0 w-75 input-order text-special"
                          type="number"
                          placeholder="Số điện thoại..."
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
                    </div>
                    <div className="item-form-right-order">
                      <p className="text-special">Tên hiển thị:</p>
                      <div className={`form-input-order`}>
                        <input
                          className="border-0 w-75 input-order text-special"
                          type="text"
                          placeholder="Tên hiển thị..."
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
                    </div>
                  </div>
                  <div className="form-info-ship-at-home">
                    <div className="mt-3 form-three-body-right-order">
                      <div className="item-form-right-order">
                        <p className="text-special">Tên:</p>
                        <div className={`form-input-order`}>
                          <input
                            className="border-0 w-75 input-order text-special"
                            type="text"
                            placeholder="Tên..."
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
                      </div>
                      <div className="item-form-right-order">
                        <p className="text-special">Họ và tên đệm:</p>
                        <div className={`form-input-order`}>
                          <input
                            className="border-0 w-75 input-order text-special"
                            type="text"
                            placeholder="Họ và tên đệm..."
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
                      </div>
                      <div className="item-form-right-order">
                        <p className="text-special">Nơi ở hiện tại:</p>
                        <div className={`form-input-order`}>
                          <input
                            className="border-0 w-75 input-order text-special"
                            type="text"
                            placeholder="Nơi ở hiện tại..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-body-right-order mt-3">
                    <div className="item-form-right-order">
                      <p className="text-special">Mật khẩu:</p>
                      <div className="form-input-order">
                        <input
                          className="border-0 w-75 input-order text-special"
                          type="text"
                          placeholder="Mật khẩu..."
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
                    </div>
                    <div className="item-form-right-order">
                      <p className="text-special">Xác nhận mật khẩu:</p>
                      <div className={`form-input-order`}>
                        <input
                          className="border-0 w-75 input-order text-special"
                          type="text"
                          placeholder="Xác nhận mật khẩu..."
                          onChange={(e) => setCheckPassword(e.target.value)}
                        />
                      </div>
                      {showWarning ? (
                        <p className="text-check-password">
                          Xác nhận mật khẩu chưa chính xác
                        </p>
                      ) : (
                        <br />
                      )}
                    </div>
                  </div>
                  <div className="form-btn-login d-flex justify-content-center mt-5">
                    <div className="item-form-right-order">
                      <button
                        onClick={() => handelSigin()}
                        className="btn-main w-100 text-special"
                      >
                        ĐĂMG KÝ
                      </button>
                    </div>
                  </div>
                  <div className="form-btn-login mt-3 d-flex justify-content-center">
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
    </>
  );
};

export default Sigin;
