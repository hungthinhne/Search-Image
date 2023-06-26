import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css.css";

const ListChildSan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listChild, setListChild] = useState([]);
  const listSan5 = listChild?.filter((items) => items?.loaiSan === "san5");
  const listSan7 = listChild?.filter((items) => items?.loaiSan === "san7");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    id &&
      fetch(`http://localhost:8000/childSan/?idSan=${id}`)
        .then((response) => response.json())
        .then((data) => setListChild(data));
  }, [id]);

  return (
    <>
      <div className="form-default p-5">
        <div className="form-main-child-san">
          <div className="form-left-child-san">
            {!!listSan5.length && (
              <>
                <h5 className="ms-3 mt-5 text-green">Danh sách sân 5</h5>
                <div className="form-body-list-child-item-san-ngang">
                  {listSan5.map((items) => {
                    return (
                      <div
                        onClick={() => navigate(`/order-san-bong/${items.id}`)}
                        className="item-child-san nho-ngang"
                      >
                        <img
                          className="img-item-child-san"
                          src="/image/sanngang.jpg"
                          alt=""
                        />
                        <div className="form-hidden-title-item-child-san">
                          <div className="form-title-child-san d-block text-white">
                            <h1>Sân Test</h1>
                            <p>Sân 5 người</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {!!listSan7.length && (
              <div className="form-body-list-child-item-san-doc mt-2">
                <h5 className="ms-3 text-green">Danh sách sân 7</h5>
                {listSan7.map((items) => {
                  return (
                    <div
                      onClick={() => navigate(`/order-san-bong/${items.id}`)}
                      className="item-child-san nho-ngang"
                    >
                      <img
                        className="img-item-child-san"
                        src="/image/sanngang.jpg"
                        alt=""
                      />
                      <div className="form-hidden-title-item-child-san">
                        <div className="form-title-child-san d-block text-white">
                          <h1>Sân Test</h1>
                          <p>Sân 7 người</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="form-right-child-san"></div>
        </div>
      </div>
    </>
  );
};

export default ListChildSan;
