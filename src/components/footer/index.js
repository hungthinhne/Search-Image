import "./css.css";

const Footer = () => {
  return (
    <>
      <div className={`w-100 p-5`}>
        <div className="w-100 p-5 bg-green">
          <div className="text-center">
            <h3 className="mb-2 text-brown">Gửi Lời Đánh Giá</h3>
            <strong>
              Sẽ Luôn Cải Thiện Để Mang Lại Trải Nghiệm Tốt Nhất Cho Bạn!
            </strong>
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
      <div className="w-100 d-flex form-footer">
        © Copyright 2023. Design by
        <a
          className="text-white border-0 link-footer"
          href="https://www.facebook.com/profile.php?id=100067670570817"
        >
          <strong className="mx-1">HungThinh.</strong>
        </a>
      </div>
    </>
  );
};

export default Footer;
