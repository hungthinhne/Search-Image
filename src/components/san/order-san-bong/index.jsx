import {
  AiFillInstagram,
  AiFillPieChart,
  AiOutlineCalendar,
  AiOutlineUserAdd,
  AiTwotoneSetting,
} from "react-icons/ai";
import {
  BsCalendar2Check,
  BsChevronLeft,
  BsChevronRight,
  BsLink45Deg,
  BsStar,
  BsUiChecksGrid,
} from "react-icons/bs";
import { BiBookOpen, BiChevronDown } from "react-icons/bi";
import { MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { GiMeshBall, GiVolleyballBall } from "react-icons/gi";
import { IoIosHelpCircle, IoMdAdd, IoMdPricetag } from "react-icons/io";
import "./css.css";
import { FiStar } from "react-icons/fi";
import { RiCoinLine } from "react-icons/ri";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { Modal } from "reactstrap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useOnClickOutside } from "../../giohang";

const getTime = (intDate, type) => {
  const date = new Date(intDate);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const second =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  switch (type) {
    case "date":
      return `${day}/${month}/${year}`;
    case "time":
      return `${hour}:${minute}:${second}`;
    default:
      return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
};

const Timer = (props) => {
  const { type, setToday, getListOrder } = props; // date | time
  const [openList, setOpenList] = useState();
  const [dateSelect, setDateSelect] = useState();
  const ref2 = useRef();
  const [list, setList] = useState([]);
  useOnClickOutside(ref2, (evt) => {
    evt.stopPropagation();
    setOpenList(false);
  });

  useEffect(() => {
    const list_ = [];
    for (let i = 0, d = 86400000; i <= 4; i++) {
      list_.push(new Date().getTime() + d * i);
    }
    setDateSelect(list_[0]);
    setList(list_);
  }, [setToday]);

  const handleClickDate = useCallback(
    (date) => {
      setDateSelect(date);
      setToday(date);
    },
    [setToday]
  );

  return (
    <>
      <div
        ref={ref2}
        onClick={(evt) => setOpenList(!openList)}
        className="drop"
      >
        <span>{getTime(dateSelect, type)}</span>
        <div className={`${openList ? `list-drop` : `list-drop close-drop`}`}>
          <>
            {list.map((date) => (
              <p
                className="item-drop"
                onClick={() => {
                  handleClickDate(date);
                }}
              >
                {getTime(date, type)}
              </p>
            ))}
          </>
        </div>
      </div>
    </>
  );
};

const OrderSanBong = () => {
  const { id } = useParams();
  // const [listInfo, setListInfo] = useState([]);
  // const [listOrder, setListOrder] = useState([]);
  const [listSan, setListSan] = useState([]);
  const [data, setData] = useState();
  const [active, setActive] = useState();
  const [today, setToday] = useState();
  const listInfoSanRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getListInfo = useCallback(async () => {
    const response = await fetch(
      `http://localhost:8000/thongTinChildSan/?idChildSan=${id}`
    );
    return await response.json();
  }, [id]);

  const getListOrder = useCallback(
    /**
     *
     * @returns {Promise<Array>}
     */
    (today) => {
      return fetch(
        `http://localhost:8000/orderSan/?idSan=${id}&ngay=${getTime(
          today,
          "date"
        )}`
      ).then((response) => response.json());
    },
    [id]
  );

  const getList = useCallback(
    async (listInfoSan, date) => {
      // setToday(date);
      const clone = [...listInfoSan];
      if (id) {
        const listOrder = await getListOrder(date);
        const map = {};
        listOrder.forEach((order) => {
          map[order.gio] = order;
        });
        for (let i = 0; i < clone.length; i++) {
          const el = clone[i];
          el.active = !!map[el.gio];
        }
        setListSan(clone);
      }
    },
    [getListOrder, id]
  );

  const changeDate = useCallback(
    async (date) => {
      getList(listInfoSanRef.current, date);
      // setToday(date);
    },
    [getList]
  );

  useEffect(() => {
    getListInfo().then((res) => {
      listInfoSanRef.current = res[0].listPrice;
      getList(res[0].listPrice, new Date().getTime());
    });
  }, [getList, getListInfo]);

  // console.log(listOrder);

  // const listSan = useMemo(() => {
  //   listInfo.map((x) =>
  //     listOrder.map((y) => {
  //       if (x.gio === y.gio) {
  //         x.active = true;
  //       }
  //     })
  //   );
  //   return listInfo;
  // }, [listInfo, listOrder]);

  return (
    <>
      <ModalOrder
        getListOrder={getList}
        active={active}
        data={data}
        setData={setData}
        idSan={id}
        today={today}
      />
      <div className="form-default">
        <div className="form-order-san-bong">
          <div className="form-left-order-san-bong">
            <div className="body-top-left-order-sanbong">
              <h5 className="text-special text-muted">Tùy chọn</h5>
              <div className="list-option-left-order-san-bong border-bottom-2">
                <div className="item-option-left-order-san-bong active-option-order-left">
                  <BsUiChecksGrid className="icon-active-option-order-left" />
                  <p className="text-special">Đặt Sân</p>
                </div>
                <div className="item-option-left-order-san-bong">
                  <BiBookOpen />
                  <p className="text-special">Lịch Sử</p>
                </div>
                <div className="item-option-left-order-san-bong">
                  <BsStar />
                  <p className="text-special">Đánh Giá</p>
                </div>
                <div className="item-option-left-order-san-bong">
                  <AiFillPieChart />
                  <p className="text-special">Thông Số</p>
                </div>
              </div>
              <div className="list-option-left-order-san-bong">
                <div className="item-option-left-order-san-bong">
                  <AiTwotoneSetting className="" />
                  <p className="text-special">Cài Đặt</p>
                </div>
                <div className="item-option-left-order-san-bong">
                  <IoIosHelpCircle />
                  <p className="text-special">Trợ Giúp</p>
                </div>
              </div>
            </div>
          </div>
          <div className="form-right-order-san-bong">
            <div className="header-form-right-order-san-bong">
              <h2 className="text-green">Đặt Sân</h2>
              <div className="list-btn-header-right-order">
                <div className="btn-header-right-order me-3">
                  <IoMdAdd className="me-2" size={23} />{" "}
                  <p className="fw-bold text-special">Thêm Mới</p>
                </div>
                <MdOutlineEmail
                  size={45}
                  className="btn-secondary-header-right-order"
                />
              </div>
            </div>
            <div className="card-info-order-sanbong">
              <div className="header-card-info-order-sanbong d-flex align-items-center">
                <div className="left-header-card-info-order-sanbong">
                  <IoMdPricetag
                    className="text-light-green me-3 mb-1"
                    size={25}
                  />
                  <h4 className="me-2">Mã Sân :</h4>
                  <h4 className="text-secondary">09710827</h4>
                </div>
                <div className="left-header-card-info-order-sanbong ms-auto">
                  <AiOutlineCalendar
                    className="text-light-green mb-1 me-2"
                    size={20}
                  />
                  <h6 className="me-1">Ngày:</h6>
                  {/* <p className="text-secondary p-1 mb-1">
                    <Timer
                      getListOrder={getListOrder}
                      setToday={setToday}
                      type="date"
                    />
                  </p> */}
                  <p className="ms-2 text-light-green btn-card-info-order-sanbong border rounded fw-bold p-1 mb-1">
                    Chọn ngày
                  </p>
                  <BiChevronDown
                    size={30}
                    className="ms-5 text-light-green btn-card-info-order-sanbong rounded-tron border fw-bold p-1 mb-1"
                  />
                </div>
              </div>
              <div className="body-card-info-order-sanbong">
                <div className="item-body-card-info-order">
                  <BsCalendar2Check className="me-2 text-light-green" />{" "}
                  <strong>Trạng thái :</strong>
                  <p className="ms-2 text-secondary">Hoạt động</p>
                </div>
                <div className="item-body-card-info-order">
                  <GiVolleyballBall className="me-2 text-light-green" />{" "}
                  <strong>Loại sân :</strong>
                  <p className="ms-2 text-secondary">Sân 7 người.</p>
                </div>
                <div className="item-body-card-info-order">
                  <MdLocationOn className="me-2 text-light-green" />{" "}
                  <strong>Địa chỉ :</strong>
                  <p className="ms-2 text-secondary">
                    34/7 Đường ABC, Tp. Quy Nhơn
                  </p>
                </div>
              </div>
            </div>
            <h5 className="text-green ms-5 mt-5 mb-3">Chọn Khung Giờ</h5>
            <div className="body-form-right-card-order">
              <div className="form-main-body-right-order">
                <div className="form-calendar-order-left p-3">
                  <div className="form-header-calendar-order">
                    <BsChevronLeft className="text-light-green" />
                    <p className="fw-bold">
                      <Timer
                        getListOrder={getListOrder}
                        setToday={changeDate}
                        type="date"
                      />
                    </p>
                    <BsChevronRight className="text-light-green" />
                  </div>
                  <div className="form-body-calendar-order mt-2">
                    {listSan.map((item) => {
                      return (
                        <>
                          <div
                            onClick={() => {
                              !item.disable && setData(item);
                              setActive(item.active);
                            }}
                            className={`item-body-calendar-order ${
                              item.disable && `hour-disable`
                            } ${item.active && `hour-active`}`}
                          >
                            <div className="d-block text-center">
                              <h4>{item.gio}h</h4>
                              <p className="text-sm">{`${
                                item.disable
                                  ? `Bị khóa`
                                  : item.active
                                  ? `Đã đặt`
                                  : `Chưa đặt`
                              } `}</p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="form-order-right-body">
                  <div className="child-banner-right-order-san">
                    <FiStar size={25} className="mb-3" />
                    <h6>Đánh giá tích cực nếu bạn hài lòng.</h6>
                    <p>Viết đánh giá của bạn...</p>
                    <div className="btn-secondary mt-2">
                      <RiCoinLine />
                      <p className="ms-2 text-special">Gửi đánh giá</p>
                    </div>
                  </div>
                  <div className="child-banner-right-order-san">
                    <AiOutlineUserAdd size={25} className="mb-3" />
                    <h6>Mời bạn bè tham gia.</h6>
                    <p>Copy mã sân để mời...</p>
                    <div className="form-input-order border p-1 px-3 text-special disable-input text-primary">
                      <input
                        type="text"
                        disabled
                        className="border-0 box-shadown text-primary"
                        value="http://localhost:3000/order-san-bong/5"
                      />
                      <BsLink45Deg />
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

export default OrderSanBong;

const ModalOrder = (props) => {
  const { data, setData, active, getListOrder, idSan, today } = props;
  const [openNotifi, setOpenNotifi] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem("account"));

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

  const onOrder = () => {
    fetch("http://localhost:8000/orderSan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSan: idSan,
        idUser: dataUser.id,
        gia: data.price,
        ngay: today,
        gio: data.gio,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getListOrder();
        ToastMuaHang.fire({
          icon: "success",
          title: "Thông tin đặt sân của bạn đang được gửi đi! Hãy đến sân nhé!",
        });
        setData();
        setOpenNotifi();
      });
  };

  return (
    <>
      {
        <Modal isOpen={openNotifi} toggle={() => setOpenNotifi()}>
          <div className="form-notifi py-4">
            <h5 className="text-green">Xác Nhận Đặt Sân</h5>
            <div className="body-notifi">
              <p className="text-special">
                Thông tin của bạn sẽ được lưu lại trên hệ thống. Nếu có sơ sót
                hãy liên hệ với chúng tôi nhé!
              </p>
            </div>
            <div className="form-btn-notifi">
              <button
                onClick={() => setOpenNotifi()}
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
      <Modal size="xl" isOpen={!!data} toggle={() => setData()}>
        <div className="body-modal-order-san p-3">
          <div className="form-left-modal-order-san">
            <div className="w-100 d-flex">
              <GiMeshBall color="white" className="me-1 icon-title" size={35} />
              <h3 className="title-header fw-bold mb-1 text-white">
                OnThePitch
              </h3>{" "}
            </div>
            <div className="d-flex h-100">
              <div className="mt-auto mb-5">
                <h1 className="mt-auto text-white">
                  Sẽ luôn tích cực để mang đến cho bạn khoảng thời gian vui vẻ
                  bên đồng đội.
                </h1>
                <p className="text-white">
                  Hãy cùng nhau tạo nên một môi trường bóng đá lành mạnh
                </p>
              </div>
              {/* <h2 className="mt-auto text-white">
                Thông tin của bạn sẽ được lưu giữ và an toàn về bảo mật
              </h2> */}
            </div>
          </div>
          <div className="form-right-modal-order-san mt-3">
            <div className="body-right-modal-order-san">
              <div className="header-body-right-modal-order-san mb-4">
                <h5 className="text-green">Sân ABC</h5>
              </div>
              <div className="body-in-body-right-modal-order-san">
                <div className="form-avt-user">
                  <img
                    className="avt-order-san me-3"
                    // width={30}
                    src="/image/nguoidung.jpg"
                    alt=""
                  />
                  <div className="form-name-title-body-right-modal">
                    <h6>Lê Hùng Thịnh</h6>
                    <p className="text-secondary">Người đặt sân</p>
                  </div>
                </div>
                <div className="mt-3 form-center-body-right-modal-order-san">
                  <div className="item-body-right-modal-order-san">
                    <p>Thời gian đặt sân:</p>
                    <p className="ms-auto">05:00 21/2/2023</p>
                  </div>
                  <div className="item-body-right-modal-order-san">
                    <p>Mức tiền:</p>
                    <p className="ms-auto">{data?.price}.000 VNĐ</p>
                  </div>
                  <div className="item-body-right-modal-order-san">
                    <p>Thực hiện lúc:</p>
                    <p className="ms-auto">19:37 19/2/2023</p>
                  </div>
                  <div className="item-body-right-modal-order-san mt-3">
                    <b className="text-special">Thông tin sân</b>
                  </div>
                  <div className="header-delivery-right mt-2 gap-2">
                    <FaFacebookF
                      size={40}
                      className="btn-size w-100 text-secondary"
                    />
                    <FaYoutube
                      size={40}
                      className="btn-size w-100 text-secondary"
                    />
                    <AiFillInstagram
                      size={40}
                      className="btn-size w-100 text-secondary"
                    />
                  </div>
                </div>
                <div className="d-flex mt-4">
                  <div className="d-block">
                    <h6>Tổng Cộng:</h6>
                    <div className="item-body-right-modal-order-san">
                      Số tiền cụ thể theo mỗi khung giờ.
                    </div>
                  </div>
                  <h6 className="ms-auto">{data?.price}.000 VNĐ</h6>
                </div>
              </div>
            </div>
            {!active ? (
              <div className="footer-right-modal-order-san">
                <b className="text-special text-secondary">Xác nhận đặt sân:</b>
                <div
                  onClick={() => setOpenNotifi(true)}
                  className="btn-main mt-2 d-flex justify-content-center"
                >
                  <h6 className="m-0">XÁC NHẬN</h6>
                </div>
              </div>
            ) : (
              <div className="footer-right-modal-order-san bg-light">
                <div className="d-flex justify-content-center">
                  <h6 className="m-0 text-muted">Sân đã được đặt!</h6>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
