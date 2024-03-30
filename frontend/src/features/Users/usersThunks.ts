import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, ValidationError} from '../../types';
import {isAxiosError} from 'axios';
import {unsetUser} from './usersSlice.ts';
import axiosApi from '../../axiosApi.ts';

export const newUser = createAsyncThunk<RegisterResponse, RegisterMutation, {rejectValue: ValidationError}>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      formData.append('email', registerMutation.email);
      formData.append('password', registerMutation.password);
      formData.append('displayName', registerMutation.displayName);

      if (registerMutation.image) {
        formData.append('image', registerMutation.image);
      }

      const response = await axiosApi.post('/users', formData);
      return response.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }

      throw err;
    }
  }
);

export const loginUser = createAsyncThunk<RegisterResponse, LoginMutation, {rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('users/sessions', loginMutation);
      return response.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }

      throw err;
    }
  },
);

export const googleLogin = createAsyncThunk<RegisterResponse, string, {rejectValue: GlobalError}>(
  'google/login',
  async (credential, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users/google', {credential});
      return response.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }

      throw err;
    }
  },
);

export const logout = createAsyncThunk<void, undefined>(
  'users/logout',
  async (_, {dispatch}) => {
    await axiosApi.delete('users/sessions');
    dispatch(unsetUser());
  },
);