import { GET } from "./customFetch";

export const getAllBranch = () => {
  try {
    return GET("/getAllBranch");
  } catch (error) {
    console.log(error);

    return null;
  }
};
