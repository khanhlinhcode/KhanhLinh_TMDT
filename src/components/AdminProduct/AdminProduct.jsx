import { WrapperHeader } from "./style";
import { getBase64 } from "../../utils";
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Loading from "../LoadingComponent/Loading";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "../../pages/Profile/style";
import * as ProductService from "../../services/ProductService";
import { useMutationnHook } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    description: "",
    rating: "",
  });

  const [form] = Form.useForm();

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

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    console.log("res", res);
    return res;
  };
  const { data, isPending: isLoading = false, isSuccess, isError } = mutation;
  const { isLoading: isLoadingProduct, data: products } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProducts,
  });
  console.log("products", products);
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
        />
      </div>
    );
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    Array.isArray(products?.data) && products.data.length > 0
      ? products.data.map((product) => ({
          ...product,
          key: product._id,
        }))
      : [];
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
    form.resetFields();
  };

  const onFinish = () => {
    mutation.mutate(stateProduct); // Gửi object, không phải name
  };
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
    console.log("e.target.name", e.target.name, e.target.value);
  };
  const handleOnchageAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({ ...stateProduct, image: file.preview });
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
        />
      </div>
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        className="modal-product"
        footer={null}
      >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={""}
                onChange={handleOnchange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="Type"
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
              name="count inStock"
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
              name="Price"
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
              name="Rating"
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
      </Modal>
    </div>
  );
};

export default AdminProduct;
