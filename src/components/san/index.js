import "./css.css";
import { AiOutlineArrowRight, AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";

const ListSanBong = (props) => {
  const { trangChu } = props;
  const [listSanBong, setListSanBong] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/sanbong")
      .then((response) => response.json())
      .then((data) => setListSanBong(data));
  }, []);

  return (
    <>
      <div
        className={`form-list-san-bong p-5 ${
          trangChu && `bg-img-san-bong`
        } text-center`}
      >
        <div className={`${!trangChu && `mt-5 pt-5`}`}>
          <h2 className="text-brown">Danh Sách Sân Bóng Đá</h2>
          <strong className={`${trangChu && `text-white`}`}>
            Tổng hợp danh sách toàn bộ sân bóng uy tín nhất ở Quy Nhơn.
          </strong>
          <div className="body-list-san-bong row p-5">
            {listSanBong?.map((item) => {
              return <ItemSanBong itemSanBong={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSanBong;

const ItemSanBong = (props) => {
  const { itemSanBong } = props;
  return (
    <>
      <div className="item-list-san-bong col-4">
        <div className="form-ranting-start">
          <AiOutlineStar size={23} className="me-1" />
          <strong>{itemSanBong?.starRating}</strong>
        </div>
        <div className="form-ten-san-bong">
          <h4>{itemSanBong?.name}</h4>
        </div>
        <div className="form-dia-chi-san-bong">
          <p>{itemSanBong?.diaChi}</p>
        </div>
        <div className="form-arrow-right bg-light-green">
          <AiOutlineArrowRight size={27} />
        </div>
        <img
          className="img-san-bong col-12"
          src={`image/sanbong/${itemSanBong?.urlImg}`}
          alt=""
        />
      </div>
    </>
  );
};
