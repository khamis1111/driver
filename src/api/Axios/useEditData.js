import baseUrl from "../../api/BaseUrl";

export const EditDataImage = async (url, data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await baseUrl.put(url, data, config);
};

export const EditData = async (url, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await baseUrl.put(url, data, config);
};
