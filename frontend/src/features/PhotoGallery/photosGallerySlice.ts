import {AllPhotos} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getPhotos, getUserPhotos} from './photoGalleryThunks.ts';
import {RootState} from '../../App/store.ts';

interface PhotosGallery {
  photos: AllPhotos[],
  isLoading: boolean,
  userPhotos: AllPhotos[],
  userIsLoading: boolean,
}

const initialState: PhotosGallery = {
  photos: [],
  isLoading: false,
  userPhotos: [],
  userIsLoading: false,
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

    builder.addCase(getUserPhotos.pending, (state) => {
      state.userIsLoading = true;
    });
    builder.addCase(getUserPhotos.fulfilled, (state, {payload: items}) => {
      state.userIsLoading = false;
      state.userPhotos = items;
    });
    builder.addCase(getUserPhotos.rejected, (state) => {
      state.userIsLoading = false;
    });
  },
});

export const photosReducer = photosGallerySlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectIsLoading = (state: RootState) => state.photos.isLoading;
export const selectUserPhotos = (state: RootState) => state.photos.userPhotos;
export const selectUserIsLoading = (state: RootState) => state.photos.userIsLoading;

