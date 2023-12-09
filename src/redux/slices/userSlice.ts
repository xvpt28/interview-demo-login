import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, login } from "../../api/user";
import { User } from "../../types/user";

// Login
export const loginUser = createAsyncThunk(
  "login",
  async (data: User, thunkAPI) => {
    const resp = await login(data);

    if (!resp.data) {
      thunkAPI.dispatch(removeUser());
      return thunkAPI.rejectWithValue(resp.message);
    }

    const userData = {
      userInfo: resp.data.username,
      isLogin: true,
    };

    thunkAPI.dispatch(setUser(userData));
    return resp;
  }
);

// auth if user is logged in
export const authUserThunk = createAsyncThunk("auth", async (_, thunkAPI) => {
  const resp = await auth();

  if (!resp.data) {
    thunkAPI.dispatch(removeUser());
    return thunkAPI.rejectWithValue(resp.message);
  }

  const userData = {
    userInfo: resp.data.username,
    isLogin: true,
  };

  thunkAPI.dispatch(setUser(userData));
  return resp;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    isLogin: false,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.userInfo = payload;
      state.isLogin = true;
    },
    removeUser: (state) => {
      state.userInfo = null;
      state.isLogin = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
