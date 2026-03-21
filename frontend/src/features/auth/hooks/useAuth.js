import { useDispatch } from "react-redux";
import {
  registerApi,
  loginApi,
  logoutApi,
  getMeApi,
  resendVerificationEmailApi,
  updateProfileApi,
} from "../services/auth.api";
import { setUser, setLoading, setError, setAuthChecked } from "../auth.slice";

const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      await registerApi(data);
      return { success: true };
    } catch (error) {
      const message = error?.response?.data?.message || "Registration failed";
      dispatch(setError(message));
      return { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  };



  const handleLogin = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await loginApi(data);
      dispatch(setUser(response.data));
      return { success: true };
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      dispatch(setError(message));
      return { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  };



  const handleGetme = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getMeApi();
      dispatch(setUser(response.data));
    } catch (error) {
      dispatch(setUser(null));
    } finally {
      dispatch(setAuthChecked(true));
      dispatch(setLoading(false));
    }
  };




  const handleResendEmail = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await resendVerificationEmailApi(data);
      return { success: true, data: response };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to send verification email";
      dispatch(setError(message));
      return { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const response = await logoutApi();
      dispatch(setUser(null));
      return { success: true, data: response };
    } catch (error) {
      dispatch(setError("Logout failed"));
      return { success: false, message: "Logout failed" };
    } finally {
      dispatch(setLoading(false));
    }
  };



  // ✅ NEW — avatar upload, updates Redux user after success
  const handleUpdateProfile = async (file) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await updateProfileApi(formData);

      // Backend returns updated user in response.data
      dispatch(setUser(response.data));

      return { success: true };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Profile update failed";
      dispatch(setError(message));
      return { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleGetme,
    handleResendEmail,
    handleLogout,
    handleUpdateProfile,
  };
};

export default useAuth;