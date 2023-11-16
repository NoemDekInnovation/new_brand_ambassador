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

export const registerUser = async (data) => {
  try {
    const response = await authAxiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAgency = async (data) => {
  try {
    const response = await authAxiosInstance.post("/agency-register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// export const loginUser = async (data) => {
//   try {
//     const response = await authAxiosInstance.post("/login", data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

export const loginUser = async (email, password) => {
  try {
    const response = await authAxiosInstance.post('/signin', {
      email,
      password,
    });

    // Assuming authAxiosInstance is configured correctly with the baseURL and headers

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    // Successful authentication
    const userData = await response.json();
    console.log('User data:', userData);
    return userData;
  } catch (error) {
    throw error;
  }
};