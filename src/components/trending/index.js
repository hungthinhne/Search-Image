import "./css.css";
import trending1 from "../../img/trending1.jpg";
import trending2 from "../../img/trending2.jpg";

const Trending = () => {
  return (
    <>
      <div className="form-trending w-100 mb-3">
        <div className="form-trending-left p-3">
          <h2 className="text-light-green">Phong Trào Bóng Đá Thiếu Nhi</h2>
          <h4 className="text-green">
            Cùng nhau khám phá những phòng trào nổi bật trong tuần vừa qua.
          </h4>
          <div className="mt-5">
            <p className="text-green">
              Phòng trào bóng đá đang dần tiếp cận nhiều hơn với những lứa tuổi
              thiếu nhi. Sau khi dịch bệnh kết thúc đi kèm với các lượt trận
              trong chiến dịch WoldCup 2022, niềm hâm mộ đối với Đội tuyển ở
              SeaGame. Qua đó thúc đẫy mạnh mẻ các phong trào, các giải đấu lứa
              thiếu nhi.
            </p>
          </div>
          <button className="btn-banner mt-5">
            <h5 className="m-0">TÌM HIỂU THÊM</h5>
          </button>
        </div>
        <div className="form-trending-right">
          <img className="img-trending img-trending-2" src={trending2} alt="" />
          <img className="img-trending img-trending-1" src={trending1} alt="" />
        </div>
      </div>
    </>
  );
};

export default Trending;
