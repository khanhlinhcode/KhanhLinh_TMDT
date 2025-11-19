import { WrapperHeader } from "./style";
import { getBase64 } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { Button, Modal, Form, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Loading from "../LoadingComponent/Loading";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "../../pages/Profile/style";
import * as ProductService from "../../services/ProductService";
import { useMutationnHook } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalopenDelete, setIsModalopenDelete] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  //{======================== useState Products====================}
  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    description: "",
    rating: "",
  });

  //{======================== useState ProductsDetails====================}

  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    description: "",
    rating: "",
  });

  const [formCreate] = Form.useForm();
  const [formUpdate] = Form.useForm();

  //{======================== useMutation====================}
  const mutation = useMutationnHook((data) => {
    const { name, price, description, rating, image, type, countInStock } =
      data;
    return ProductService.createProduct({
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock,
    });
  });
  console.log("rowSelected", rowSelected);
  const mutationUpdate = useMutationnHook((data) => {
    const { id, token, body } = data;
    return ProductService.UpdateProduct(id, token, body);
  });

  const mutationDeleted = useMutationnHook((data) => {
    const { id, token } = data;
    return ProductService.deleteProduct(id, token);
  });

  //{======================== getOnProducts====================}
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    console.log("res", res);
    return res;
  };

  //{======================== fetchGetProductsDetails====================}
  const fetchGetDetailsProducts = async (rowSelected) => {
    console.log("Fetching details for:", rowSelected);
    const res = await ProductService.getDetailsProducts(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        image: res?.data?.image,
        type: res?.data?.type,
        price: res?.data?.price,
        countInStock: res?.data?.countInStock,
        description: res?.data?.description,
        rating: res?.data?.rating,
      });
      console.log("StateProducts", res.data);
    }
    setIsLoadingUpdate(false);
    return res;
  };
  useEffect(() => {
    formUpdate.setFieldsValue(stateProductDetails);
  }, [formUpdate, stateProductDetails]);

  //{======================== handleDetailProduct====================}
  const handleDetailProduct = async (id) => {
    if (!id) return;
    console.log("Row Selected:", id);
    setRowSelected(id);
    setIsLoadingUpdate(true);
    await fetchGetDetailsProducts(id);
    setIsOpenDrawer(true);
  };

  const { data, isPending: isLoading = false, isSuccess, isError } = mutation;

  const {
    data: dataUpdated,
    isPending: isLoadingUpdated = false,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const {
    data: dataDeleted,
    isPending: isLoadingDeleted = false,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleted;

  console.log("dataUpdataUpdateddated", dataUpdated);

  const queryProduct = useQuery({
    queryKey: ["product"],
    queryFn: getAllProducts,
  });
  const { isLoading: isLoadingProduct, data: products } = queryProduct;
  console.log("products", products);

  const renderAction = (record) => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => {
            setRowSelected(record._id);
            setIsModalopenDelete(true);
          }}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={() => {
            setRowSelected(record._id);
            handleDetailProduct(record._id);
          }}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>

          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),

    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: "#ffc069",
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">=50",
          value: ">=",
        },
        {
          text: "<=50",
          value: "<=",
        },
      ],

      onFilter: (value, record) => {
        console.log("value", { value, record });
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },

    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">=3",
          value: ">=",
        },
        {
          text: "<=3",
          value: "<=",
        },
      ],

      onFilter: (value, record) => {
        console.log("checkrating", [value, record]);
        if (value === ">=") {
          return Number(record.rating) >= 3;
        }
        return Number(record.rating) <= 3;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => renderAction(record),
    },
  ];

  const dataTable =
    Array.isArray(products?.data) && products.data.length > 0
      ? products.data.map((product) => ({
          ...product,
          key: product._id,
        }))
      : [];
  // useEffect for create mutation
  useEffect(() => {
    if (isSuccess && data?.status === "SUCCESS") {
      message.success();
      handleCancel();
      setStateProduct({
        name: "",
        image: "",
        type: "",
        price: "",
        countInStock: "",
        description: "",
        rating: "",
      });
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  // useEffect for delete mutation
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "SUCCESS") {
      message.success("Xoá sản phẩm thành công");
      handleCancelDelete();
      queryProduct.refetch();
    } else if (isErrorDeleted) {
      message.error("Xoá thất bại");
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      description: "",
      rating: "",
    });
    formUpdate.resetFields();
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "SUCCESS") {
      message.success();
      handleCloseDrawer();
      setStateProduct({
        name: "",
        image: "",
        type: "",
        price: "",
        countInStock: "",
        description: "",
        rating: "",
      });
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated, isErrorUpdated]);
  const handleCancelDelete = () => {
    setIsModalopenDelete(false);
  };
  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      description: "",
      rating: "",
    });
    formCreate.resetFields();
  };

  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch();
      },
    }); // Gửi object, không phải name
  };

  //{======================== hadleOnchangeOnProducts====================}
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
    console.log("e.target.name", e.target.name, e.target.value);
  };

  //{======================== HadleOnchangeOnProductsDetails====================}
  const handleOnchangeDetails = (e) => {
    console.log("check", e.target.name, e.target.value);
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
    console.log("e.target.name", e.target.name, e.target.value);
  };

  //{======================== handleOnchageAvatarProducts====================}
  const handleOnchageAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({ ...stateProduct, image: file.preview });
  };

  //{======================== handleOnchageAvatarDetails====================}
  const handleOnchageAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({ ...stateProductDetails, image: file.preview });
  };
  console.log("user", user);

  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        body: { ...stateProductDetails },
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  return (
    <div>
      <WrapperHeader>Quản lí Sản Phẩm </WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingProduct}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setRowSelected(record._id);
              },
            };
          }}
          dayd
        />
      </div>

      {/*========= taọ san pham===== */}
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        className="modal-product"
        footer={null}
      >
        {/*===== loading dât đổ ra trang admin ====== */}

        <Loading isLoading={isLoadingUpdate}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={formCreate}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateProduct.name}
                onChange={handleOnchange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input your Type!" }]}
            >
              <InputComponent
                value={stateProduct.type}
                onChange={handleOnchange}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="count inStock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your count InStock!" },
              ]}
            >
              <InputComponent
                value={stateProduct.countInStock}
                onChange={handleOnchange}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please input your count Price!" },
              ]}
            >
              <InputComponent
                value={stateProduct.price}
                onChange={handleOnchange}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                { required: true, message: "Please input your count Rating!" },
              ]}
            >
              <InputComponent
                value={stateProduct.rating}
                onChange={handleOnchange}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your count Description !",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.description}
                onChange={handleOnchange}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input your count image!",
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchageAvatar} maxCount={1}>
                <Button>Selection File</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>

      {/* ======================chi t  iet san pham ================ */}

      <DrawerComponent
        title="Chi Tiết Sản Phẩm"
        placement="right"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={formUpdate}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input your Type!" }]}
            >
              <InputComponent onChange={handleOnchangeDetails} name="type" />
            </Form.Item>

            <Form.Item
              label="Count in Stock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your count InStock!" },
              ]}
            >
              <InputComponent
                onChange={handleOnchangeDetails}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please input your count Price!" },
              ]}
            >
              <InputComponent onChange={handleOnchangeDetails} name="price" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                { required: true, message: "Please input your count Rating!" },
              ]}
            >
              <InputComponent onChange={handleOnchangeDetails} name="rating" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your count Description !",
                },
              ]}
            >
              <InputComponent
                onChange={handleOnchangeDetails}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input your count image!",
                },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnchageAvatarDetails}
                maxCount={1}
              >
                <Button>Selection File</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      {/*----------------------Xoá sản phẩm ------------------*/}
      <ModalComponent
        title="Xoá sản phẩm"
        open={isModalopenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
        className="modal-product"
      >
        {/*===== loading dât đổ ra trang admin ====== */}

        <Loading isLoading={isLoadingDeleted}>
          <div> Bạn có chắc chắn muốn xoá không ?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
