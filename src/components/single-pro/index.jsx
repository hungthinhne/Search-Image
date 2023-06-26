import { Modal, UncontrolledCarousel } from "reactstrap";
import { CgDetailsMore } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./css.css";
import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import Order from "../order";

const listSize = [
  {
    id: "37",
    title: "37",
  },
  {
    id: "38",
    title: "38",
  },
  {
    id: "39",
    title: "39",
  },
  {
    id: "40",
    title: "40",
  },
  {
    id: "41",
    title: "41",
  },
  {
    id: "42",
    title: "42",
  },
  {
    id: "43",
    title: "43",
  },
];

const SingleProduct = (props) => {
  const {
    open,
    setOpen,
    idDetail,
    quanlityCart,
    sizeCart,
    isCart,
    idCart,
    callListCart,
  } = props;
  const dataUser = JSON.parse(localStorage.getItem("account"));
  const [product, setProduct] = useState();
  const [selectSize, setSelectSize] = useState(sizeCart ? sizeCart : "40");
  const [quanlity, setQuanlity] = useState(quanlityCart ? quanlityCart : 1);
  const [priceTotal, setPriceTotal] = useState(product?.price);
  const [openOrder, setOpenOrder] = useState(false);
  const [addCart, setAddCart] = useState({
    idProduct: "",
    idUser: "",
    name: "",
    urlImg: "",
    size: "",
    quanlity: 1,
    price: "",
  });

  const fistListImg = product?.listImage[0]?.url;

  const ToastThemVaoGioHang = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 2000,
    color: "black",
    background: "#f6f6f6",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const resultPrice = useMemo(() => {
    if (product?.price * quanlity) {
      setPriceTotal(product?.price * quanlity);
    } else {
      setPriceTotal(product?.price);
    }
    return priceTotal;
  }, [priceTotal, product?.price, quanlity]);

  useEffect(() => {
    product &&
      setAddCart({
        idProduct: product?.id,
        idUser: dataUser?.id,
        name: product?.name,
        urlImg: fistListImg,
        size: selectSize,
        quanlity: quanlity,
        price: product?.price,
      });
  }, [
    dataUser?.id,
    fistListImg,
    priceTotal,
    product,
    quanlity,
    resultPrice,
    selectSize,
  ]);

  const toastNotLogin = () => {
    toast.error(
      <div className="d-flex align-content-center h-100 p-2">
        <h5 className="mt-1">Bạn chưa đăng nhập tài khoản</h5>
      </div>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  const handelAddCart = () => {
    if (!dataUser) {
      toastNotLogin();
    } else if (quanlity === 0) {
      toast.error("Bạn chưa chọn số lượng!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      fetch("http://localhost:8000/gioHang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addCart),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          ToastThemVaoGioHang.fire({
            icon: "success",
            title: "Sản phẩm đang được thêm vào giỏ hàng",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setOpen(false);
    }
  };

  const handleUpdateCart = useCallback(() => {
    fetch(`http://localhost:8000/gioHang/${idCart}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addCart),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        ToastThemVaoGioHang.fire({
          icon: "success",
          title: "Giỏ hàng đã được cập nhật!",
        });
        callListCart();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setOpen(false);
  }, [ToastThemVaoGioHang, addCart, callListCart, idCart, setOpen]);

  useEffect(() => {
    idDetail &&
      fetch(`http://localhost:8000/giay/${idDetail}`)
        .then((response) => response.json())
        .then((data) => setProduct(data));
  }, [idDetail]);

  const resultQuanlity = useMemo(() => {
    if (quanlity <= 0) {
      setQuanlity(0);
    }
    if (product?.soLuong && quanlity >= product?.soLuong) {
      setQuanlity(product?.soLuong);
    }
    return quanlity;
  }, [product?.soLuong, quanlity]);

  return (
    <>
      {openOrder && (
        <Order
          dataUser={dataUser}
          openOrder={openOrder}
          setOpenOrder={setOpenOrder}
          isSinglePro={true}
          listProBuy={[
            {
              idProduct: product.id,
              idUser: dataUser?.id,
              name: product.name,
              urlImg: product.listImage[0].url,
              size: selectSize,
              quanlity: resultQuanlity,
              price: resultPrice,
            },
          ]}
          quanlityPro={resultQuanlity}
          totalPice={resultPrice}
          // callListCart={callListCart}
        />
      )}
      <Modal
        className="form-detail-product-main rounded-0"
        size="xl"
        // fullscreen
        isOpen={open}
        toggle={() => setOpen()}
      >
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
        <div className="p-4 bg-white border-bottom d-flex">
          <div className="form-title-header-detail d-flex">
            <CgDetailsMore className="me-3 text-green" />
            <h4 className="m-0 text-green">
              {isCart ? "Cập Nhật Giỏ Hàng" : "Thông Tin Sản Phẩm"}
            </h4>
          </div>
          <div className="form-right-header-detail d-flex h-100 ms-auto">
            <div className="ms-5" onClick={() => setOpen()}>
              <GrClose size={30} className="btn-close-x" />
            </div>
          </div>
        </div>
        <div className="m-0 form-main-detail">
          <div className="form-left-detail p-0 m-0">
            {product?.listImage && (
              <CarouselImg listImage={product?.listImage} />
            )}
          </div>
          <div className="p-4 bg-white">
            <div className="mb-2">
              <div className="row m-0 d-flex p-0">
                <h3 className="col-10 p-0 form-title-detail">
                  {product?.name}
                </h3>
                {/* <div className="col ps-auto from-header-detail-like fw-bold">
                  <FaHeart size={35} className="btn-like-detail ms-auto" />
                  <p className="number-like text-green">524</p>
                </div> */}
              </div>
              <h6 className="text-brown">{product?.description}</h6>
            </div>
            <div className="form-right-detail m-0 h-100">
              <Tabs
                activeTab="1"
                className="mt-2 body-form-right-detail"
                ulClassName=""
                activityClassName="bg-success"
                onClick={(event, tab) => console.log(event, tab)}
              >
                <Tab title="Mua Hàng" className="mr-3 text-green text-special">
                  <div className="mt-4 border-bottom">
                    <p className="title-info-detail-pro text-special">
                      Giá tiền :
                    </p>
                    <div className="d-flex mt-2 ">
                      <h5 className="me-1">
                        {new Intl.NumberFormat().format(priceTotal)}
                      </h5>
                      <h6>VNĐ</h6>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="title-info-detail-pro text-special">
                      Số Lượng :
                    </p>
                    <div className="row p-0 m-0">
                      <div className="mt-2 d-flex col-6 px-0 form-quality">
                        <div
                          onClick={() => setQuanlity(quanlity - 1)}
                          className="w-25 btn-size btn-qualiti"
                        >
                          <strong className="m-0">-</strong>
                        </div>
                        <div className="btn-size mx-2 form-input-quality">
                          <input
                            className="border-0 w-50 input-quality"
                            type="number"
                            value={resultQuanlity}
                            onChange={(e) => setQuanlity(e.target.value)}
                          />
                        </div>
                        <div
                          onClick={() => {
                            setQuanlity(quanlity + 1);
                          }}
                          className="w-25 btn-size btn-qualiti"
                        >
                          <strong className="m-0">+</strong>
                        </div>
                      </div>
                      <div className="col d-flex align-items-end">
                        <h5 className="ms-auto mb-0 me-2 text-green">
                          {product?.soLuong ? product?.soLuong : 0}
                        </h5>
                        <p className="mt-1 text-special">Sản phẩm</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="title-info-detail-pro text-special">
                      Chọn Kích Thước :
                    </p>
                    <div className="form-list-size">
                      {listSize.map((item) => {
                        if (item.id === selectSize) {
                          return (
                            <>
                              <div className="w-100 btn-size btn-size-select">
                                <p className="m-0 text-special">{item.title}</p>
                              </div>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <div
                                onClick={() => setSelectSize(item.id)}
                                className="w-100 btn-size"
                              >
                                <p className="m-0 text-special">{item.title}</p>
                              </div>
                            </>
                          );
                        }
                      })}
                    </div>
                  </div>
                </Tab>
                <Tab
                  title="Thông Tin Sản Phẩm"
                  className="mr-3 text-green text-special"
                >
                  <div className="mt-4">
                    <p className="text-special mb-2">Giới thiệu sản phẩm :</p>
                    {product?.fullDescription}
                  </div>
                </Tab>

                <Tab title="Khác" className="mr-3 text-green text-special">
                  <div className="mt-4 d-flex justify-content-center">
                    <i className="text-secondary">Không có thông tin</i>
                  </div>
                </Tab>
              </Tabs>
            </div>
            <div className="d-flex form-btn-detail border-top">
              {!isCart ? (
                <>
                  <button
                    onClick={() => handelAddCart()}
                    className="btn-form-detail btn-add-cart text-special"
                  >
                    <AiOutlineShoppingCart className="me-1" /> THÊM VÀO GIỎ HÀNG
                  </button>
                  <button
                    onClick={() =>
                      dataUser ? setOpenOrder(true) : toastNotLogin()
                    }
                    className="btn-form-detail btn-buy-cart text-special"
                  >
                    MUA NGAY
                  </button>
                </>
              ) : (
                <button
                  onClick={dataUser ? handleUpdateCart : toastNotLogin()}
                  className="btn-form-detail btn-buy-cart text-special"
                >
                  CẬP NHẬT ĐƠN HÀNG
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SingleProduct;

const CarouselImg = (props) => {
  const { listImage } = props;

  return (
    <>
      <UncontrolledCarousel
        dark
        className="text-green"
        items={listImage?.map((item) => {
          return {
            src: `image/sanpham/giay/${item.url}`,
          };
        })}
      />
    </>
  );
};
