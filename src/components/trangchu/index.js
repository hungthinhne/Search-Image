import "./trangchu.css";
import Trending from "../trending";
import ListGiay from "../giay";
import ListSanBong from "../san";
import Banner from "../banner";

const TrangChu = () => {
  return (
    <>
      {/* <div className="form-banner">
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
      </div> */}
      <Banner />
      <Trending />
      <ListSanBong trangChu={true} />
      <ListGiay trangChu={true} />
    </>
  );
};

export default TrangChu;
