import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "./../../context/AuthContext";
import "../../styles/components/profile/appointment.css";
import Table from "../Table/Table";

export default function History() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/appointment/cancel?UserId=" + user._id
      );
      setData(res.data.value);
    };
    fetchAppointment();
  }, [user._id]);

  const columns = useMemo(
    () => [
      {
        field: "date",
        headerName: "Ngày",
        width: 120,
      },
      {
        field: "slotTime",
        headerName: "Thời gian",
        width: 100,
      },
      {
        field: "Services",
        headerName: "Dịch vụ",
        width: 120,
      },
      {
        field: "Staff",
        headerName: "Nhân viên",
        width: 150,
      },

      {
        field: "Status",
        headerName: "Trạng thái",
        width: 90,
      },
    ],
    [rowId]
  );

  return (
    <div className="appointment">
      {data ? (
        <div className="list-appointment">
          <span className="title-appointment"> Danh sách đặt hẹn</span>
          <Table
            title={"Quản lý dịch vụ"}
            column={columns}
            row={data}
            rowId={rowId}
            setRowId={setRowId}
          />
        </div>
      ) : (
        <div className="list-appointment">
          <span className="title-appointment">Danh sách cuộc hẹn</span>
          <div className="no-appointment">Bạn không có cuộc hẹn</div>
        </div>
      )}
    </div>
  );
}
