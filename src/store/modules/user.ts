import { getLoginUser } from "@/services/user"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const fetchUserDataAction = createAsyncThunk('fetchData',(payload, { dispatch })=>{
  getLoginUser().then(res=>{
    dispatch(changeUserAction(res))
  })
})

interface loginUserType {
	id: number;
	userName: string;
	userAccount: string;
	userAvatar?: any;
	gender?: any;
	userRole: string;
	userPassword: string;
	createTime: string;
	updateTime: string;
	isDelete: number;
}

interface IUserState {
  loginUser:loginUserType | null
}

const initialState:IUserState={
  loginUser:null
}

const userSlice = createSlice({
  name: 'user',
  initialState:initialState,
  reducers: {
    changeUserAction(state,{payload}) {
      state.loginUser=payload
    }
  }
})

export const {changeUserAction}=userSlice.actions
export default userSlice.reducer
