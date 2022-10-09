import { createSlice } from "@reduxjs/toolkit";

const accessTokenKeyName = "accessToken-CSM";

const getLocalStorageToken = (keyName) => {
  return window.localStorage.getItem(keyName);
};

const setLocalStorageToken = (keyName, value) => {
  if(value===null){
    window.localStorage.removeItem(keyName)
  }
  else{
    window.localStorage.setItem(keyName, value);
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id_user: null,
    token: getLocalStorageToken(accessTokenKeyName),
  },
  reducers: {
    setIdUser: (state, actions) => {
      return {
        ...state,
        id_user: actions.payload,
      };
    },
    setToken: (state, actions) => {
      setLocalStorageToken(accessTokenKeyName, actions.payload);
      return {
        ...state,
        token: actions.payload,
      };
    },
  },
});

export const { setIdUser, setToken } = userSlice.actions;

export default userSlice.reducer;
