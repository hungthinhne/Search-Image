import { BiDotsHorizontalRounded, BiSearch } from "react-icons/bi";
import { RiShieldUserFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillEnvironment, AiOutlineCodeSandbox } from "react-icons/ai";
import "./css.css";
import { VscListFilter } from "react-icons/vsc";
import Tabs, { Tab } from "react-best-tabs";
import { useCallback, useEffect, useState } from "react";

const DonHang = () => {
  const [listAll, setListAll] = useState([]);
  const dataUser = JSON.parse(localStorage.getItem("account"));
  const [idOrder, setIdOrder] = useState(listAll[0]?.id);

  useEffect(() => {
    setIdOrder(listAll ? listAll[0]?.id : null);
  }, [listAll]);

  const callListOrder = useCallback(() => {
    dataUser?.id &&
      fetch(`http://localhost:8000/donHang/?idUser=${dataUser?.id}`)
        .then((response) => response.json())
        .then((data) => {
          // const list = data.map((dt) => ({ ...dt, checked: true }));
          // setAll(list);
          setListAll(data);
        });
  }, [dataUser?.id]);

  useEffect(() => {
    callListOrder();
  }, [callListOrder]);

  return (
    <>
      <div className="form-default form-delivery bg-white">
        <div className="form-delivery-left">
          <div className="header-delivery">
            <div className="form-header-delivery-left">
              <h3 className="text-green">Đơn Hàng</h3>
              <p>Danh sách đơn hàng của bạn.</p>
            </div>
            <div className="form-search-delivery-left">
              <div className="item-form-right-order">
                <div className="form-input-order search-delivery-left border">
                  <BiSearch className="me-2" />
                  <input
                    className="border-0 w-75 input-order text-special"
                    type="text"
                    placeholder="Số nhà (chỉ được nhập số)..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-body-delivery-left">
            {listAll.map((item) => {
              return (
                <>
                  <div
                    onClick={() => setIdOrder(item.id)}
                    className="item-delivery-left"
                  >
                    <div className="form-header-body-delivery-left">
                      <div className="form-header-delivery-left">
                        <p className="text-secondary">Mã đơn hàng</p>
                        <h3 className="text-green text-in-hoa">
                          {item.idOrder}
                        </h3>
                      </div>
                      <div className="form-status-delivery-left ms-auto">
                        Đang giao
                      </div>
                    </div>
                    <div className="body-item-delivery-left py-2">
                      <div className="form-from-deliver-left">
                        <AiOutlineCodeSandbox
                          size={40}
                          className="icon-item-delivery-left me-3"
                        />
                        <div className="form-header-delivery-left">
                          <p className="text-secondary">From</p>
                          <h6>Shop ONTHEPITCH</h6>
                        </div>
                      </div>
                      <div className="line-dashed"></div>
                      <div className="form-from-deliver-left">
                        <AiFillEnvironment
                          size={40}
                          className="icon-item-delivery-left icon-location-deliver me-3"
                        />
                        <div className="form-header-delivery-left">
                          <p className="text-secondary">To</p>
                          <h6>Your Location</h6>
                        </div>
                      </div>
                    </div>
                    <div className="footer-item-deliver-left pt-3">
                      <div className="form-from-deliver-left">
                        <img
                          src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/240402793_161170292815322_6732564725449236059_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9HjCHTTglhYAX9AHHBN&_nc_oc=AQmFMbf9Z3AKjpebTX3UqCrXST9FbvL8rEKLAr0sh3viUpWut1CS-pmOOCZNtZlKWuz3P0xDZ8CsHERsP919aLDp&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfCGmUXTb9vxi3dKhq8f9S7aAh8jMCvbpqO_XFunHEep6g&oe=63F45400"
                          alt=""
                          height={50}
                          className="me-3 avt-delivery"
                        />
                        <div className="form-header-delivery-left">
                          <p className="text-secondary">Người đặt</p>
                          <h5>HungThinh</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <FormDeliveryBody idOrder={idOrder} />
      </div>
    </>
  );
};

export default DonHang;

const FormDeliveryBody = (props) => {
  const { idOrder } = props;
  const [singleDelivery, setSingleDelivery] = useState();

  useEffect(() => {
    idOrder &&
      fetch(`http://localhost:8000/donHang/${idOrder}`)
        .then((response) => response.json())
        .then((data) => {
          // const list = data.map((dt) => ({ ...dt, checked: true }));
          // setAll(list);
          setSingleDelivery(data);
        });
  }, [idOrder]);

  return (
    <>
      <div className="form-delivery-right">
        <div className="d-flex p-3 align-items-center">
          <p className="text-secon-header-right me-2">ID Order :</p>{" "}
          <h3 className="text-green text-in-hoa">{singleDelivery?.idOrder}</h3>
          <div className="form-status-delivery-left p-2 ms-auto">
            <h5 className="m-0">Đang giao</h5>
          </div>
        </div>
        <div className="header-delivery-right">
          <div className="item-header-right-delivery">
            <div className="header-item-right-delivery">
              <RiShieldUserFill
                size={40}
                className="icon-item-right-delivery icon-user-delivery"
              />{" "}
              Người đặt hàng
            </div>
            <div className="body-item-header-right-deliver mt-3">
              <h4>Hung Thinh</h4>
            </div>
          </div>
          <div className="item-header-right-delivery">
            <div className="header-item-right-delivery">
              <BsFillTelephoneFill
                size={40}
                className="icon-item-right-delivery icon-phone-delivery"
              />{" "}
              Số điện thoại
            </div>
            <div className="body-item-header-right-deliver mt-3">
              <h4>+097 9230 765</h4>
            </div>
          </div>
          <div className="item-header-right-delivery">
            <div className="header-item-right-delivery">
              <IoIosHome
                size={40}
                className="icon-item-right-delivery icon-location-delivery"
              />{" "}
              Địa chỉ
            </div>
            <div className="body-item-header-right-deliver mt-3">
              <h4>67/8 Phan Đình Phùng</h4>
            </div>
          </div>
        </div>
        <div className="body-form-delivery-tab">
          <Tabs
            activeTab="1"
            className=""
            ulClassName=""
            activityClassName="bg-success"
            onClick={(event, tab) => console.log(event, tab)}
          >
            <Tab
              title="Danh sách sản phẩm"
              className="mr-3 text-green text-special"
            >
              <div className="mt-3">
                <div className="body-form-delivery">
                  <div className="header-body-form-cart">
                    <div className="form-funcion-header ms-auto">
                      <VscListFilter
                        size={30}
                        className="me-3 btn-funcion-header"
                      />
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
                  <div className="w-100 p-3 d-flex justify-content-center">
                    <i className="mt-3 text-green">
                      Chưa có sản phẩm nào trong giỏ hàng..
                    </i>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab title="Trạng thái" className="mr-3 text-green text-special">
              <div className="mt-3">Tab 2 content</div>
            </Tab>
            <Tab title="Ghi chú" className="mr-3 text-green text-special">
              <div className="mt-3">Tab 3 content</div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};
