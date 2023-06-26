import { useRef, useState } from "react";
import {} from "react-icons/ai";
import { useOnClickOutside } from "../components/giohang";

const DropDownList = (props) => {
  const { itemMain, alignDrop } = props;
  const [openDrop, setOpenDrop] = useState();

  const handleLogout = () => {
    localStorage.removeItem("account");
    window.location.href = "/";
  };

  const ref2 = useRef();
  useOnClickOutside(ref2, () => {
    setOpenDrop(false);
  });
  return (
    <>
      <div
        ref={ref2}
        onClick={() => setOpenDrop(!openDrop)}
        className={`drop  ${alignDrop === "right" && `drop-right`}`}
      >
        {itemMain}
        <div
          className={`${
            openDrop
              ? `list-drop-dung-chung`
              : `list-drop-dung-chung close-drop`
          }`}
        >
          <div
            className={`${
              alignDrop === "right"
                ? `triangle-right`
                : alignDrop === "left"
                ? `triangle-left`
                : `triangle`
            }`}
          ></div>
          <>
            <p className="item-drop">Thông tin người dùng</p>
            <p onClick={handleLogout} className="item-drop">
              Đăng xuất
            </p>
          </>
        </div>
      </div>
    </>
  );
};

export default DropDownList;
