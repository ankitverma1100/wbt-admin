import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import "./ListSuper.scss";
import UserListTable from "../../../common/UserListTable";
import { useDispatch } from "react-redux";
import { setShowMarquee } from "../../../../store/global/slice";

const ListSuper = ({ forDeadClient }) => {
  const { userTyep, Listname } = useParams();
  const UserId = localStorage.getItem("userId");
  const [parentUserids, setParentUserIds] = useState(UserId);
  const dispatch = useDispatch();

  useEffect(() => {
    setParentUserIds(UserId);
  }, [UserId]);

  useEffect(() => {
    dispatch(setShowMarquee(false));
  }, [dispatch]);

  const { id } = useParams();

  const nav = useNavigate();
  const handleBackClick = () => {
    nav(-1);
  };

  const handleCreate = () => {
    nav(`/client/create-super/${Number(userTyep) + 1}`);
  };

  return (
    <>
      <div className="main_live_section list_supers">
        <div className="_match">
          <div className="sub_live_section live_report">
            <div
              style={{ padding: "5px 8px", fontSize: "26px" }}
              className="team_name">
              {forDeadClient ? "Dead" : ""} {Listname?.replace("-", " ") === 'Super Master' ? 'Super Agent Master' : Listname?.replace("-", " ")}{" "}
              Details
            </div>
            <div className="show_btn">
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
          {!id && !forDeadClient && <div className="table_section "></div>}
        </div>
        <div>
          {!id && !forDeadClient && (
            <div className="create_btn">
              <div onClick={handleCreate}>
                <p>
                  <Link to="#">
                    <AiOutlinePlus />
                    {""}
                    Create
                  </Link>
                </p>
              </div>
              <div>
                <p>
                  <Link to={`/client/limitplusminus-super/${userTyep}`}>
                    <AiOutlinePlus />
                    Update
                  </Link>
                </p>
              </div>
            </div>
          )}
          <div className="table_section sport_detail m-0">
            <UserListTable
              Listname={Listname}
              userType={userTyep}
              UserId={UserId}
              parentUserids={parentUserids}
              setParentUserIds={setParentUserIds}
              forDeadClient={forDeadClient}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSuper;
