const customFetch = axios.create({
  baseURL: "http://localhost:5135/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
  
  
  customFetch.interceptors.request.use(
    async (config) => {
      const token = getTokenFromLocalStorage();
      if (token) {
        config.headers["Authorization"] = ` bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  const refreshToken = async () => {
    try {
      const resp = await customFetch.get("http://localhost:5135/User/RefreshToken");
      console.log("refreshToken", resp.data);
      return resp.data;
    } catch (e) {
      console.log("Error",e);   
    }
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const resp = await refreshToken();
  
        const token = resp.response.Token;
  
        addTokenToLocalStorage(token);
        customFetch.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        return customFetch(originalRequest);
      }
      return Promise.reject(error);
    }
  );