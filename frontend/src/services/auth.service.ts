import api from './api';

export const authService = {
  login: async (credentials: any) => {
    const res = await api.post('/auth/login', credentials);
    return { data: { token: res.data.data.accessToken, user: res.data.data.user } };
  },
  register: async (userData: any) => {
    const res = await api.post('/auth/register', userData);
    return { data: { token: res.data.data.accessToken, user: res.data.data.user } };
  }
};
