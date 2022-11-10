

import axios from 'axios'



const api = axios.create(
  { baseURL: 'http://vm-srv-bimbom.corp.local/api/', withCredentials: true }
);

const auth_url = import.meta.env.VITE_AUTH_URL
let isRefreshing = null

// Request interceptor for API calls
api.interceptors.request.use(
  async config => {

    if (localStorage.getItem('token') == null) {
      localStorage.clear()

      await axios.get(`${auth_url}/token`, { withCredentials: true })
        .then(
          res => {
            console.log(res)
            localStorage.setItem('expires_in', Date.now() + 3595 * 1000)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('refresh', res.data.refresh)
          }
        )
        .catch(res => {

          window.location.replace(`${auth_url}/login`)
        })
    } else if (parseInt(localStorage.getItem('expires_in')) < Date.now()) {
      if (!isRefreshing) {
        isRefreshing = refreshAccessToken()
        console.log('refreshing')
        let result = await isRefreshing
        isRefreshing = null
      }

    }


    let token = localStorage.getItem('token')
    config.headers = {
      'Authorization': `Bearer ${token}`,
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

// api.interceptors.response.use(function (response) {
//   return response;
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status == 403 && !originalRequest._retry && originalRequest.url === "/method/frappe.integrations.oauth2.openid_profile") {
//     await refreshAccessToken();
//     return api(originalRequest);
//   }

//   if (error.response.status == 403 && originalRequest._retry && originalRequest.url === "/method/frappe.integrations.oauth2.openid_profile") {
//     window.location.replace(`${auth_url}/login`)
//   }
//   return Promise.reject(error);
// })


async function refreshAccessToken() {
  const refresh = localStorage.getItem('refresh')
  await axios.get(`${auth_url}/refresh`, {
    params: {
      'refresh': refresh
    }
  })
    .then(
      res => {
        localStorage.setItem('expires_in', Date.now() + 3595 * 1000)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('refresh', res.data.refresh)
        isRefreshing = false
        return res.data.token
      }
    )
    .catch(() => {
      console.log('catch')
      window.location.replace(`${auth_url}/login`)
    }

    )
}

export default api