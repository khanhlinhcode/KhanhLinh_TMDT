import axios from "axios";

export const getAllProduct = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all`
    );
    return res.data;
  } catch (error) {
    console.error("Logout user error:", error.response?.data);
    throw error;
  }
};

export const createProduct = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/create`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("Logout user error:", error.response?.data);
    throw error;
  }
};
console.log("API URL:", `${process.env.REACT_APP_API_URL}/product/create`);

export const getDetailsProducts = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-details/${id}`,
      id
    );
    return res.data;
  } catch (error) {
    console.error("Logout user error:", error.response?.data);
    throw error;
  }
};
export const UpdateProduct = async (id, access_token, data) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/product/update/${id}`,
      data,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Logout user error:", error.response?.data);
    throw error;
  }
};
