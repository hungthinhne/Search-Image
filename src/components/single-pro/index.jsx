import { Modal, UncontrolledCarousel } from "reactstrap";
import { CgDetailsMore } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./css.css";
import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const listSize = [
  {
    id: "S",
    title: "Small",
  },
  {
    id: "M",
    title: "Medium",
  },
  {
    id: "L",
    title: "Large",
  },
  {
    id: "XL",
    title: "X-Large",
  },
  {
    id: "XXL",
    title: "XX-Large",
  },
];

const SingleProduct = (props) => {
  const { open, setOpen, idDetail } = props;
  const dataUser = JSON.parse(localStorage.getItem("account"));
  const [product, setProduct] = useState();
  const [selectSize, setSelectSize] = useState("M");
  const [quanlity, setQuanlity] = useState(1);
  const [priceTotal, setPriceTotal] = useState(product?.price);
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
    position: "bottom-right",
    showConfirmButton: false,
    timer: 2000,
    color: "#2c5a40",
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

  const handelAddCart = () => {
    if (!dataUser) {
      toast.error("Hãy đăng nhập để thực hiện!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (quanlity === 0) {
      toast.error("Bạn chưa chọn số lượng!", {
        position: "top-center",
        autoClose: 5000,
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
            title: "Sản phẩm đã được thêm vào giỏ hàng",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setOpen(false);
    }
  };

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
      <Modal
        className="form-detail-product-main rounded-0"
        size="xl"
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
            <h4 className="m-0 text-green">Thông Tin Sản Phẩm</h4>
          </div>
          <div className="form-right-header-detail d-flex h-100 ms-auto">
            <div className="ms-5" onClick={() => setOpen()}>
              <GrClose size={30} className="btn-close-x" />
            </div>
          </div>
        </div>
        <div className="row m-0 form-main-detail">
          <div className="col-6 form-left-detail p-0 m-0">
            {product?.listImage && (
              <CarouselImg listImage={product?.listImage} />
            )}
          </div>
          <div className="col-6 p-4 bg-white">
            <div className="mb-2">
              <div className="row m-0 d-flex p-0">
                <h3 className="col-10 p-0 form-title-detail">
                  {product?.name}
                </h3>
                <div className="col ps-auto from-header-detail-like fw-bold">
                  <FaHeart size={35} className="btn-like-detail ms-auto" />
                  <p className="number-like text-green">5444</p>
                </div>
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
                                <p className="m-0">{item.title}</p>
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
                                <p className="m-0">{item.title}</p>
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
              <button
                onClick={() => handelAddCart()}
                className="btn-form-detail btn-add-cart text-special"
              >
                <AiOutlineShoppingCart className="me-1" /> THÊM VÀO GIỎ HÀNG
              </button>
              <button className="btn-form-detail btn-buy-cart text-special">
                MUA NGAY
              </button>
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