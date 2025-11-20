import axios from "axios";

export const axiosJWT = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const loginUser = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/sign-in`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);
    throw error;
  }
};

export const signupUser = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/sign-up`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("SignUp error:", error.response?.data);
    throw error;
  }
};
export const getDetailUser = async (id, access_token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("getDetailUser error:", error.response?.data);
    throw error;
  }
};
export const deleteUser = async (id, access_token) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("deleteUser error:", error.response?.data);
    throw error;
  }
};

export const getAllUser = async (access_token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/getAll`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("getAlluser error:", error.response?.data);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/refresh-token`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("refresh token error:", error.response?.data);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/log-out`
    );
    return res.data;
  } catch (error) {
    console.error("Logout user error:", error.response?.data);
    throw error;
  }
};

export const updateUser = async (id, data, access_token) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
      data,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Update user error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteManyUser = async ({ ids }, access_token) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/delete-many`,
      { ids },
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("DeleteMany user error:", error.response?.data);
    throw error;
  }
};
