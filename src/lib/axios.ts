/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Method, RawAxiosRequestHeaders } from "axios";
import config from "../config/index";

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});

const hitApi = async (
  url: string,
  method = "GET" as Method,
  body = null as any | null,
  headers = {} as RawAxiosRequestHeaders,
  responseType = "json" as any,
  timeout = 10000 as number
) => {
  try {
    const response = (await axiosInstance({
      url,
      method,
      data: body,
      headers,
      responseType,
      timeout,
      withCredentials: true, // This is important for sending cookies
    })) as any;

    // console.log(response);

    // if (response?.status === 401 && !location?.pathname?.includes("/signin"))
    //   location.href = "/signin";

    return response?.data || null;
  } catch (error: any) {
    // if (
    //   error?.response?.status == 401 &&
    //   !location?.pathname?.includes("/signin")
    // )
    //   location.href = "/signin";

    // console.error(error);

    return error?.response?.data || error;
  }
};

export default hitApi;

// const excluded_urls = [
//     '/auth/signup',
//     '/auth/login',
// ];

// const isExcludedUrl = (url: any) => {
//     return excluded_urls.some((excluded_url) => url.includes(excluded_url));
// }

// axiosInstance.interceptors.request.use((config: any) => {

//     const token = localStorage.getItem('access_token');

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     } else if (!token && config.url?.includes('/admin')) {
//         location.href = '/login';
//     }

//     return config;

// });

// axiosInstance.interceptors.response.use((response) => {
//     return response
// }, (error) => {
//     if (error.response.status === 401) {
//         location.href = '/admin/login';
//     }
//     return Promise.reject(error);
// });

// axiosInstance.interceptors.response.use(

//     function (response) {
//         // Any status code that lies within the range of 2xx triggers this function
//         // Do something with the response data
//         return response;
//     },

//     async function (error) {

//         console.error('got error');

//         // Remove the access token from localStorage if there's an error
//         // localStorage.removeItem('accessToken');

//         const refreshToken = localStorage.getItem('refreshToken');

//         // Check if refresh token is available
//         if (refreshToken) {
//             try {
//                 // Request a new access token using the refresh token
//                 const response = await axios.post('https://ams-api-dev.edxplor.com/api/auth/college/refresh', { refreshToken });

//                 // Extract the new access token from the response
//                 const newAccessToken = response.data.data[0].access_token;

//                 // Store the new access token in localStorage
//                 localStorage.setItem('accessToken', newAccessToken);

//                 // Update the cookie with the new access token
//                 document.cookie = `token=${newAccessToken}; path=/`;

//                 // Retry the original request with the new access token
//                 error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return axiosInstance(error.config);
//             } catch (refreshError) {
//                 // Handle token refresh errors (e.g., logout user, redirect to login)
//                 console.error('Token refresh failed:', refreshError);
//                 return Promise.reject(refreshError);
//             }
//         }
//         // Reject the original error if there's no refresh token or if refresh fails
//         return Promise.reject(error);
//     }
// );
