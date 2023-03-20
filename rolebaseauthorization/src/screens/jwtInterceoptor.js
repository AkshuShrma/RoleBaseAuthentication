import axios from "axios";
 
const jwtInterceoptor = axios.create({

});
 
jwtInterceoptor.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem("currentUser"));
  
  config.headers.Authorization = `bearer ${tokensData.token}`;
  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    if (error.response.status === 401) {
      const authData = JSON.parse(localStorage.getItem("currentUser"));
      const payload = {
        token: authData.token,
        refreshToken: authData.refreshToken,
      };
 
      let apiResponse = await axios.post(
        "http://localhost:5135/User/RefreshToken",
        payload
      );
      authData.token= apiResponse.data.token;
      authData.refreshToken = apiResponse.data.refreshToken;
      localStorage.setItem("currentUser", JSON.stringify(authData));
      error.config.headers[
        "Authorization"
      ] = `bearer ${apiResponse.data.token}`;
      return axios(error.config);
    }
    else {
      return Promise.reject(error);
    }
    
   
  }
);
export default jwtInterceoptor;