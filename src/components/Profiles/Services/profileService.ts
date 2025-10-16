import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BackEndUrlProfile}/api/profile`;

export const getAllProfiles = async () => {
  const token = localStorage.getItem("token");

  return await axios.get(`${import.meta.env.VITE_BackEndUrlProfile}/api/profiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const getAllProfiles = async () => {
//   return await axios.get(`${BASE_URL}/api/profiles`);
// };

export const createProfile = async (profileData: any) => {
  return await axios.post(`${BASE_URL}/create`, profileData);
};

export const signupProfile = async (profileData: any) => {
  return await axios.post(`${BASE_URL}/signup`, profileData);
};

export const getProfileById = async (id: any, token: any) => {
  return await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (id: any, profileData: any, token: any) => {
  let resData =  await axios.put(`${BASE_URL}/${id}`,profileData, {
   headers: {
      "Authorization": `Bearer ${token}`, // Add token here
    },
  });
  return resData;
};


export const deleteProfile = async (id: any, token: any) => {
  return await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
