import baseUrl from "../../api/BaseUrl";

export const DeleteData = async (url, payload) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: payload,
  };

  const res = await baseUrl.delete(url, config);
  return res;
};