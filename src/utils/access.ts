import { getLoginUser } from "@/services/user";

export const verifyPermisoon = (initialState: InitialState) => {
  const canUser = !!initialState.loginUser;
  const canAdmin =
    initialState.loginUser && initialState.loginUser.userRole === "admin";
  return {
    canUser,
    canAdmin,
  };
};

export async function getInitialState(): Promise<InitialState> {
  const defaultState: InitialState = {
    loginUser: undefined,
  };
  // 获取当前登录用户
  try {
    const res = await getLoginUser();
    defaultState.loginUser = res.data;
  } catch (e) {}
  return defaultState;
}
