import {createAsyncThunk} from '@reduxjs/toolkit';
import {PhotoGalleryTypes} from '../../types';
import axiosApi from '../../axiosApi.ts';

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