import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  id: "",
  access_token: "",
  isAdmin: false,
};
export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log("action:", action);
      // ✅ Bảo vệ khi payload không tồn tại
      if (!action.payload) {
        console.warn("⚠️ updateUser được gọi mà không có payload");
        return;
      }

      const {
        name = "",
        email = "",
        phone = "",
        address = "",
        avatar = "",
        _id = "",
        access_token = "",
        isAdmin,
      } = action.payload;

      // ✅ Cập nhật state
      state.name = name;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },

    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.address = "";
      state.phone = "";
      state.avatar = "";
      state.id = "";
      state.access_token = "";
      state.isAdmin = false;
    },
  },
});
export const { updateUser, resetUser } = userSlide.actions;
export default userSlide.reducer;
