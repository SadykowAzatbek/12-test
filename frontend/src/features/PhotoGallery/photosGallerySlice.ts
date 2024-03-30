import {AllPhotos} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getPhotos} from './photoGalleryThunks.ts';
import {RootState} from '../../App/store.ts';

interface PhotosGallery {
  photos: AllPhotos[],
  isLoading: boolean,
}

const initialState: PhotosGallery = {
  photos: [],
  isLoading: false,
};

export const photosGallerySlice = createSlice({
  name: 'photos/slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPhotos.fulfilled, (state, {payload: items}) => {
      state.isLoading = false;
      state.photos = items;
    });
    builder.addCase(getPhotos.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const photosReducer = photosGallerySlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectIsLoading = (state: RootState) => state.photos.isLoading;