import {createAsyncThunk} from '@reduxjs/toolkit';
import {AllPhotos, PhotoGalleryTypes, UserTypes} from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getUsers = createAsyncThunk<UserTypes[]>(
  'get/photos',
  async () => {
    const response = await axiosApi.get<UserTypes[]>('/users');
    const items = response.data;

    if (!items) {
      return []
    }

    return items;
  },
);

export const getPhotos = createAsyncThunk<AllPhotos[]>(
  'get/photos',
  async () => {
    const response = await axiosApi.get<AllPhotos[]>('/photos');
    const items = response.data;

    if (!items) {
      return []
    }

    return items;
  },
);

export const getUserPhotos = createAsyncThunk<AllPhotos[], string>(
  'getUser/photos',
  async (id) => {
    const response = await axiosApi.get<AllPhotos[]>('/photos/' + id);
    const items = response.data;

    if (!items) {
      return []
    }

    return items;
  },
);

export const addPhoto = createAsyncThunk<void, PhotoGalleryTypes>(
  'add/photo',
  async (data) => {
    try {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('image', data.image);

      await axiosApi.post('/photos', formData);
    } catch (err) {
      throw err;
    }
  },
);

export const deletePhoto = createAsyncThunk<void, string>(
  'delete/photo',
  async (id) => {
    try {
      await axiosApi.delete('/photos/' + id);
    } catch (err) {
      throw err;
    }
  },
);

export const userDeletePhoto = createAsyncThunk<void, string>(
  'delete/photo',
  async (id) => {
    try {
      await axiosApi.delete('/photos?photo=' + id);
    } catch (err) {
      throw err;
    }
  },
);