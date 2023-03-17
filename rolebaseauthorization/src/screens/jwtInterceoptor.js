import axios from "axios";
 
const jwtInterceoptor = axios.create({});
 
jwtInterceoptor.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem("currentUser"));
  config.headers.common["Authorization"] = `bearer ${tokensData.token}`;
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
        access_token: authData.access_token,
        refresh_token: authData.refreshToken,
      };
 
      let apiResponse = await axios.post(
        "http://localhost:5135/User/RefreshToken",
        payload
      );
      localStorage.setItem("currentUser", JSON.stringify(apiResponse.data));
      error.config.headers[
        "Authorization"
      ] = `bearer ${apiResponse.data.access_token}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);
export default jwtInterceoptor;