import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "./../../context/AuthContext";
import "../../styles/components/profile/appointment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../Table/Table";
import { MdFreeCancellation } from "react-icons/md";
import { Badge } from "antd";

export default function Appointment() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/appointment/?UserId=" + user._id
      );
      setData(res.data.value);
    };
    fetchAppointment();
  }, [user._id]);

  const Cancel = ({ params, setRowId }) => {
    const DeleteHandle = async (
      idAppointment,
      idStaff,
      idDate,
      idSlot,
      email
    ) => {
      const status = "cancel";
      const data = {
        DateId: idDate,
        StaffId: idStaff,
        SlotId: idSlot,
        Status: status,
        Email: email,
      };
      try {
        const res = await axios.put(
          "http://localhost:8800/api/appointment/update-cancel/" +
          idAppointment,
          data
        );
        toast.success("Successful cancellation of appointment");
        const reson = await axios.get(
          "http://localhost:8800/api/appointment/pending?UserId=" + user._id
        );
        setData(reson.data.value);
      } catch (error) {
        toast.error("Cancellation of appointment failed");
      }
    };

    return (
      <div className="view">
        <button
          className="button-view"
          style={{ width: 100 }}
          onClick={() => {
            if (window.confirm("Bạn có chắc chắn hủy cuộc hẹn này không?"))
              DeleteHandle(
                params.row._id,
                params.row.StaffId,
                params.row.DateId,
                params.row.SlotId,
                params.row.Email
              );
          }}
        >
          <MdFreeCancellation className="icon-view" style={{ color: "red", width: 40 }} />
        </button>
      </div>
    );
  };

  // state columns of table
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
        renderCell: (params) => {
          const servicesArray = Array.isArray(params?.row?.Services) ? params.row.Services : [];
          return (
            <div className="service-list">
              {servicesArray.length > 0 ? (
                <p>{servicesArray.join(", ")}</p>
              ) : (
                <p>No services available</p>
              )}
            </div>
          );
        },
        minWidth: 400,
      },
      {
        field: "Staff",
        headerName: "Nhân viên",
        width: 150,
      },

      {
        field: "Status",
        headerName: "Trạng thái",
        width: 200,
        renderCell: (params) => <Badge
          color={params.row.Status === 'pending' ? 'yellow' : (params.row.Status === 'accept' ? 'green' : 'red')}
          text={params.row.Status === 'pending' ? 'Đang xử lý' : (params.row.Status === 'accept' ? 'Đã xác nhận' : 'Đã bị hủy')}>
        </Badge>
      },
      {
        field: "Action",
        width: 70,
        headerName: "Hủy Lịch",
        type: "actions",
        renderCell: (params) => <>
          {params?.row.Status === 'pending' &&
            <Cancel {...{ params, rowId, setRowId }} />}
        </>,
      },
    ],
    [rowId]
  );

  return (
    <div className="appointment">
      <ToastContainer />
      {data.length > 0 ? (
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
