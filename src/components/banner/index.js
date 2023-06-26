import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";
import "./css.css";

const Banner = () => {
  return (
    <>
      <div className="pt-5">
        <div className="form-banner">
          <div className="banner-left">
            <div className="header-banner-left">
              <div className="btn-banner-left mb-3">Bắt đầu tìm sân</div>
              <div className="form-text-banner-left">
                <p className="text-special text-in-hoa">
                  Đâu là sân yêu thích của bạn
                </p>
                <p className="text-special">Hãy hết mình với đam mê.</p>
              </div>
            </div>
            <div className="footer-banner-left">
              <div className="title-footer-banner-left">
                <div className="btn-banner-footer-left">Xem giới thiệu</div>
              </div>
              <h1 className="title-footer-banner-left text-special text-big">
                Giới Thiệu
              </h1>
              <h1 className="title-footer-banner-left text-special text-green text-big">
                ONTHEPITCH
              </h1>
            </div>
            <div className="form-social-network">
              <AiFillFacebook className="item-social-network w-100" size={30} />
              <AiFillInstagram
                className="item-social-network w-100"
                size={30}
              />
              <AiFillYoutube className="item-social-network w-100" size={30} />
            </div>
          </div>
          <div className="banner-right">
            <div className="item-banner-right banner-top-right">
              <div className="btn-banner-left border-black mb-3">
                Gửi lời đánh giá
              </div>
              <p className="mt-5">
                Chúng tôi luôn lắng nghe ý kiến khách hàng để phát triển phù
                hợp.
              </p>
              <p className="m-0 text-special">
                Hãy gửi lời đánh giá của bạn về ứng dụng.
              </p>
              <div className="form-arrow-banner-right">
                <BsArrowUpLeft size={30} className="icon-arrow-banner-right" />
              </div>
            </div>
            <div className="item-banner-right banner-bottom-right">
              <div className="btn-banner-left mb-3">Xem mẫu giày</div>
              <p className="mt-5">
                Tổng hợp những mẫu giày mới nhất trong năm nay
              </p>
              <strong className="m-0 text-special">
                Được tổng hợp từ cửa hàng ONTHEPTICH
              </strong>
              <div className="form-arrow-banner-right">
                <BsArrowUpLeft size={30} className="icon-arrow-banner-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
