import axios from "axios";
// import { getSession } from "next-auth/react";
import useAuth from "../hooks/useAuth";
import useSWR from "swr";
import { getAuthToken, removeToken } from "../helpers/token";
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
    Authorization: `Bearer ${""}`,
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
  headers: {
    // "Content-Type": "multipart/form-data",
    "Content-Type": "application/json",
    Authorization: `Bearer ${""}`,
  },
});

export const patchAxiosInstance = axios.create({
  baseURL,
  headers: {
    // "Content-Type": "'multipart/form-data'",
    "Content-Type": "application/json",
  },
});

export const mediaAxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "'multipart/form-data'",
    Authorization: `Bearer ${""}`,
  },
});

// export const multerAxiosInstance = axios.create({
//   baseURL,
// });

// multerAxiosInstance.interceptors.request.use(
//   async (config) => {
//     const accessToken = await useAuth();

//     console.log("my token", accessToken);

//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }

//     // Set the Content-Type header to application/json
//     config.headers["Content-Type"] = "multipart/form-data";
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const loginUser = async (data) => {

export const editadmin = async (data) => {
  try {
    const response = await multerAxiosInstance.patch("/edit-admin", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CampaignApi = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

CampaignApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token?.authKey}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

CampaignApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (error.response) {
      if ([403, 401].includes(error.response.status)) {
        window.location.replace("/");
        removeToken("userData");
      }
    }
    return Promise.reject(error);
  }
);

export const fetcher = async (url) => {
  try {
    const response = await CampaignApi.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
