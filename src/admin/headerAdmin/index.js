import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { GiMeshBall } from "react-icons/gi";
import { FiSearch, FiUsers } from "react-icons/fi";
import { GoNote } from "react-icons/go";
import { SiBuymeacoffee } from "react-icons/si";
import { BsStars } from "react-icons/bs";
import { TbNotification } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import "./css.css";
import DropDownList from "../../function/dropDown";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="form-header-admin">
        <div
          onClick={() => navigate("/")}
          className="form-icon-header-admin form-tilte-header"
        >
          <GiMeshBall className="me-1 icon-title" size={30} />
          <h4 className="fw-bold mb-1">OnThePitch</h4>{" "}
        </div>
        <div className="body-header-admin">
          <div className="item-body-header-admin">
            <div className="child-item-body-header-admin">
              <HiAdjustments
                size={20}
                className="icon-item-body-header-admin"
              />
              <p className="title-item-body-header-admin">Tổng Quan</p>
            </div>
          </div>
          <div className="item-body-header-admin">
            <div className="child-item-body-header-admin">
              <GoNote size={20} className="icon-item-body-header-admin" />
              <p className="title-item-body-header-admin">Lượt đặt sân</p>
            </div>
          </div>
          <div className="item-body-header-admin">
            <div className="child-item-body-header-admin">
              <FiUsers size={20} className="icon-item-body-header-admin" />
              <p className="title-item-body-header-admin">Người đặt sân</p>
            </div>
          </div>
          <div className="item-body-header-admin">
            <div className="child-item-body-header-admin">
              <SiBuymeacoffee
                size={20}
                className="icon-item-body-header-admin"
              />
              <p className="title-item-body-header-admin">Sản phẩm tại sân</p>
            </div>
          </div>
          <div className="item-body-header-admin">
            <div className="child-item-body-header-admin">
              <BsStars size={20} className="icon-item-body-header-admin" />
              <p className="title-item-body-header-admin">Đánh giá</p>
            </div>
          </div>
        </div>
        <div className="footer-header-admim">
          <img
            className="avt-info-admin-header"
            src="image/nguoidung.jpg"
            alt=""
          />
          <div className="footer-header-right">
            <h6>Lê Hùng Thịnh</h6>
            <p className="text-sm text-secondary">Chủ sân ABC</p>
          </div>
        </div>
      </div>
      <div className="form-top-header">
        <div className="form-input-search-header-admin me-3">
          <FiSearch />
          <input
            placeholder="Tìm kiếm..."
            className="ms-3 input-search"
            type="text"
          />
        </div>
        <TbNotification
          size={50}
          className="form-icon-search-header-admin me-3"
        />

        <DropDownList
          alignDrop="right"
          itemMain={
            <HiUserCircle size={50} className="form-icon-search-header-admin" />
          }
        />
      </div>
    </>
  );
};

export default HeaderAdmin;
