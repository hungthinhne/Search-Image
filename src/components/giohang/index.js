import { useCallback, useEffect, useRef, useState } from "react";
import "./css.css";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import { VscListFilter } from "react-icons/vsc";
import { BiDotsHorizontalRounded, BiDotsVertical } from "react-icons/bi";
import { Modal } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import Order from "../order";

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export const nFormatter = (num) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(2).replace(rx, "$1") + item.symbol
    : "0";
};

const GioHang = () => {
  const [listCart, setListCart] = useState([]);
  const dataUser = JSON.parse(localStorage.getItem("account"));
  const [sumAmount, setAmount] = useState(0);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [listProBuy, setListProBuy] = useState();
  const [totalPice, setTotalPice] = useState();
  const [quanlityPro, setQuanlityPro] = useState();

  const calculateSumAmount = useCallback((list) => {
    const amount = list.reduce((sum, item) => {
      if (item.checked) {
        sum += item.price * item.quanlity;
      }
      return sum;
    }, 0);
    return amount;
  }, []);

  const setAll = useCallback(
    (list) => {
      setListCart(list);
      const sum = calculateSumAmount(list);
      setAmount(sum);
      listCart?.length &&
        setIsSelectAll(list.filter((f) => f.checked).length === list.length);
    },
    [calculateSumAmount, listCart?.length]
  );

  const callListCart = useCallback(() => {
    dataUser?.id &&
      fetch(`http://localhost:8000/gioHang/?idUser=${dataUser?.id}`)
        .then((response) => response.json())
        .then((data) => {
          const list = data.map((dt) => ({ ...dt, checked: true }));
          setAll(list);
        });
  }, [dataUser?.id, setAll]);

  useEffect(() => {
    callListCart();
  }, [callListCart]);

  const handleClickInput = useCallback(
    (card) => {
      const listCartClone = [...listCart];
      const index = listCartClone.indexOf(card);
      listCartClone[index] = { ...card, checked: !card.checked };
      setAll(listCartClone);
    },
    [listCart, setAll]
  );

  const handleBuyMultiple = () => {
    if (listCart.filter((item) => item.checked === true).length) {
      setListProBuy(listCart.filter((item) => item.checked === true));
      setOpenOrder(true);
      setTotalPice(sumAmount);
      setQuanlityPro(listCart.filter((item) => item.checked === true).length);
    } else {
      toast.error(
        <div>
          <strong>Bạn chưa chọn sản phẩm!</strong>
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
    }
  };

  const handleSelectAll = useCallback(() => {
    const list = listCart.map((m) => ({
      ...m,
      checked: !isSelectAll,
    }));
    setAll(list);
  }, [isSelectAll, listCart, setAll]);

  // const thongBao = () => {
  //   toast.success(
  //     <div>
  //       <strong>Bạn đã đặt mua thành công!</strong>
  //     </div>,
  //     {
  //       position: "top-center",
  //       autoClose: 4000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     }
  //   );
  // };

  return (
    <>
      {
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
      }
      {openOrder && (
        <Order
          dataUser={dataUser}
          openOrder={openOrder}
          setOpenOrder={setOpenOrder}
          listProBuy={listProBuy}
          quanlityPro={quanlityPro}
          totalPice={totalPice}
          callListCart={callListCart}
        />
      )}
      <div className="form-default bg-light pb-2">
        <div className="header-form-cart">
          <AiOutlineShoppingCart size={25} className="me-4" />
          <div className="form-title-header-cart bg-light rounded p-2">
            <h5 className="mb-2 me-1 text-green">Giày</h5>
            <p className="me-1">
              / {listCart?.length ? listCart?.length : 0} sản phẩm
            </p>
            <BsFillCaretDownFill />
          </div>
          <div className="form-search-header-cart bg-light">
            <AiOutlineSearch />
            <input
              className="input-search-header-card ms-2"
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
            />
          </div>
          <div className="form-total-header-card ps-5 me-3">Tổng cộng :</div>
          <button onClick={handleBuyMultiple} className="btn-main">
            Đặt hàng{" "}
            <strong className="text-special">
              {nFormatter(sumAmount)} VNĐ
            </strong>
          </button>
        </div>

        <div className="body-form-cart">
          <div className="header-body-form-cart">
            <input
              type="checkbox"
              className="me-2 text-green"
              onClick={handleSelectAll}
              checked={isSelectAll}
            />
            <strong>Chọn tất cả</strong>
            <div className="form-funcion-header ms-auto">
              <VscListFilter size={30} className="me-3 btn-funcion-header" />
              <BiDotsHorizontalRounded
                size={30}
                className="btn-funcion-header"
              />
            </div>
          </div>
          <div className="form-header-table-body-cart">
            <div></div>
            <div className="item-header-table-cart">
              <h6>Sản phẩm</h6>
            </div>
            <div className="item-header-table-cart">
              <h6>Kích cở</h6>
            </div>
            <div className="item-header-table-cart">
              <h6>Số lượng</h6>
            </div>
            <div className="item-header-table-cart">
              <h6>Giao hàng</h6>
            </div>
            <div className="item-header-table-cart">
              <h6>Giá tiền</h6>
            </div>
            <div></div>
          </div>
          {listCart.length ? (
            listCart.map((item) => {
              return (
                <ItemCartBody
                  setListProBuy={setListProBuy}
                  callListCart={callListCart}
                  item={item}
                  handleClickInput={handleClickInput}
                  idUser={dataUser?.id}
                  setOpenOrder={setOpenOrder}
                  setQuanlityPro={setQuanlityPro}
                  setTotalPice={setTotalPice}
                />
              );
            })
          ) : (
            <div className="w-100 p-3 d-flex justify-content-center">
              <i className="mt-3 text-green">
                Chưa có sản phẩm nào trong giỏ hàng..
              </i>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GioHang;

const ItemCartBody = (props) => {
  const {
    item,
    handleClickInput,
    callListCart,
    idUser,
    setListProBuy,
    setOpenOrder,
    setTotalPice,
    setQuanlityPro,
  } = props;
  const [openOption, setOpenOption] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setOpenOption(false));
  const [openNotifi, setOpenNotifi] = useState(false);

  const handleClick = () => {
    setOpenNotifi(true);
  };

  const handleOk = () => {
    fetch(`http://localhost:8000/gioHang/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpenNotifi(false);
        callListCart();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddQuanliti = () => {
    fetch(`http://localhost:8000/gioHang/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quanlity: item.quanlity + 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        callListCart();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleMinusQuanliti = () => {
    fetch(`http://localhost:8000/gioHang/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quanlity: item.quanlity ? item.quanlity - 1 : 0 }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        callListCart();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleBuySingle = () => {
    setOpenOrder(true);
    setListProBuy([
      {
        id: item.id,
        idUser: idUser,
        name: item.name,
        price: item.price,
        quanlity: item.quanlity,
        size: item.size,
        urlImg: item.urlImg,
      },
    ]);
    setQuanlityPro(1);
    setTotalPice(item.price * item.quanlity);
  };

  const toggleNotifi = () => {
    setOpenNotifi();
  };

  return (
    <>
      {
        <Modal
          isOpen={openNotifi}
          toggle={toggleNotifi}
          callListCart={callListCart}
        >
          <div className="form-notifi">
            <h5 className="text-green">Thông Báo</h5>
            <div className="body-notifi">
              <p>Bạn có chắc chắn muốn xóa sản phẩm không?</p>
            </div>
            <div className="form-btn-notifi">
              <button
                onClick={toggleNotifi}
                className="btn-notifi text-special btn-notifi-cancel"
              >
                Hủy
              </button>
              <button
                onClick={handleOk}
                className="btn-notifi text-special btn-notifi-ok"
              >
                OK
              </button>
            </div>
          </div>
        </Modal>
      }
      <div className="item-table-body-cart">
        <div className="items-table-cart d-flex justify-content-center">
          <input
            className="ms-3"
            type="checkbox"
            checked={item.checked}
            onClick={() => handleClickInput(item)}
          />
        </div>
        <div className="items-table-cart items-product-table">
          <img
            width={70}
            src={`image/sanpham/giay/${item?.urlImg}`}
            className="rounded box-shadow me-3"
            alt=""
          />
          <div className="form-body-item-table">
            <h6 className="text-light-green">{item?.name}</h6>
            <div className="d-flex">
              Loại sản phẩm :<strong className="ms-1">Giày</strong>
            </div>
          </div>
        </div>
        <div className="items-table-cart">
          <h5 className="btn-size btn-size-cart">{item?.size}</h5>
        </div>
        <div className="items-table-cart">
          <div className="mt-2 d-flex px-0 mx-0 form-quality control-height-items-table">
            <div
              onClick={handleMinusQuanliti}
              className="w-25 btn-size btn-qualiti"
            >
              <strong className="m-0">-</strong>
            </div>
            <div className="btn-size mx-2 form-input-quality">
              <input
                className="border-0 input-quality control-width-items-table"
                type="number"
                value={item?.quanlity}
              />
            </div>
            <div
              onClick={handleAddQuanliti}
              className="w-25 btn-size btn-qualiti"
            >
              <strong className="m-0">+</strong>
            </div>
          </div>
        </div>
        <div className="items-table-cart">
          <p>Shipping:</p>
          <strong className="text-special text-green ms-1 mb-1">
            Nhận tại shop
          </strong>
        </div>
        <div className="items-table-cart">
          <h6>
            {new Intl.NumberFormat().format(item?.price * item?.quanlity)} VNĐ
          </h6>
        </div>
        <div className="items-table-cart">
          <div
            ref={ref}
            onClick={() => setOpenOption(!openOption)}
            className="drop-option-cart"
          >
            <BiDotsVertical size={30} className="btn-funcion-header me-3" />
            <div
              className={`list-drop-option-cart ${
                openOption ? `` : `close-drop`
              }`}
            >
              <p onClick={handleBuySingle} className="item-drop">
                Đặt hàng
              </p>
              <p className="item-drop">Thông tin sản phẩm</p>
              <p
                className="item-drop text-dang-xuat"
                onClick={() => handleClick()}
              >
                Xóa khỏi giỏ hàng
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
