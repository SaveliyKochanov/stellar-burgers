import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import { RequestStatus, TUser } from '../../../utils/types';
type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  error?: SerializedError;
  requestStatus: RequestStatus;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

export const fetchUser = createAsyncThunk(
  'users/check',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      if (!response.success) {
        return rejectWithValue(response);
      }
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'users/register',
  async (data, { rejectWithValue }) => {
    const response = await registerUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }

    const { user, refreshToken, accessToken } = response;

    localStorage.setItem('refreshToken', String(refreshToken));
    setCookie('accessToken', String(accessToken));

    return user;
  }
);

export const authUser = createAsyncThunk<TUser, TLoginData>(
  'users/login',
  async (data, { rejectWithValue }) => {
    const response = await loginUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    const { user, refreshToken, accessToken } = response;

    localStorage.setItem('refreshToken', refreshToken);
    setCookie('accessToken', accessToken);

    return user;
  }
);

export const logoutUser = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();
    if (!response.success) {
      return rejectWithValue(response);
    }
    localStorage.clear();
    deleteCookie('accessToken');
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'users/update',
  async (data, { rejectWithValue }) => {
    const responce = await updateUserApi(data);
    if (!responce.success) {
      return rejectWithValue(responce);
    }

    return responce.user;
  }
);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  selectors: {
    getUserData: (state) => state.data,
    getUserLoading: (state) => state.requestStatus,
    isAuthChecked: (state) => state.isAuthChecked,
    isAuthenticated: (state) => state.isAuthenticated,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthChecked = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
        state.requestStatus = RequestStatus.Failed;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      });

    builder
      .addCase(authUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        // state.isAuthChecked = false;
        // state.isAuthenticated = false;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const {
  getUserData,
  getUserLoading,
  isAuthChecked,
  isAuthenticated,
  getError
} = slice.selectors;
export default slice.reducer;
