import axios from "axios";



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