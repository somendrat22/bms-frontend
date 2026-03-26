import axios from 'axios';
import type {
  RegisterUserRequest,
  User,
  Customer,
  TheatreOwner,
  Theatre,
  CreateTheatreRequest,
  Hall,
  RegisterHallRequest,
  Show,
  CreateShowRequest,
} from '../types';

const API_BASE_URL = 'https://panicky-jackie-javamastery-a2d5c2ac.koyeb.app/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  registerUser: async (data: RegisterUserRequest): Promise<Customer | TheatreOwner> => {
    const response = await api.post('/users/user/register', data);
    return response.data;
  },
};

export const theatreService = {
  createTheatre: async (ownerSysId: string, data: CreateTheatreRequest): Promise<Theatre> => {
    const response = await api.post(`/theatre/create?sysId=${ownerSysId}`, data);
    return response.data;
  },

  getTheatresByCity: async (cityName: string): Promise<Theatre[]> => {
    const response = await api.get(`/theatre/city/${cityName}`);
    return response.data;
  },
};

export const hallService = {
  registerHall: async (
    theaterOwnerId: string,
    theaterId: string,
    data: RegisterHallRequest
  ): Promise<Hall> => {
    const response = await api.post(
      `/hall/register?theaterOwnerId=${theaterOwnerId}&theaterId=${theaterId}`,
      data
    );
    return response.data;
  },
};

export const showService = {
  createShow: async (
    theaterOwnerId: string,
    hallId: string,
    data: CreateShowRequest
  ): Promise<Show> => {
    const response = await api.post(
      `/show/create?theaterOwner=${theaterOwnerId}&hallId=${hallId}`,
      data
    );
    return response.data;
  },
};

export default api;
