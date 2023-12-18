import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/components/profile/appointment.css";
import { Avatar, Image, Table } from 'antd';
import { convertStringToNumber, getDate } from "../../utils/Utils";

export default function Orders() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/orders/user/" + user._id
      );
      setData(res?.data?.value);
    };
    fetchAppointment();
  }, [user._id]);

  const columns = useMemo(
    () => [
      {
        key: "_id",
        title: "Mã đơn hàng",
        width: 100,
        render: (value) => <p>{value?._id}</p>,
      },
      {
        key: "createdAt",
        title: "Ngày đặt",
        width: 120,
        render: (value) => <p>{getDate(value)}</p>,
      },
      {
        key: "PaymentMethod",
        title: "Phương thức thanh toán",
        width: 150,
        render: (value) => <p>{parseInt(value?.PaymentMethod) === 0 ? 'Chuyển khoản' : 'Tiền mặt'}</p>,
      },
      {
        key: "StatusPayment",
        title: "Trạng thái",
        width: 120,
        render: (value) => <p>{parseInt(value?.StatusPayment) === 0 ? 'Chưa thanh toán' : 'Hoàn thành'}</p>,
      },
      {
        key: "TotalPrice",
        title: "Tổng giá trị",
        width: 100,
        render: (value) => <p>{convertStringToNumber(value?.TotalPrice)}</p>,
      },
    ],
    []
  );

  const expandedRowRender = (record) => {
    // Hiển thị thông tin sản phẩm trong đơn hàng
    const productColumns = [
      { title: 'Tên sản phẩm', width: 300, dataIndex: 'ProductName', key: 'ProductName' },
      { title: 'Hình ảnh', dataIndex: 'Image', key: 'Image', render: (value,record) => {
        return <Image style={{width: 100}} src={value} alt='demmo' /> },
      },
      { title: 'Số lượng', align: 'right', dataIndex: 'Quantity', key: 'Quantity', render: (_, record) => (record.Quantity), },
      { title: 'Giá sản phẩm', align: 'right', dataIndex: 'Price', key: 'Price', render: (value) => convertStringToNumber(value) },
      {
        title: 'Tỏng giá trị',
        dataIndex: 'TotalValue',
        key: 'TotalValue',
        align: 'right',
        render: (_, record) => convertStringToNumber(record.Price * record.Quantity),
      },
    ];

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p><strong>Mã đơn hàng:</strong> {(record?._id)}</p>
          <p><strong>Ngày tạo:</strong> {getDate(record.createdAt)}</p>
        </div>
        {/* Bảng hiển thị chi tiết sản phẩm */}
        <Table columns={productColumns} dataSource={record.Products} pagination={false} />

        <h3 style={{ float: 'right', marginTop: 20 }}>
          <strong>Tổng giá trị: </strong>
          { convertStringToNumber(record.TotalPrice)}
        </h3>
      </div>
    );
  };

  return (
    <div className="appointment">
      {data ? (
        <div className="list-appointment">
          <span className="title-appointment"> Danh sách đơn hàng</span>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: expandedRowRender,
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            rowKey={'_id'}
            dataSource={data}
          />
        </div>
      ) : (
        <div className="list-appointment">
          <span className="title-appointment">Danh sách đơn hàng</span>
          <div className="no-appointment">Bạn không có đơn hàng</div>
        </div>
      )}
    </div>
  );
}
