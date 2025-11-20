// ================== AdminUser.jsx ==================
import { useState } from "react";
import { Button, Form } from "antd";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";

import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import { useMutationnHook } from "../../hooks/useMutationHook";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { getBase64 } from "../../utils";

const AdminUser = () => {
  const user = useSelector((state) => state.user);

  // =============== STATE ===============
  const [rowSelected, setRowSelected] = useState("");
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  // --- CREATE USER STATE ---
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    isAdmin: false,
  });

  // --- UPDATE USER STATE ---
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    avatar: "",
    address: "",
  });

  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();

  // =============== GET USERS ===============
  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getAllUser(user?.access_token),
  });

  const users = queryUser?.data?.data || [];

  // =============== MUTATIONS ===============
  const mutationCreate = useMutationnHook((data) =>
    UserService.signupUser(data)
  );

  const mutationUpdate = useMutationnHook((data) =>
    UserService.updateUser(data.id, data.body, data.token)
  );

  const mutationDelete = useMutationnHook((data) =>
    UserService.deleteUser(data.id, data.token)
  );
  const mutationDeletedMany = useMutationnHook(({ ids, token }) => {
    return UserService.deleteManyUser({ ids }, token);
  });

  // =============== FETCH USER DETAIL ===============
  const fetchDetailUser = async (id) => {
    setIsLoadingUpdate(true);
    const res = await UserService.getDetailUser(id, user.access_token);
    if (res?.data) {
      setStateUserDetails(res.data);
      formUpdate.setFieldsValue(res.data);
    }
    setIsLoadingUpdate(false);
    return res;
  };

  // =============== CREATE USER ===============
  const handleCreate = (values) => {
    mutationCreate.mutate(values, {
      onSuccess: () => {
        message.success("Tạo user thành công");
        handleCancelCreate();
        queryUser.refetch();
      },
      onError: () => message.error("Tạo user thất bại"),
    });
  };
  const handleOnchageAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails((prev) => ({ ...prev, avatar: file.preview }));
    formUpdate.setFieldValue("avatar", file.preview);
  };

  const handleCancelCreate = () => {
    setIsModalCreate(false);
    setStateUser({
      name: "",
      email: "",
      phone: "",
      password: "",
      isAdmin: false,
    });
    form.resetFields();
  };

  // =============== UPDATE USER ===============
  const handleUpdate = () => {
    const values = formUpdate.getFieldsValue(); // lấy giá trị từ form

    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        body: {
          ...values,
          avatar: values.avatar,
        },
      },
      {
        onSuccess: () => {
          message.success("Cập nhật user thành công");
          handleCloseDrawer();
          queryUser.refetch();
        },
        onError: () => message.error("Cập nhật thất bại"),
      }
    );
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    formUpdate.resetFields();
  };

  // =============== DELETE USER ===============
  const handleDelete = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSuccess: () => {
          message.success("Xoá user thành công");
          setIsModalDelete(false);
          queryUser.refetch();
        },
        onError: () => message.error("Xoá thất bại"),
      }
    );
  };
  const handleDeleteManyUser = (ids) => {
    mutationDeletedMany.mutate(
      { ids, token: user?.access_token },
      {
        onSuccess: () => message.success("Xoá nhiều user thành công"),
        onError: () => message.error("Xoá nhiều user thất bại"),
      }
    );
  };
  console.log(mutationDeletedMany.isLoading);
  console.log(mutationDeletedMany.isSuccess);
  console.log(mutationDeletedMany.data);

  // =============== TABLE ===============
  const renderAction = (record) => (
    <div>
      <DeleteOutlined
        style={{ color: "red", fontSize: 22, cursor: "pointer" }}
        onClick={() => {
          setRowSelected(record._id);
          setIsModalDelete(true);
        }}
      />
      <EditOutlined
        style={{
          color: "orange",
          fontSize: 22,
          cursor: "pointer",
          marginLeft: 12,
        }}
        onClick={() => {
          setRowSelected(record._id);
          fetchDetailUser(record._id);
          setIsOpenDrawer(true);
        }}
      />
    </div>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      render: (t) => (t ? "TRUE" : "FALSE"),
    },
    { title: "Action", render: (_, record) => renderAction(record) },
  ];

  const dataTable = users.map((u) => ({ ...u, key: u._id }));

  // =============== JSX RENDER ===============
  return (
    <div>
      <WrapperHeader>Quản lý Người Dùng</WrapperHeader>

      {/* BUTTON CREATE */}
      <div style={{ marginTop: 10 }}>
        <Button
          style={{
            height: 120,
            width: 120,
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalCreate(true)}
        >
          <PlusOutlined style={{ fontSize: 50 }} />
        </Button>
      </div>

      {/* TABLE */}
      <div style={{ marginTop: 20 }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyUser}
          columns={columns}
          data={dataTable}
          isLoading={queryUser.isLoading}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id),
          })}
        />
      </div>

      {/* CREATE MODAL */}
      <ModalComponent
        title="Tạo người dùng"
        open={isModalCreate}
        onCancel={handleCancelCreate}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item label="Name" name="name" required>
            <InputComponent
              name="name"
              value={stateUser.name}
              onChange={(e) =>
                setStateUser({ ...stateUser, name: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Email" name="email" required>
            <InputComponent
              name="email"
              value={stateUser.email}
              onChange={(e) =>
                setStateUser({ ...stateUser, email: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Phone" name="phone" required>
            <InputComponent
              name="phone"
              value={stateUser.phone}
              onChange={(e) =>
                setStateUser({ ...stateUser, phone: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Password" name="password" required>
            <InputComponent
              name="password"
              value={stateUser.password}
              onChange={(e) =>
                setStateUser({ ...stateUser, password: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="isAdmin" name="isAdmin">
            <InputComponent
              name="isAdmin"
              value={stateUser.isAdmin}
              onChange={(e) =>
                setStateUser({ ...stateUser, isAdmin: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="address" name="address">
            <InputComponent
              name="address"
              value={stateUser.address}
              onChange={(e) =>
                setStateUser({ ...stateUser, address: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="avatar" name="avatar">
            <InputComponent
              name="avatar"
              value={stateUser.avatar}
              onChange={(e) =>
                setStateUser({ ...stateUser, avatar: e.target.value })
              }
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </ModalComponent>

      {/* UPDATE DRAWER */}
      <DrawerComponent
        title="Cập nhật người dùng"
        placement="right"
        isOpen={isOpenDrawer}
        onClose={handleCloseDrawer}
        width="80%"
      >
        <Loading isLoading={isLoadingUpdate || mutationUpdate.isPending}>
          <Form form={formUpdate} layout="vertical" onFinish={handleUpdate}>
            <Form.Item label="Name" name="name">
              <InputComponent />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <InputComponent />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <InputComponent />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <InputComponent />
            </Form.Item>

            <Form.Item label="isAdmin" name="isAdmin">
              <InputComponent />
            </Form.Item>

            <Form.Item label="Avatar" name="avatar">
              <WrapperUploadFile onChange={handleOnchageAvatar} maxCount={1}>
                <Button>Select File</Button>

                {stateUserDetails?.avatar && (
                  <img
                    src={stateUserDetails.avatar}
                    alt="avatar"
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form>
        </Loading>
      </DrawerComponent>

      {/* DELETE MODAL */}
      <ModalComponent
        title="Xoá người dùng"
        open={isModalDelete}
        onCancel={() => setIsModalDelete(false)}
        onOk={handleDelete}
      >
        Bạn có chắc muốn xoá người dùng này không?
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
