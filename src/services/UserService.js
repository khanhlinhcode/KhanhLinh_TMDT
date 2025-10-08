import axios from "axios";

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
