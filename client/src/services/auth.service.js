import toast from 'react-hot-toast';

import {
    LOGIN_ENDPOINT,
    REFRESH_ENDPOINT,
    REGISTER_ENDPOINT,
  } from './auth.constants';
  
  import request from './api.request';
  
  class AuthService {
    constructor() {
      this.login = this.login.bind(this);
    }
  
    async login(email, password) {  // changed from username to email since I am not using a username field for login
      try {
        const response = await request({
          url: LOGIN_ENDPOINT,
          method: 'POST',
          data: {
            email,
            password,
          },
        });
  
        if (response.data.access) {
          return this.setToken(response);
        }
      } catch (error) {
        toast.error('Username or password is incorrect, please try again.')
        return error.response;
      }
    }
  
    logout() {
      localStorage.removeItem('user');
    }
  
    async register({
      username,
      email,
      password,
      firstName,
      lastName,
    }) {
      try {
        await request({
          url: REGISTER_ENDPOINT,
          method: 'POST',
          data: {
            username,
            email,
            password,
            first_name: firstName,
            last_name: lastName,
          },
        });
  
        await this.login(email, password);
      } catch (error) {
        return error.response;
      }
    }
  
    setToken(response) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
  
    async refreshToken() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
  
        if (user.refresh) {
          const response = await request({
            url: REFRESH_ENDPOINT,
            method: 'POST',
            data: {
              refresh: user.refresh,
            },
          });
  
          return response.data;
        }
      } catch (error) {
        return error.response;
      }
    }
  }
  // eslint-disable-next-line
  export default new AuthService();