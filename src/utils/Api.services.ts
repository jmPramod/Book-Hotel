 
import AxiosInstance from "./AxiosInstance";


// const baseUrl = process.env.REACT_APP_BASE_URL as string;
const baseUrl ='http://localhost:4500'
export const loginApi = async (payload: {   
 
    email: String,
    password: String }) => {
  try {
    let res = await AxiosInstance.post(`${baseUrl}/api/login`, payload);

    return {
      status: res?.status,
      statusCode: res?.data?.status,
      message: res?.data.message,
      data: res?.data?.data,
      token: res?.data.token,
    };
  } catch (error: any) {
    console.log("erroe", error);
    return {
      status: error.response?.status,
      statusCode: error.response?.data?.status,
      message: error.response?.data.message,
      data: null,
    };
  }
};


export const registerApi = async (payload: {   
  firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String }) => {
  try {
    let res = await AxiosInstance.post(`${baseUrl}/api/register`, payload);

    return {
      status: res?.status,
      statusCode: res?.data?.statusCode,
      message: res?.data.message,
      data: res?.data?.data,
      token: res?.data?.data.token,
    };
  } catch (error: any) {
    console.log("erroe", error);
    return {
      status: error.response?.status,
      statusCode: error.response?.data?.status,
      message: error.response?.data.message,
      data: null,
    };
  }
};