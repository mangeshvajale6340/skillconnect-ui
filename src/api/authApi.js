import axios from "axios";

const API_URL = "http://localhost:5000/api/Auth";

export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/login`,
    {
      email: email,
      password: password
    }
  );

  return response.data;
};