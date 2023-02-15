import "./trangchu.css";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import img1 from "../../img/izuddin-helmi-adnan-K5ChxJaheKI-unsplash.jpg";
import img2 from "../../img/braden-hopkins-b4sSOgZrkQ4-unsplash.jpg";
import Trending from "../trending";
import ListGiay from "../giay";
import ListSanBong from "../san";

const TrangChu = () => {
  return (
    <>
      <div className="form-banner">
        <div className="body-banner">
          <div className="banner-left">
            <p className="text-light">
              Chúng tôi hoạt động và sẽ luôn luôn phát triển là vì đam mê của
              bạn.
            </p>
            <h1 className="text-white text-bigger-banner">ON THE PTICH</h1>
            <h3 className="text-white text-big-banner">
              HÃY HẾT MÌNH VỚI ĐAM MÊ, THỂ THAO KẾT NỐI MỌI NGƯỜI, TẠO NÊN CUỘC
              SỐNG LÀNH MẠNH.
            </h3>
            <button className="btn-banner mt-5">
              <h5 className="m-0">TÌM SÂN BÓNG</h5>
            </button>
            <div className="form-social-network d-flex">
              <AiFillFacebook className="item-social-network" size={30} />
              <AiFillInstagram className="item-social-network" size={30} />
              <AiFillYoutube className="item-social-network" size={30} />
            </div>
          </div>
          <div className="banner-right">
            <div className="form-img-banner">
              <img className="img-banner img-banner-1" src={img1} alt="" />
            </div>
            <div className="form-img-banner">
              <img className="img-banner img-banner-2" src={img2} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Trending />
      <ListSanBong trangChu={true} />
      <ListGiay trangChu={true} />
      <div className={`w-100 p-5`}>
        <div className="w-100 p-5 bg-green">
          <div className="text-center">
            <h3 className="mb-2 text-brown">Đăng Ký Tài Khoản</h3>
            <strong>Sẽ Mang Lại Trải Nghiệm Đầy Đủ Nhất Cho Bạn!</strong>
          </div>
          <div className="box-email d-flex mt-5 justify-content-center">
            <div className="bg-white form-email-footer d-flex p-3">
              <input
                className="border-0 input-simple input-email-footer"
                placeholder="Nhập Email..."
                type="text"
              />
              <button className="btn-banner ms-auto w-50 btn-email-footer">
                Gửi Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrangChu;
