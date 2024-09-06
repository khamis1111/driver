import baseUrl from "../../api/BaseUrl";

export const GetData = async (url, params) => {
  return await baseUrl.get(url, params);
};

export const GetDataToken = async (url) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await baseUrl.get(url, config);
};
