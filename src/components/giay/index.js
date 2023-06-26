import "./css.css";
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import SingleProduct from "../single-pro";

const ListGiay = (props) => {
  const { trangChu } = props;
  const [listGiay, setListGiay] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [idDetail, setIdDetail] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/giay")
      .then((response) => response.json())
      .then((data) => setListGiay(data));
  }, []);
  return (
    <>
      <div className="form-list-giay">
        <h2 className={`text-light-green ${!trangChu && `mt-5 pt-5`}`}>
          Các Sản Phẩm Giày Nổi Bật
        </h2>
        <p>Đây là một số sản phẩm nổi bật được bán chạy nhất trong cửa hàng.</p>
        <div className="list-giay row m-0 p-5">
          {listGiay?.map((giay) => {
            return (
              <>
                <div
                  key={giay.id}
                  onClick={() => setIdDetail(giay.id)}
                  className="item-list-giay col-3"
                >
                  <ImgeListGiay
                    setOpenDetail={setOpenDetail}
                    listImage={giay.listImage}
                  />
                  <div
                    onClick={() => setOpenDetail(true)}
                    className="info-item-list my-3"
                  >
                    <h5 className="text-light-green">{giay.name}</h5>
                    <p>{giay.description}</p>
                    <div className="d-flex mt-auto">
                      <strong className="text-brown">
                        {new Intl.NumberFormat().format(giay.price)} VNĐ
                      </strong>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="w-100">
          <h4 className="btn-xem-them">Xem thêm</h4>
        </div>
      </div>
      {openDetail && (
        <SingleProduct
          idDetail={idDetail}
          open={openDetail}
          setOpen={setOpenDetail}
        />
      )}
    </>
  );
};

export default ListGiay;

const ImgeListGiay = (props) => {
  const { listImage, setOpenDetail } = props;
  const [urlMain, setUrlMain] = useState();

  useEffect(() => {
    setUrlMain(listImage[0]?.url);
  }, [listImage]);

  return (
    <>
      <img
        className="main-img-giay"
        src={`image/sanpham/giay/${urlMain}`}
        alt=""
        onClick={() => setOpenDetail(true)}
      />
      {/* <AiOutlineHeart className="icon-like" size={25} /> */}
      <div className="row mx-0 mt-1 px-0">
        {listImage.map((item) => {
          if (urlMain === item.url) {
            return (
              <img
                key={item.id}
                className="extra-img-giay border-img-extra col-3 p-0"
                src={`image/sanpham/giay/${item.url}`}
                alt=""
                onClick={() => setUrlMain(item.url)}
              />
            );
          } else {
            return (
              <img
                key={item.id}
                className="extra-img-giay col-3 p-0"
                src={`image/sanpham/giay/${item.url}`}
                alt=""
                onClick={() => setUrlMain(item.url)}
              />
            );
          }
        })}
      </div>
    </>
  );
};
