import baseUrl from "../../api/BaseUrl";

export const PostDataImage = async (url, data) => {
  const config = {
    headers: {
      "Content-Type": "text/plain",
      Authorization: `Bearer public_12a1z6CG6pyg3ZLERYjwbjtekqVo`
    },
  };
  const res = await baseUrl.post(url, data);
  return res
};

export const PostData = async (url, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await baseUrl.post(url, data, config);
};
