import { Table } from "antd";
import Loading from "../../components/LoadingComponent/Loading";
import { useState } from "react";
const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data = [],
    isLoading = false,
    columns = [],
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };

  console.log("data", data);
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };
  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            background: "#1d1ddd",
            color: "white",
            padding: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={handleDeleteAll}
        >
          Xoá tất cả
        </div>
      )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
