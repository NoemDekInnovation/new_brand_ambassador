import axios from "axios";
// import { getSession } from "next-auth/react";
import useAuth from "../hooks/useAuth";

const baseURL = "https://campaign.zainnovations.com/v1";

const instance = axios.create({
  baseURL,
  // timeout: 4500,
});

export default instance;


export const authAxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
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


export const campaignAuthAxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${""}`
  },
});


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
    const response = await authAxiosInstance.post("/agency-register", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const multerAxiosInstance = axios.create({
  baseURL,
});

multerAxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await useAuth();

    console.log("my token", accessToken);

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // Set the Content-Type header to application/json
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
