 
import AxiosInstance from "./AxiosInstance";


// const baseUrl = process.env.REACT_APP_BASE_URL as string;
const baseUrl ='http://localhost:4500'

// const baseUrl ='https://book-hotel-delta-two.vercel.app'
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
export const fetchDashBoardData=async()=>{
 try {
    let res = await AxiosInstance.get(`${baseUrl}/api/dashboard`);

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

}

export const downloadExcelIncome=async()=>{
 try {
    let res = await AxiosInstance.get(`${baseUrl}/api/download-income-excel`,{
        responseType: "arraybuffer",
    });

    return res;
  } catch (error: any) {
    console.log("erroe", error);
    return {
      status: error.response?.status,
      statusCode: error.response?.data?.status,
      message: error.response?.data.message,
      data: null,
    };
  }

}
export const downloadExcelExpense=async()=>{
 try {
    let res = await AxiosInstance.get(`${baseUrl}/api/download-expense-excel`,{
        responseType: "arraybuffer",
    });

    return res;
  } catch (error: any) {
    console.log("erroe", error);
    return {
      status: error.response?.status,
      statusCode: error.response?.data?.status,
      message: error.response?.data.message,
      data: null,
    };
  }

}
export const fetchallIncome = async (page = 1, limit = 10, search = "") => {
  try {
    const res = await AxiosInstance.get(
      `${baseUrl}/api/income?page=${page}&limit=${limit}&search=${search}`
    );

    return {
      status: res?.status,
      statusCode: res?.data?.statusCode,
      message: res?.data.message,
      data: res?.data?.data?.data, 
      pagination: res?.data?.data?.pagination,  
    };
  } catch (error: any) {
    console.log("error", error);
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: [],
      pagination: null,
    };
  }
};

export const fetchallExpense= async (page = 1, limit = 10, search = "") => {
  try {
    const res = await AxiosInstance.get(
      `${baseUrl}/api/expense?page=${page}&limit=${limit}&search=${search}`
    );

    return {
      status: res?.status,
      statusCode: res?.data?.statusCode,
      message: res?.data.message,
      data: res?.data?.data?.data,  
      pagination: res?.data?.data?.pagination,  
    };
  } catch (error: any) {
    console.log("error", error);
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: [],
      pagination: null,
    };
  }
};

export const addIncomeApi = async (payload: {   
  icon: String,
    source: String,
    amount: String,
    date: String  }) => {
  try {
    let res = await AxiosInstance.post(`${baseUrl}/api/income`, payload);

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

export const addExpenseApi = async (payload: {   
  icon: String,
    category: String,
    amount: String,
    date: String  }) => {
  try {
    let res = await AxiosInstance.post(`${baseUrl}/api/expense`, payload);

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
export const deleteIncomeApi = async (id:string  ) => {
  try {
    let res = await AxiosInstance.delete(`${baseUrl}/api/income/${id}`);

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
export const deleteExpenseApi = async (id:string  ) => {
  try {
    let res = await AxiosInstance.delete(`${baseUrl}/api/expense/${id}`);

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

export const updateProfile = async (payload: any,id:string) => {
  try {
    let res = await AxiosInstance.patch(`${baseUrl}/api/update-profile/${id}`, payload,
       {
      headers: {
        "Content-Type": "multipart/form-data", // Axios can auto-set this; optional
      },
    }
    );

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

export const updateExpenseApi = async (payload: {   
  icon: String,
    category: String,
    amount: String,
    date: String  },id:string) => {
  try {
    let res = await AxiosInstance.patch(`${baseUrl}/api/expense/${id}`, payload);

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
export const updateIncomeApi = async (payload: {   
  icon: String,
    source: String,
    amount: String,
    date: String  },id:string) => {
  try {
    let res = await AxiosInstance.patch(`${baseUrl}/api/income/${id}`, payload);

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