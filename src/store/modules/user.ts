import { getLoginUser } from "@/services/user"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const fetchUserDataAction = createAsyncThunk('fetchData',(payload, { dispatch })=>{
  getLoginUser().then(res=>{
    dispatch(changeUserAction(res))
  })
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loginUser:{}
  },
  
  reducers: {
    changeUserAction(state,{payload}) {
      state.loginUser=payload
    }
  }
})

export const {changeUserAction}=userSlice.actions
export default userSlice.reducer
