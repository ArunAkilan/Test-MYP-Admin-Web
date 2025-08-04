import axios from "axios";

const BASE_URL = "http://13.203.171.5:3001/api/profile";

export const getAllProfiles = async () => {
  return await axios.get(`http://13.203.171.5:3001/api/profiles`);
};

export const createProfile = async (profileData: any) => {
  return await axios.post(`${BASE_URL}/create`, profileData);
};

export const getProfileById = async (id: any, token: any) => {
  return await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (id: any, profileData: any, token: any) => {
  console.log("tokentokentokentoken",token)
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
