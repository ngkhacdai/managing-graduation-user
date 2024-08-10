import { GET } from "./customFetch";

export const getAllBranch = () => {
  return GET("/admin/getBranch");
};
