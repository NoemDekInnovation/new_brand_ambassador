import axios from "axios";
// import { getSession } from "next-auth/react";

const baseURL = "https://campaign.zainnovations.com/v1";

const instance = axios.create({
  baseURL,
  // timeout: 4500,
});

export default instance;

export const authAxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need for authentication
  },
  // timeout: 4500,
});

// export const registerUser = async (data) => {
//   try {
//     const response = await authAxiosInstance.post("/register", data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const registerUser = async (data, token) => {
  try {
    const response = await authAxiosInstance.post("/register", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAgency = async (data, token) => {
  try {
    const response = await authAxiosInstance.post("/agency-register", data,  {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



