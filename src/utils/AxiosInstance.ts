import axios from 'axios'
 

// const baseUrl = import.meta.env.VITE_API_URL
const baseUrl ='http://localhost:4500'

// process.env.REACT_APP_BASE_URL as string;



const AxiosInstance=axios.create({
    baseURL:baseUrl,
    timeout:10000,
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
})

AxiosInstance.interceptors.request.use(
    (config)=>{
        // const accessToken=localStorage.getItem('user-store')
        
        // if(accessToken){
        //     let token=JSON.parse(accessToken)
        //     config.headers.Authorization=`Bearer ${token.tokens.accessToken}`
        // }

           const raw = localStorage.getItem("user-store");

    if (raw) {
      const parsed = JSON.parse(raw);

      // Zustand persisted structure: parsed.state.user.tokens.accessToken
      const accessToken = parsed?.state?.user?.tokens?.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

AxiosInstance.interceptors.response.use(
    (response)=>{return response},

    (error)=>{
        if(error.response){
            if(error.response.status===401){

            }
            else if  (error.response.status===500){

            }
        }
        else if(error.code=='ECONNABORTED'){
            console.log('Request timout. please try again');
            
        }
        return Promise.reject(error)
    }
)

export default AxiosInstance