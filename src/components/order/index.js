import { Modal } from "reactstrap";
import "./css.css";
import { GrClose } from "react-icons/gr";
import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import {
  MdEditLocation,
  MdHomeWork,
  MdLocationCity,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { nFormatter, useOnClickOutside } from "../giohang";
import { GiMeshBall } from "react-icons/gi";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillPhone } from "react-icons/ai";
import { TiSortNumerically } from "react-icons/ti";
import Tabs, { Tab } from "react-best-tabs";
import { listHuyen, listPhuong, listTinh } from "../../function/listLocation";
import Swal from "sweetalert2";
import { v4 as uuid } from "uuid";

const listShip = [
  {
    id: 1,
    title: "AtTheShop",
  },
  {
    id: 2,
    title: "Shipping",
  },
];

const Order = (props) => {
  const {
    openOrder,
    setOpenOrder,
    callListCart,
    listProBuy,
    totalPice,
    quanlityPro,
    dataUser,
    isSinglePro,
  } = props;
  const [info, setInfo] = useState();
  const [selectShip, setSelectShip] = useState(1);
  const [openTinh, setOpenTinh] = useState(false);
  const [openHuyen, setOpenHuyen] = useState(false);
  const [openPhuong, setOpenPhuong] = useState(false);
  const [tinh, setTinh] = useState();
  const [huyen, setHuyen] = useState();
  const [phuong, setPhuong] = useState();
  const [addShip, setAddShip] = useState(1);
  const [sdt, setSdt] = useState(dataUser?.email);
  const [diaChiNha, setDiaChiNha] = useState({ soNha: "" }, { tenDuong: "" });
  const [diaChiKv, setDiaChiKV] = useState({ to: "" }, { khuVuc: "" });
  const [isDiaChi, setIsDiaChi] = useState(1);
  const [openNotifi, setOpenNotifi] = useState(false);
  const [listCheck, setListCheck] = useState({
    sdt: true,
    tinh: true,
    huyen: true,
    phuong: true,
    soNha: true,
    tenDuong: true,
    to: true,
    khuVuc: true,
  });
  const unique_id = uuid();

  useEffect(() => {
    console.log(unique_id);
  }, [unique_id]);

  const ToastMuaHang = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3500,
    color: "#2c5a40",
    background: "#f6f6f6",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    localStorage.getItem("account") &&
      setInfo(JSON.parse(localStorage.getItem("account")));
  }, []);

  const ref = useRef();
  useOnClickOutside(ref, () => {
    setOpenHuyen(false);
    setOpenPhuong(false);
    setOpenTinh(false);
  });

  const handleToggleForm = useCallback(() => {
    setOpenOrder();
    callListCart();
  }, [callListCart, setOpenOrder]);

  const toggleNotifi = () => {
    setOpenNotifi(!openNotifi);
  };

  const onOrder = () => {
    fetch("http://localhost:8000/donHang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        selectShip === 2
          ? {
              idOrder: unique_id.slice(0, 6),
              status: 0,
              idUser: dataUser?.id,
              sdt: sdt,
              totalPice: totalPice,
              isShip: false,
              listProBuy: listProBuy,
              diaChi:
                isDiaChi === 1
                  ? { tinh, huyen, phuong, diaChiNha }
                  : { tinh, huyen, phuong, diaChiKv },
              timeOrder: new Date().toLocaleString() + "",
            }
          : {
              idOrder: unique_id.slice(0, 6),
              status: 1,
              idUser: dataUser?.id,
              sdt: sdt,
              totalPice: totalPice,
              isShip: false,
              listProBuy: listProBuy,
              timeOrder: new Date().toLocaleString() + "",
            }
      ),
    })
      .then((response) => response.json())
      .then((data) => {
        ToastMuaHang.fire({
          icon: "success",
          title: "Đơn hàng của bạn đang được gửi đi! Hãy chờ nhận hàng nhé!",
        });
        isSinglePro
          ? setOpenOrder(false)
          : listProBuy.map((item) => {
              fetch(`http://localhost:8000/gioHang/${item.id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  handleToggleForm();
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleOrder = useCallback(() => {
    setOpenNotifi(false);
    if (selectShip === 1) {
      if (sdt.length < 10 || !sdt) {
        setListCheck({ sdt: false });
      } else {
        setOpenNotifi(true);
      }
    } else if (selectShip === 2) {
      if (sdt.length < 10 || !sdt) {
        setListCheck({ sdt: false });
      } else if (!tinh) {
        setListCheck({ tinh: false });
      } else if (!huyen) {
        setListCheck({ huyen: false });
      } else if (!phuong) {
        setListCheck({ phuong: false });
      } else if (isDiaChi === 1) {
        if (!diaChiNha.soNha) {
          setListCheck({ soNha: false });
        } else if (!diaChiNha.tenDuong) {
          setListCheck({ tenDuong: false });
        } else {
          setOpenNotifi(true);
        }
      } else if (isDiaChi === 2) {
        if (!diaChiKv.to) {
          setListCheck({ to: false });
        } else if (!diaChiKv.khuVuc) {
          setListCheck({ khuVuc: false });
        } else {
          setOpenNotifi(true);
        }
      }
    }
  }, [diaChiKv, diaChiNha, huyen, isDiaChi, phuong, sdt, selectShip, tinh]);

  return (
    <>
      {
        <Modal isOpen={openNotifi} toggle={toggleNotifi}>
          <div className="form-notifi py-4">
            <h5 className="text-green">Xác Nhận Đặt Hàng</h5>
            <div className="body-notifi">
              <p className="text-special">
                Đơn hàng của bạn sẽ được shop chuẩn bị. Hãy xác nhận rằng bạn
                muốn mua sản phẩm nhé!
              </p>
            </div>
            <div className="form-btn-notifi">
              <button
                onClick={toggleNotifi}
                className="btn-notifi text-special btn-notifi-cancel"
              >
                Hủy
              </button>
              <button
                onClick={onOrder}
                className="btn-notifi text-special btn-notifi-ok"
              >
                OK
              </button>
            </div>
          </div>
        </Modal>
      }
      <Modal fullscreen isOpen={openOrder} toggle={() => handleToggleForm()}>
        <div className="p-4 bg-white border-bottom d-flex">
          <div className="form-title-header-detail d-flex">
            <h4 className="my-0 me-3 border-right text-green">OnThePitch</h4>
            <p className="text-secondary-header-order my-0 text-special">
              Thông tin giao hàng
            </p>
          </div>
          <div className="form-list-header-right-order">
            <div className="form-item-header-right-order">
              <BsCheckLg
                size={24}
                className="form-icon-item-header-order icon-success-order"
              />{" "}
              <h6 className="mb-1">Thông tin giao hàng</h6>
            </div>
            - - - - - - -
            <div className="form-item-header-right-order">
              <p className="form-icon-item-header-order form-number-item-header-order text-special">
                2
              </p>{" "}
              <h6 className="mb-1">Chờ giao hàng</h6>
            </div>
            - - - - - - -
            <div className="form-item-header-right-order">
              <p className="form-icon-item-header-order form-number-item-header-order text-special">
                3
              </p>{" "}
              <h6 className="mb-1 text-secondary-list-order">
                Giao hàng thành công
              </h6>
            </div>
          </div>
          <div className="form-right-header-detail d-flex h-100">
            <div className="ms-5" onClick={() => handleToggleForm()}>
              <GrClose
                size={30}
                className="btn-close-x btn-close-x-header-order"
              />
            </div>
          </div>
        </div>
        <div className="body-form-order">
          <div className="form-left-body-order">
            <h5>Danh Sách Sản Phẩm</h5>
            {/* <p>{unique_id}</p> */}
            <p className="text-secondary">
              Hãy kiểm tra lại danh sách các sản phẩm trong đơn hàng để tránh
              sai sót.
            </p>
            <div className="mt-2 form-list-product-order">
              {listProBuy &&
                listProBuy.map((item) => {
                  return (
                    <div className="form-item-product-order">
                      <img
                        className="img-item-product-order btn-size p-0"
                        src={`image/sanpham/giay/${item?.urlImg}`}
                        alt=""
                      />
                      <div className="form-body-item-produc-order">
                        <p className="text-green text-special">{item?.name}</p>
                        <div className="form-price-item-produc-order">
                          <p className=" text-special me-1">
                            {nFormatter(item?.price * item?.quanlity)} VNĐ
                          </p>
                          <p className="text-secondary">
                            / {item?.quanlity} sản phẩm
                          </p>
                        </div>
                      </div>
                      <div className="form-footer-item-product-order form-small-1">
                        Size : <strong>{item?.size}</strong>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="d-flex border-bottom mt-3 pb-3 mb-3">
              <h6 className="m-0 mt-1">Tổng cộng :</h6>{" "}
              <h5 className="ms-2 text-green">
                {new Intl.NumberFormat().format(
                  addShip === 2 ? totalPice + 15000 : totalPice
                )}
                VNĐ / {quanlityPro} danh mục
              </h5>
            </div>
            <div className="footer-form-left-order mt-4">
              <h5>Phương thức nhận hàng</h5>
              {listShip.map((item) => {
                if (item.id === 1) {
                  return (
                    <>
                      <div>
                        <div
                          className={`form-item-product-order form-item-footer-order btn-size ${
                            selectShip === item.id && `btn-size-select`
                          }`}
                          onClick={() => {
                            setSelectShip(item.id);
                            setAddShip(item.id);
                            setListCheck({
                              sdt: true,
                              tinh: true,
                              huyen: true,
                              phuong: true,
                              soNha: true,
                              tenDuong: true,
                              to: true,
                              khuVuc: true,
                            });
                          }}
                        >
                          <div className="d-flex btn-size align-items-center form-tilte-header">
                            <GiMeshBall
                              color="#eda766"
                              className="me-2 icon-title"
                              size={25}
                            />
                            <h5 className="title-header pt-1 fw-bold">
                              OnThePitch
                            </h5>
                          </div>
                          <div className="form-body-item-produc-order">
                            <h6>Nhận hàng trực tiếp tại shop</h6>
                            <div className="form-price-item-produc-order">
                              <p className="text-secondary">
                                Nhận tại shop từ 1 - 3 ngày.
                              </p>
                            </div>
                          </div>
                          <div className="form-footer-item-product-order form-item-footer-order-footer">
                            <strong className="me-2">Free</strong>{" "}
                            <input
                              checked={selectShip === item.id}
                              type="radio"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
                if (item.id === 2) {
                  return (
                    <>
                      <div className="mt-3">
                        <div
                          className={`form-item-product-order form-item-footer-order btn-size ${
                            selectShip === item.id && `btn-size-select`
                          }`}
                          onClick={() => {
                            setSelectShip(item.id);
                            setAddShip(item.id);
                            setListCheck({
                              sdt: true,
                              tinh: true,
                              huyen: true,
                              phuong: true,
                              soNha: true,
                              tenDuong: true,
                              to: true,
                              khuVuc: true,
                            });
                          }}
                        >
                          <div className="d-flex btn-size align-items-center text-green form-tilte-header">
                            <MdOutlineLocalShipping
                              className="me-1 icon-title"
                              size={25}
                            />
                            <h5 className="pt-1 fw-bold me-3">SHIPPING</h5>
                          </div>
                          <div className="form-body-item-produc-order">
                            <h6>Giao hàng tại nhà</h6>
                            <div className="form-price-item-produc-order">
                              <p className="text-secondary">
                                Nhận sản phẩm sau 5 - 7 ngày.
                              </p>
                            </div>
                          </div>
                          <div className="form-footer-item-product-order form-item-footer-order-footer">
                            <strong className="me-2">15.000</strong>{" "}
                            <input
                              checked={selectShip === item.id}
                              type="radio"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
          <div className="form-right-body-order">
            <div className="d-flex">
              <div className="d-block">
                <h5>Thông tin giao hàng</h5>
                <p className="text-secondary">
                  Bạn hãy nhập đầy đủ thông tin của mình và chờ nhận hàng.
                </p>
              </div>
              <div className="ms-auto me-4">
                <button
                  onClick={handleOrder}
                  className="btn-main box-shadown text-special d-flex align-items-center"
                >
                  Xác Nhận Đặt Hàng
                </button>
              </div>
            </div>
            <br />
            <div className="form-body-right-order">
              <div className="item-form-right-order">
                <p className="text-special">Người đặt hàng:</p>
                <div className="form-input-order disable-input">
                  <input
                    disabled
                    className="border-0 w-75 input-order disable-input text-special"
                    type="text"
                    value={info?.username}
                  />
                  <BsCheckLg
                    size={24}
                    className="form-icon-item-header-order ms-auto icon-success-order"
                  />
                </div>
              </div>
              <div className="item-form-right-order">
                <p className="text-special">Số điện thoại:</p>
                <div
                  className={`form-input-order ${
                    !listCheck.sdt && sdt.length < 10 && `bg-canh-bao`
                  }`}
                >
                  <input
                    className="border-0 w-75 input-order text-special"
                    type="number"
                    placeholder="Số điện thoại..."
                    value={sdt}
                    onChange={(e) => setSdt(e.target.value)}
                  />
                  {!sdt || sdt?.length < 10 ? (
                    <AiFillPhone className="ms-auto" />
                  ) : (
                    <BsCheckLg
                      size={24}
                      className="form-icon-item-header-order ms-auto icon-success-order"
                    />
                  )}
                </div>
              </div>
            </div>
            {selectShip === 2 && (
              <div className="form-info-ship-at-home">
                <div ref={ref} className="mt-3 form-three-body-right-order">
                  <div
                    className="drop"
                    onClick={() => setOpenTinh((pre) => !pre)}
                  >
                    <div className="item-form-right-order">
                      <p className="text-special">Tỉnh/Thành phố trực thuộc:</p>
                      <div
                        className={`form-input-order ${
                          !listCheck.tinh && !tinh && `bg-canh-bao`
                        }`}
                      >
                        <input
                          className="border-0 w-75 input-order text-special"
                          type="text"
                          placeholder="Tỉnh..."
                          value={tinh}
                        />
                        {!tinh ? (
                          <BsChevronDown
                            className={`ms-auto ${openTinh && `rotate-icon`}`}
                          />
                        ) : (
                          <BsCheckLg
                            size={24}
                            className="form-icon-item-header-order ms-auto icon-success-order"
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className={`list-drop-input me-4 ${
                        !openTinh && `close-drop`
                      }`}
                    >
                      {listTinh.map((item) => {
                        return (
                          <p
                            key={item.id}
                            onClick={() => setTinh(item.title)}
                            className="item-drop-input"
                          >
                            {item.title}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className="drop"
                    onClick={() => tinh && setOpenHuyen((pre) => !pre)}
                  >
                    <div className="item-form-right-order">
                      <p className="text-special">Quận/Huyện/Thành phố:</p>
                      <div
                        className={`form-input-order ${
                          !tinh && `disable-input`
                        } ${!listCheck.huyen && !huyen && `bg-canh-bao`}`}
                      >
                        <input
                          disabled={tinh ? false : true}
                          className="border-0 w-75 input-order text-special"
                          type="text"
                          placeholder="Quận/Huyện..."
                          value={huyen}
                        />
                        {!huyen ? (
                          <BsChevronDown
                            className={`ms-auto ${openHuyen && `rotate-icon`}`}
                          />
                        ) : (
                          <BsCheckLg
                            size={24}
                            className="form-icon-item-header-order ms-auto icon-success-order"
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className={`list-drop-input me-4 ${
                        !openHuyen && `close-drop`
                      }`}
                    >
                      {listHuyen.map((item) => {
                        return (
                          <p
                            key={item.id}
                            onClick={() => setHuyen(item.title)}
                            className="item-drop-input"
                          >
                            {item.title}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className="drop"
                    onClick={() => huyen && setOpenPhuong((pre) => !pre)}
                  >
                    <div className="item-form-right-order">
                      <p className="text-special">Phường/Xã:</p>
                      <div
                        className={`form-input-order ${
                          !huyen && `disable-input`
                        } ${!listCheck.phuong && !phuong && `bg-canh-bao`}`}
                      >
                        <input
                          disabled={huyen ? false : true}
                          className="border-0 w-75 input-order text-special"
                          type="text"
                          placeholder="Phường/Xã..."
                          value={phuong}
                        />
                        {!phuong ? (
                          <BsChevronDown
                            className={`ms-auto ${openPhuong && `rotate-icon`}`}
                          />
                        ) : (
                          <BsCheckLg
                            size={24}
                            className="form-icon-item-header-order ms-auto icon-success-order"
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className={`list-drop-input me-4 ${
                        !openPhuong && `close-drop`
                      }`}
                    >
                      {listPhuong.map((item) => {
                        return (
                          <p
                            key={item.id}
                            onClick={() => setPhuong(item.title)}
                            className="item-drop-input"
                          >
                            {item.title}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <p className="text-special mt-3">
                  Địa chỉ cụ thể (Bạn có thể chọn 1 trong 2):
                </p>
                <div className="form-single-dia-chi">
                  <Tabs
                    activeTab="1"
                    className="mt-2 body-form-right-detail form-input-order d-block"
                    ulClassName=""
                    activityClassName="bg-success"
                    onClick={(event, tab) => setIsDiaChi(tab)}
                  >
                    <Tab
                      title="Địa chỉ nhà"
                      className="mr-3 text-green text-special"
                    >
                      <div className="p-3">
                        <div className="form-body-right-order">
                          <div className="item-form-right-order">
                            <div
                              className={`form-input-order disable-input ${
                                !listCheck.soNha &&
                                !diaChiNha.soNha &&
                                `bg-canh-bao`
                              }`}
                            >
                              <input
                                className="border-0 w-75 input-order disable-input text-special"
                                type="text"
                                placeholder="Số nhà (chỉ được nhập số)..."
                                onChange={(e) =>
                                  setDiaChiNha({
                                    ...diaChiNha,
                                    soNha: e.target.value,
                                  })
                                }
                              />
                              <TiSortNumerically className="ms-auto" />
                            </div>
                          </div>
                          <div className="item-form-right-order">
                            <div
                              className={`form-input-order disable-input ${
                                !listCheck.tenDuong &&
                                !diaChiNha.tenDuong &&
                                `bg-canh-bao`
                              }`}
                            >
                              <input
                                className="border-0 w-75 input-order disable-input text-special"
                                type="text"
                                placeholder="Tên Đường.."
                                onChange={(e) =>
                                  setDiaChiNha({
                                    ...diaChiNha,
                                    tenDuong: e.target.value,
                                  })
                                }
                              />
                              <MdEditLocation className="ms-auto" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      title="Tổ/Khu vực"
                      className="mr-3 text-green text-special"
                    >
                      <div className="p-3">
                        <div className="form-body-right-order">
                          <div className="item-form-right-order">
                            <div
                              className={`form-input-order disable-input ${
                                !listCheck.to && !diaChiKv.to && `bg-canh-bao`
                              }`}
                            >
                              <input
                                className="border-0 w-75 input-order disable-input text-special"
                                type="number"
                                placeholder="Tổ (chỉ được nhập số)..."
                                onChange={(e) =>
                                  setDiaChiKV({
                                    ...diaChiKv,
                                    to: e.target.value,
                                  })
                                }
                              />
                              <MdLocationCity className="ms-auto" />
                            </div>
                          </div>
                          <div className="item-form-right-order">
                            <div
                              className={`form-input-order disable-input ${
                                !listCheck.khuVuc &&
                                !diaChiKv.khuVuc &&
                                `bg-canh-bao`
                              }`}
                            >
                              <input
                                className="border-0 w-75 input-order disable-input text-special"
                                type="number"
                                placeholder="Khu vực (chỉ được nhập số)..."
                                onChange={(e) =>
                                  setDiaChiKV({
                                    ...diaChiKv,
                                    khuVuc: e.target.value,
                                  })
                                }
                              />
                              <MdHomeWork className="ms-auto" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
                <div className="item-form-right-dia-chi">
                  <p className="text-special">Ghi chú:</p>
                  <div className="form-input-order form-textarea-order w-100">
                    <textarea
                      className="border-0 input-order textarea-order"
                      type="text"
                      rows="2"
                      cols="20"
                      placeholder="Ghi chú cho đơn hàng..."
                    />
                  </div>
                </div>
              </div>
            )}
            {selectShip === 1 && (
              <>
                <div className="pe-3">
                  <div className="form-info-ship-at-home form-input-order d-block mt-4 p-4">
                    <p className="text-special m-0">Hướng dẫn:</p>
                    <h1 className="mb-0 mt-3">"</h1>
                    <div className="px-5 d-block">
                      <div>
                        <i>
                          <strong>Đơn hàng</strong> của bạn sẽ được chuẩn bị từ{" "}
                          <strong>1 - 3</strong> ngày sau khi đặt.
                        </i>
                      </div>
                      <div className="mt-2">
                        <i>
                          Chúng tôi sẽ gọi vào <strong>số điện thoại</strong> mà
                          bạn đã đăng ký trong đơn hàng ngay sau khi sản phẩm đã
                          được <strong>chuẩn bị hoàn tất</strong>.
                        </i>
                      </div>
                      <div className="mt-2">
                        <i>
                          <strong>Đơn hàng</strong> sẽ được lưu giữ ở shop để
                          đóng gói. Sản phẩm sẽ được đảm bảo chất lượng tốt nhất
                          để đến tay người dùng.
                        </i>
                      </div>
                      <div className="mt-2">
                        <i>
                          <i className="text-brown text-special">
                            Chú ý :{" "}
                            <strong className="text-special">Đơn hàng</strong>{" "}
                            của bạn chỉ được lưu giữ không quá{" "}
                            <strong className="text-special">1 tuần</strong> kể
                            từ khi{" "}
                            <strong className="text-special">Thông báo</strong>.
                          </i>
                        </i>
                      </div>
                    </div>
                    <div className="d-flex">
                      <h1 className="mb-0 ms-auto me-4 mt-3">"</h1>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Order;
