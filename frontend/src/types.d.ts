export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  image: string | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface UserTypes {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    },
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: UserTypes;
}

export interface GlobalError {
  error: string;
}

export interface PhotoGalleryTypes {
  title: string;
  image: string;
}

export interface AllPhotos {
  _id: string;
  user: string;
  title: string;
  image: string;
}